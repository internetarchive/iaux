import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";

import { DonorContactInfo } from '../../models/common/donor-contact-info';
import { DonationRequest } from '../../models/request_models/donation-request';
import { DonationType } from '../../models/donation-info/donation-type';
import { DonationResponse } from '../../models/response-models/donation-response';
import { SuccessResponse } from '../../models/response-models/success-models/success-response';
import { DonationPaymentInfo } from '../../models/donation-info/donation-payment-info';
import { PaymentProvider } from '../../models/common/payment-provider-name';
import { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';

export interface CreditCardFlowHandlerInterface {
  paymentInitiated(
    donationInfo: DonationPaymentInfo,
    donorContactInfo: DonorContactInfo
  ): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class CreditCardFlowHandler implements CreditCardFlowHandlerInterface {
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private recaptchaManager: RecaptchaManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    donationFlowModalManager: DonationFlowModalManagerInterface,
    recaptchaManager: RecaptchaManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
    this.recaptchaManager = options.recaptchaManager;
  }

  // PaymentFlowHandlerInterface conformance
  async paymentInitiated(
    donationInfo: DonationPaymentInfo,
    donorContactInfo: DonorContactInfo
  ): Promise<void> {
    let hostedFieldsResponse: braintree.HostedFieldsTokenizePayload | undefined;

    const start = performance.now();
    console.debug('paymentInitiated donorContactInfo', donorContactInfo);

    const handler = await this.braintreeManager.paymentProviders.getCreditCardHandler();

    try {
      hostedFieldsResponse = await handler?.tokenizeHostedFields()
    } catch {
      this.donationFlowModalManager.showErrorModal();
      return
    }
    console.debug('paymentInitiated, hostedFieldsResponse', hostedFieldsResponse, 'time from start', performance.now() - start);

    if (!hostedFieldsResponse) {
      this.donationFlowModalManager.showErrorModal();
      console.error('no hostedFieldsResponse');
      return;
    }

    let recaptchaToken: string | undefined;

    try {
      recaptchaToken = await this.recaptchaManager.execute();
    } catch {
      this.donationFlowModalManager.showErrorModal();
      console.error('recaptcha failure');
      return
    }
    console.debug('paymentInitiated recaptchaToken', recaptchaToken, 'time from start', performance.now() - start);

    this.donationFlowModalManager.showProcessingModal();

    const donationRequest = new DonationRequest({
      paymentMethodNonce: hostedFieldsResponse.nonce,
      paymentProvider: PaymentProvider.CreditCard,
      recaptchaToken: recaptchaToken,
      deviceData: this.braintreeManager.deviceData,
      bin: hostedFieldsResponse.details.bin,
      amount: donationInfo.total,
      donationType: donationInfo.donationType,
      customer: donorContactInfo.customer,
      billing: donorContactInfo.billing,
      customFields: {
        fee_amount_covered: donationInfo.feeAmountCovered
      }
    });

    let response: DonationResponse;
    try {
      response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

      console.debug('RESPONSE', response);

      if (response.success) {
        this.handleSuccessfulResponse(donationInfo, response.value as SuccessResponse);
      } else {
        this.donationFlowModalManager.showErrorModal();
      }

    } catch {
      this.donationFlowModalManager.showErrorModal();
      console.error('error getting a response')
      return;
    }
  }

  private handleSuccessfulResponse(donationInfo: DonationPaymentInfo, response: SuccessResponse) {
    console.debug('handleSuccessfulResponse', this);
    switch (donationInfo.donationType) {
      case DonationType.OneTime:
        this.donationFlowModalManager.showUpsellModal({
          yesSelected: (amount: number) => {
            console.debug('yesSelected', this);
            this.modalYesSelected(response, amount);
          },
          noSelected: () => {
            console.debug('noSelected');
            this.modalNoThanksSelected();
          }
        });
      break;
      case DonationType.Monthly:
        this.donationFlowModalManager.showThankYouModal();
      break;
      // This case will never be reached, it is only here for completeness.
      // The upsell case gets handled in `modalYesSelected()` below
      case DonationType.Upsell:
      break;
    }
  }

  private async modalYesSelected(oneTimeDonationResponse: SuccessResponse, amount: number): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, amount, this);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: oneTimeDonationResponse.paymentMethodNonce,
      paymentProvider: PaymentProvider.CreditCard,
      recaptchaToken: undefined,
      customerId: oneTimeDonationResponse.customer_id,
      deviceData: this.braintreeManager.deviceData,
      amount: amount,
      donationType: DonationType.Upsell,
      customer: oneTimeDonationResponse.customer,
      billing: oneTimeDonationResponse.billing,
      customFields: undefined,
      upsellOnetimeTransactionId: oneTimeDonationResponse.transaction_id
    });

    this.donationFlowModalManager.showProcessingModal();

    console.debug('yesSelected, donationRequest', donationRequest);

    const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

    console.debug('yesSelected, UpsellResponse', response);

    this.donationFlowModalManager.showThankYouModal();
  }

  private modalNoThanksSelected(): void {
    console.debug('noThanksSelected');
    this.donationFlowModalManager.closeModal();
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
