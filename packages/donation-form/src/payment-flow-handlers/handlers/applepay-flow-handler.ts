import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ApplePaySessionDataSourceDelegate, ApplePaySessionDataSourceInterface } from "../../braintree-manager/payment-providers/apple-pay/apple-pay-session-datasource";
import { ModalConfig } from "../../modal-manager/modal-template";
import { DonationResponse } from "../../models/response-models/donation-response";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";
import { SuccessResponse } from "../../models/response-models/success-models/success-response";
import { DonationRequest } from "../../models/request_models/donation-request";
import { PaymentProvider } from "../../models/common/payment-provider-name";
import { DonationType } from "../../models/donation-info/donation-type";
import { html } from "lit-html";

export interface ApplePayFlowHandlerInterface {
  paymentInitiated(donationInfo: DonationPaymentInfo, e: Event): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class ApplePayFlowHandler implements ApplePayFlowHandlerInterface, ApplePaySessionDataSourceDelegate {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
  }

  private applePayDataSource?: ApplePaySessionDataSourceInterface;

  // ApplePayFlowHandlerInterface conformance
  async paymentInitiated(donationInfo: DonationPaymentInfo, e: Event): Promise<void> {
    this.showProcessingModal();
    this.applePayDataSource = await
      this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(e, donationInfo);

    console.debug('paymentInitiated, e, applePayDataSource', e, this.applePayDataSource);

    if (this.applePayDataSource) {
      this.applePayDataSource.delegate = this;
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

  // MARK - ApplePaySessionDataSourceDelegate
  paymentComplete(response: DonationResponse): void {
    console.debug('paymentComplete', response);
    if (response.success) {
      if (this.applePayDataSource?.donationInfo.donationType == DonationType.OneTime) {
        this.showUpsellModal(response.value as SuccessResponse);
      } else {
        this.showThankYouModal();
      }
    } else {
      this.showErrorModal();
    }
  }

  paymentFailed(error: string): void {
    this.showErrorModal();
  }

  paymentCancelled(): void {
    this.modalManager.closeModal();
  }
}
