import { html } from 'lit-element';

import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

import '../../modals/upsell-modal-content';
import { DonorContactInfo } from '../../models/common/donor-contact-info';
import { DonationRequest, DonationRequestPaymentProvider } from '../../models/request_models/donation-request';
import { DonationType } from '../../models/donation-info/donation-type';
import { DonationResponse } from '../../models/response-models/donation-response';
import { SuccessResponse } from '../../models/response-models/success-models/success-response';

export interface CreditCardFlowHandlerInterface {
  paymentInitiated(donorContactInfo: DonorContactInfo): Promise<void>;
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
  async paymentInitiated(donorContactInfo: DonorContactInfo): Promise<void> {
    let hostedFieldsResponse: braintree.HostedFieldsTokenizePayload | undefined;

    console.debug('paymentInitiated donorContactInfo', donorContactInfo);

    try {
      hostedFieldsResponse = await this.braintreeManager.paymentProviders
        .creditCardHandler?.tokenizeHostedFields()
    } catch {
      alert('Fill in Credit Card');
      return
    }
    console.debug('paymentInitiated', hostedFieldsResponse);

    if (!hostedFieldsResponse) {
      alert('error tokenizinng');
      return;
    }

    let recaptchaToken: string | undefined;

    try {
      recaptchaToken = await this.recaptchaManager.execute();
    } catch {
      alert('Verification failed');
      return
    }
    console.debug('paymentInitiated recaptchaToken', recaptchaToken);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: hostedFieldsResponse.nonce,
      paymentProvider: DonationRequestPaymentProvider.CreditCard,
      recaptchaToken: recaptchaToken,
      customerId: undefined,
      deviceData: 'foo',
      bin: 'bar',
      binName: 'baz',
      amount: 5,
      donationType: DonationType.OneTime,
      customer: donorContactInfo.customer,
      billing: donorContactInfo.billing,
      customFields: undefined
    });

    try {
      const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

      // TODO: VERIFY SUCCESS FIRST
      const success = response.value as SuccessResponse;

      console.debug('RESPONSE', response);
      const modalConfig = new ModalConfig();
      const modalContent = html`
        <upsell-modal-content
          @yesSelected=${this.yesSelected.bind(this, success)}
          @noThanksSelected=${this.noThanksSelected.bind(this)}>
        </upsell-modal-content>
      `;
      this.modalManager.showModal(modalConfig, modalContent);

    } catch {
      console.error('error getting a response')
      return;
    }
  }

  private async yesSelected(oneTimeDonationResponse: SuccessResponse, e: CustomEvent): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, 'e', e);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: oneTimeDonationResponse.paymentMethodNonce,
      paymentProvider: DonationRequestPaymentProvider.CreditCard,
      recaptchaToken: undefined,
      customerId: oneTimeDonationResponse.customer_id,
      deviceData: 'foo',
      bin: 'bar',
      binName: 'baz',
      amount: e.detail.amount,
      donationType: DonationType.Upsell,
      customer: oneTimeDonationResponse.customer,
      billing: oneTimeDonationResponse.billing,
      customFields: undefined
    });

    console.debug('yesSelected, donationRequest', donationRequest);

    const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

    console.debug('yesSelected, UpsellResponse', response);

    this.modalManager.closeModal();
  }

  private noThanksSelected(): void {
    console.debug('noThanksSelected');
    this.modalManager.closeModal();
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
