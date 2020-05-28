import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

export interface VenmoFlowHandlerInterface {
  paymentInitiated(e: Event): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class VenmoFlowHandler implements VenmoFlowHandlerInterface {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
  }

  // VenmoFlowHandlerInterface conformance
  async paymentInitiated(): Promise<void> {
    const result = await this.braintreeManager.paymentProviders.venmoHandler?.startPayment();
    console.debug('paymentInitiated', result);
    this.showModal();
  }

  private showModal() {
    const modalConfig = new ModalConfig();
    this.modalManager.showModal(modalConfig, undefined);
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
