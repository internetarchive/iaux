import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { DonorContactInfo } from "../../models/common/donor-contact-info";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";
import { DonationRequest } from "../../models/request_models/donation-request";
import { PaymentProvider } from "../../models/common/payment-provider-name";
import { VenmoRestorationStateHandlerInterface, VenmoRestorationStateHandler } from "./venmo-restoration-state-handler";
import { SuccessResponse } from "../../models/response-models/success-models/success-response";
import { DonationType } from "../../models/donation-info/donation-type";
import { DonationFlowModalManagerInterface } from "../donation-flow-modal-manager";

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
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private restorationStateHandler: VenmoRestorationStateHandlerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    donationFlowModalManager: DonationFlowModalManagerInterface,
    restorationStateHandler?: VenmoRestorationStateHandlerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
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
    const handler = await this.braintreeManager.paymentProviders.getVenmoHandler();
    const instance = await handler?.getInstance();
    if (instance?.hasTokenizationResult()) {
      console.debug('Venmo startup, has tokenization results');

      // if we get redirected back from venmo in a different tab, we need to restore the data
      // that was persisted when the payment was initiated
      const restoredInfo = await this.restorationStateHandler.getRestorationState();
      if (restoredInfo) {
        this.paymentInitiated(restoredInfo.contactInfo, restoredInfo.donationInfo);
      } else {
        console.error('no restoration info');
        this.donationFlowModalManager.showErrorModal();
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
      const handler = await this.braintreeManager.paymentProviders.getVenmoHandler();
      const result = await handler?.startPayment();
      if (!result) {
        this.restorationStateHandler.clearState();
        this.donationFlowModalManager.showErrorModal();
        return;
      }
      console.debug('paymentInitiated', result);
      this.handleTokenizationResult(result, contactInfo, donationInfo);
    } catch(tokenizeError) {
      this.restorationStateHandler.clearState();
      this.handleTokenizationError(tokenizeError);
      this.donationFlowModalManager.showErrorModal()
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
      amount: donationInfo.total,
      donationType: donationInfo.donationType,
      customer: contactInfo.customer,
      billing: contactInfo.billing,
      customFields: {
        fee_amount_covered: donationInfo.feeAmountCovered
      }
    });

    this.donationFlowModalManager.showProcessingModal();

    const response = await this.braintreeManager.submitDataToEndpoint(donationRequest);

    this.restorationStateHandler.clearState();

    if (response.success) {
      switch (donationInfo.donationType) {
        case DonationType.OneTime:
          this.donationFlowModalManager.showUpsellModal({
            yesSelected: this.modalYesSelected.bind(this, response.value as SuccessResponse),
            noSelected: this.modalNoThanksSelected.bind(this)
          });
          break;
        case DonationType.Monthly:
          this.donationFlowModalManager.showThankYouModal();
          break;
      }
    } else {
      this.donationFlowModalManager.showErrorModal();
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
    // alert(`Tokenization Error: ${tokenizeError.code}`);
  }

  private async modalYesSelected(oneTimeDonationResponse: SuccessResponse, amount: number): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, 'amount', amount);

    const donationRequest = new DonationRequest({
      paymentMethodNonce: oneTimeDonationResponse.paymentMethodNonce,
      paymentProvider: PaymentProvider.Venmo,
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
