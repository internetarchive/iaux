import { html } from 'lit-element';

import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

import '../../modals/upsell-modal-content';
import { DonorContactInfo } from '../../models/common/donor-contact-info';
import { DonationRequest } from '../../models/request_models/donation-request';
import { DonationType } from '../../models/donation-info/donation-type';
import { DonationResponse } from '../../models/response-models/donation-response';
import { SuccessResponse } from '../../models/response-models/success-models/success-response';
import { DonationPaymentInfo } from '../../models/donation-info/donation-payment-info';
import { PaymentProvider } from '../../models/common/payment-provider-name';

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
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private recaptchaManager: RecaptchaManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface,
    recaptchaManager: RecaptchaManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
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

    try {
      hostedFieldsResponse = await this.braintreeManager.paymentProviders
        .creditCardHandler?.tokenizeHostedFields()
    } catch {
      this.showErrorModal();
      return
    }
    console.debug('paymentInitiated, hostedFieldsResponse', hostedFieldsResponse, 'time from start', performance.now() - start);

    if (!hostedFieldsResponse) {
      this.showErrorModal();
      console.error('no hostedFieldsResponse');
      return;
    }

    let recaptchaToken: string | undefined;

    try {
      recaptchaToken = await this.recaptchaManager.execute();
    } catch {
      this.showErrorModal();
      console.error('recaptcha failure');
      return
    }
    console.debug('paymentInitiated recaptchaToken', recaptchaToken, 'time from start', performance.now() - start);

    this.showProcessingModal();

    const donationRequest = new DonationRequest({
      paymentMethodNonce: hostedFieldsResponse.nonce,
      paymentProvider: PaymentProvider.CreditCard,
      recaptchaToken: recaptchaToken,
      deviceData: this.braintreeManager.deviceData,
      bin: hostedFieldsResponse.details.bin,
      amount: donationInfo.amount,
      donationType: donationInfo.donationType,
      customer: donorContactInfo.customer,
      billing: donorContactInfo.billing,
      customFields: undefined
    });

    let response: DonationResponse;
    try {
      response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

      console.debug('RESPONSE', response);

      if (response.success) {
        this.handleSuccessfulResponse(donationInfo, response.value as SuccessResponse);
      } else {
        this.showErrorModal();
      }

    } catch {
      this.showErrorModal();
      console.error('error getting a response')
      return;
    }
  }

  private handleSuccessfulResponse(donationInfo: DonationPaymentInfo, response: SuccessResponse) {
    switch (donationInfo.donationType) {
      case DonationType.OneTime:
        this.showUpsellModal(response);
      break;
      case DonationType.Monthly:
        this.showThankYouModal();
      break;
      // This case will never be reached, it is only here for completeness.
      // The upsell case gets handled in `modalYesSelected()` below
      case DonationType.Upsell:
      break;
    }
  }

  private showProcessingModal() {
    const modalConfig = new ModalConfig();
    modalConfig.showProcessingIndicator = true;
    modalConfig.title = 'Processing...'
    this.modalManager.showModal(modalConfig, undefined);
  }

  private showThankYouModal() {
    const modalConfig = new ModalConfig();
    modalConfig.showProcessingIndicator = true;
    modalConfig.processingImageMode = 'complete';
    modalConfig.title = 'Thank You!';
    this.modalManager.showModal(modalConfig, undefined);
  }

  private showErrorModal() {
    const modalConfig = ModalConfig.errorConfig;
    this.modalManager.showModal(modalConfig, undefined);
  }

  private showUpsellModal(successResponse: SuccessResponse) {
    const modalConfig = new ModalConfig();
    const modalContent = html`
      <upsell-modal-content
        @yesSelected=${this.modalYesSelected.bind(this, successResponse)}
        @noThanksSelected=${this.modalNoThanksSelected.bind(this)}>
      </upsell-modal-content>
    `;
    this.modalManager.showModal(modalConfig, modalContent);
  }

  private async modalYesSelected(oneTimeDonationResponse: SuccessResponse, e: CustomEvent): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, 'e', e);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: oneTimeDonationResponse.paymentMethodNonce,
      paymentProvider: PaymentProvider.CreditCard,
      recaptchaToken: undefined,
      customerId: oneTimeDonationResponse.customer_id,
      deviceData: this.braintreeManager.deviceData,
      amount: e.detail.amount,
      donationType: DonationType.Upsell,
      customer: oneTimeDonationResponse.customer,
      billing: oneTimeDonationResponse.billing,
      customFields: undefined,
      upsellOnetimeTransactionId: oneTimeDonationResponse.transaction_id
    });

    this.showProcessingModal();

    console.debug('yesSelected, donationRequest', donationRequest);

    const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

    console.debug('yesSelected, UpsellResponse', response);

    this.showThankYouModal();
  }

  private modalNoThanksSelected(): void {
    console.debug('noThanksSelected');
    this.modalManager.closeModal();
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
