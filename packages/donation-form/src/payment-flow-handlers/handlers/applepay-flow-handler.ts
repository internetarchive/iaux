import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ApplePaySessionDataSourceDelegate, ApplePaySessionDataSourceInterface } from "../../braintree-manager/payment-providers/apple-pay/apple-pay-session-datasource";
import { ModalConfig } from "../../modal-manager/modal-template";
import { DonationResponse } from "../../models/response-models/donation-response";

export interface ApplePayFlowHandlerInterface {
  paymentInitiated(e: Event): Promise<void>;
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
  async paymentInitiated(e: Event): Promise<void> {
    this.applePayDataSource = await
      this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(5.00, e);

    console.debug('paymentInitiated, e, applePayDataSource', e, this.applePayDataSource);

    if (this.applePayDataSource) {
      this.applePayDataSource.delegate = this;
    }
  }

  private showModal() {
    const modalConfig = new ModalConfig();
    this.modalManager.showModal(modalConfig, undefined);
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}

  // MARK - ApplePaySessionDataSourceDelegate
  paymentComplete(response: DonationResponse): void {
    console.debug('paymentComplete', response);
    this.showModal();
  }
}
