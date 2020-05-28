import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

export interface CreditCardFlowHandlerInterface {
  paymentInitiated(): Promise<void>;
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
  async paymentInitiated(): Promise<void> {
    const hostedFieldsResponse = await this.braintreeManager.paymentProviders
      .creditCardHandler?.tokenizeHostedFields()

    console.debug('paymentInitiated', hostedFieldsResponse);
    const recaptchaToken = await this.recaptchaManager.execute();
    console.debug('paymentInitiated recaptchaToken', recaptchaToken);
    const modalConfig = new ModalConfig();
    this.modalManager.showModal(modalConfig, undefined);
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
