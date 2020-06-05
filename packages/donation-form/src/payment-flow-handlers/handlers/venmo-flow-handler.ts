import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ModalConfig } from "../../modal-manager/modal-template";
import { DonorContactInfo } from "../../models/common/donor-contact-info";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";
import { html } from "lit-html";
import { DonationRequest } from "../../models/request_models/donation-request";
import { PaymentProvider } from "../../models/common/payment-provider-name";
import { VenmoRestorationStateHandlerInterface, VenmoRestorationStateHandler } from "./venmo-restoration-state-handler";
import { SuccessResponse } from "../../models/response-models/success-models/success-response";
import { DonationType } from "../../models/donation-info/donation-type";

export interface VenmoFlowHandlerInterface {
  startup(): Promise<void>;
  paymentInitiated(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  ): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class VenmoFlowHandler implements VenmoFlowHandlerInterface {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private restorationStateHandler: VenmoRestorationStateHandlerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface,
    restorationStateHandler?: VenmoRestorationStateHandlerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
    this.restorationStateHandler = options.restorationStateHandler ?? new VenmoRestorationStateHandler();
  }

  /**
   * Check if we have any results from Venmo on startup.
   *
   * This happens if the app redirects to us in a new tab so we can resume the session.
   *
   * @returns {Promise<void>}
   * @memberof VenmoFlowHandler
   */
  async startup(): Promise<void> {
    console.debug('Venmo startup');
    const instance = await this.braintreeManager.paymentProviders.venmoHandler?.getInstance();
    if (instance?.hasTokenizationResult()) {
      console.debug('Venmo startup, has tokenization results');

      // if we get redirected back from venmo in a different tab, we need to restore the data
      // that was persisted when the payment was initiated
      const restoredInfo = await this.restorationStateHandler.restoreState();
      if (restoredInfo) {
        this.paymentInitiated(restoredInfo.contactInfo, restoredInfo.donationInfo);
      } else {
        console.error('no restoration info');
        this.showErrorModal();
      }
    }
  }

  // VenmoFlowHandlerInterface conformance
  async paymentInitiated(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  ): Promise<void> {

    // if we get redirected back from venmo in a different tab, we need to restore the data
    // that was persisted when the payment was initiated so persist it here
    this.restorationStateHandler.persistState(contactInfo, donationInfo);

    try {
      const result = await this.braintreeManager.paymentProviders.venmoHandler?.startPayment();
      if (!result) {
        this.showErrorModal();
        return;
      }
      console.debug('paymentInitiated', result);
      this.handleTokenizationResult(result, contactInfo, donationInfo);
    } catch(tokenizeError) {
      this.handleTokenizationError(tokenizeError);
      this.showErrorModal()
    }
  }

  private async handleTokenizationResult(
    payload: braintree.VenmoTokenizePayload,
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  ): Promise<void> {
    console.debug('handleTokenizationResult', payload, contactInfo, donationInfo);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: payload.nonce,
      paymentProvider: PaymentProvider.Venmo,
      recaptchaToken: undefined,
      deviceData: this.braintreeManager.deviceData,
      amount: donationInfo.amount,
      donationType: donationInfo.donationType,
      customer: contactInfo.customer,
      billing: contactInfo.billing,
      customFields: undefined
    });

    const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

    this.restorationStateHandler.clearState();

    if (response.success) {
      this.showUpsellModal(response.value as SuccessResponse);
    } else {
      this.showErrorModal();
    }
  }

  private handleTokenizationError(tokenizeError: any) {
    console.debug('tokenizeError', tokenizeError);
    // Handle flow errors or premature flow closure
    switch (tokenizeError.code) {
      case 'VENMO_APP_CANCELED':
        console.log('User canceled Venmo flow.');
        break;
      case 'VENMO_CANCELED':
        console.log('User canceled Venmo, or Venmo app is not available.');
        break;
      default:
        console.error('Error!', tokenizeError);
    }
    alert(`Tokenization Error: ${tokenizeError.code}`);
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

  private showUpsellModal(oneTimeDonationResponse: SuccessResponse) {
    const modalConfig = new ModalConfig();
    const modalContent = html`
      <upsell-modal-content
        @yesSelected=${this.modalYesSelected.bind(this, oneTimeDonationResponse)}
        @noThanksSelected=${this.modalNoThanksSelected.bind(this)}>
      </upsell-modal-content>
    `;
    this.modalManager.showModal(modalConfig, modalContent);
  }

  private async modalYesSelected(oneTimeDonationResponse: SuccessResponse, e: CustomEvent): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, 'e', e);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: oneTimeDonationResponse.paymentMethodNonce,
      paymentProvider: PaymentProvider.Venmo,
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
