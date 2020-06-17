import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ApplePaySessionDataSourceDelegate, ApplePaySessionDataSourceInterface } from "../../braintree-manager/payment-providers/apple-pay/apple-pay-session-datasource";
import { DonationResponse } from "../../models/response-models/donation-response";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";
import { SuccessResponse } from "../../models/response-models/success-models/success-response";
import { DonationRequest } from "../../models/request_models/donation-request";
import { PaymentProvider } from "../../models/common/payment-provider-name";
import { DonationType } from "../../models/donation-info/donation-type";
import { DonationFlowModalManagerInterface } from "../donation-flow-modal-manager";

export interface ApplePayFlowHandlerInterface {
  paymentInitiated(donationInfo: DonationPaymentInfo, e: Event): Promise<void>;
  // paymentAuthorized(): Promise<void>;
  // paymentCancelled(): Promise<void>;
  // paymentError(): Promise<void>;
}

export class ApplePayFlowHandler implements ApplePayFlowHandlerInterface, ApplePaySessionDataSourceDelegate {
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    donationFlowModalManager: DonationFlowModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
  }

  private applePayDataSource?: ApplePaySessionDataSourceInterface;

  // ApplePayFlowHandlerInterface conformance
  async paymentInitiated(donationInfo: DonationPaymentInfo, e: Event): Promise<void> {
    this.donationFlowModalManager.showProcessingModal();
    const handler = await this.braintreeManager?.paymentProviders.getApplePayHandler()
    this.applePayDataSource = await handler?.createPaymentRequest(e, donationInfo);

    console.debug('paymentInitiated, e, applePayDataSource', e, this.applePayDataSource);

    if (this.applePayDataSource) {
      this.applePayDataSource.delegate = this;
    }
  }

  private async modalYesSelected(oneTimeDonationResponse: SuccessResponse, amount: number): Promise<void> {
    console.debug('yesSelected, oneTimeDonationResponse', oneTimeDonationResponse, 'e', amount);

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

  // MARK - ApplePaySessionDataSourceDelegate
  paymentComplete(response: DonationResponse): void {
    console.debug('paymentComplete', response);
    if (response.success) {
      if (this.applePayDataSource?.donationInfo.donationType == DonationType.OneTime) {
        this.donationFlowModalManager.showUpsellModal({
          yesSelected: this.modalYesSelected.bind(this, response.value as SuccessResponse),
          noSelected: this.modalNoThanksSelected.bind(this)
        })
      } else {
        this.donationFlowModalManager.showThankYouModal();
      }
    } else {
      this.donationFlowModalManager.showErrorModal();
    }
  }

  paymentFailed(error: string): void {
    this.donationFlowModalManager.showErrorModal();
  }

  paymentCancelled(): void {
    this.donationFlowModalManager.closeModal();
  }
}
