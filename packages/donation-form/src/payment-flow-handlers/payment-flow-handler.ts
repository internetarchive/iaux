import { ModalManagerInterface } from "../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../braintree-manager/braintree-manager";

export interface PaymentFlowHandlerInterface {
  paymentInitiated(): void;
  paymentAuthorized(): void;
  paymentCancelled(): void;
  paymentError(): void;
}

export class PaymentFlowHandler implements PaymentFlowHandlerInterface {
  private modalManager?: ModalManagerInterface;

  private braintreeManager?: BraintreeManagerInterface;

  constructor(
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  ) {
    this.braintreeManager = braintreeManager;
    this.modalManager = modalManager;
  }

  // PaymentFlowHandlerInterface conformance
  paymentInitiated(): void {}

  paymentAuthorized(): void {}

  paymentCancelled(): void {}

  paymentError(): void {}
}
