import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

export interface ApplePayFlowHandlerInterface {
  paymentInitiated(e: Event): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class ApplePayFlowHandler implements ApplePayFlowHandlerInterface {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
  }

  // PaymentFlowHandlerInterface conformance
  async paymentInitiated(e: Event): Promise<void> {

    await this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(5.00, e);

    // const hostedFieldsResponse = await this.braintreeManager.paymentProviders
    //   .creditCardHandler?.tokenizeHostedFields()

    // console.debug('paymentInitiated', hostedFieldsResponse);
    // const recaptchaToken = await this.recaptchaManager.execute();
    // console.debug('paymentInitiated recaptchaToken', recaptchaToken);
    // const modalConfig = new ModalConfig();
    // this.modalManager.showModal(modalConfig, undefined);
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
