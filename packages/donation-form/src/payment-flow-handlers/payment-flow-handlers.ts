import { CreditCardFlowHandlerInterface, CreditCardFlowHandler } from "./handlers/creditcard-flow-handler";
import { PayPalFlowHandlerInterface, PayPalFlowHandler } from "./handlers/paypal-flow-handler";
import { ModalManagerInterface } from "../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../recaptcha-manager/recaptcha-manager";
import { ApplePayFlowHandlerInterface, ApplePayFlowHandler } from "./handlers/applepay-flow-handler";

export interface PaymentFlowHandlersInterface {
  creditCardHandler: CreditCardFlowHandlerInterface | undefined;
  paypalHandler: PayPalFlowHandlerInterface | undefined;
  applePayHandler: ApplePayFlowHandlerInterface | undefined;
}

/**
 * This class is a container for all of the individual flow handlers.
 *
 * Flow Handlers are responsible for handling the provider-specific interactions between
 * the UI and the Data.
 *
 * For instance, when the user clicks on the "Donate" button for credit cards, we
 * pull in contact info from the form, trigger the recaptcha, tokenize the form,
 * submit, show the upsell, complete. The Credit Card Flow Handler is responsible for
 * managing that series of steps.
 *
 * For PayPal, the user initiates the payment from the PayPal button and once they're
 * done, we show the modal. The PayPal Flow Handler is responsible for handling that
 * series of events.
 *
 * @export
 * @class PaymentFlowHandlers
 * @implements {PaymentFlowHandlersInterface}
 */
export class PaymentFlowHandlers implements PaymentFlowHandlersInterface {
  get creditCardHandler(): CreditCardFlowHandlerInterface | undefined {
    if (this.creditCardHandlerCache) {
      return this.creditCardHandlerCache;
    }

    this.creditCardHandlerCache = new CreditCardFlowHandler({
      braintreeManager: this.braintreeManager,
      modalManager: this.modalManager,
      recaptchaManager: this.recaptchaManager
    });

    return this.creditCardHandlerCache;
  }

  get paypalHandler(): PayPalFlowHandlerInterface | undefined {
    if (this.paypalHandlerCache) {
      return this.paypalHandlerCache;
    }

    this.paypalHandlerCache = new PayPalFlowHandler({
      braintreeManager: this.braintreeManager,
      modalManager: this.modalManager
    });

    return this.paypalHandlerCache;
  }

  get applePayHandler(): ApplePayFlowHandlerInterface | undefined {
    if (this.applePayHandlerCache) {
      return this.applePayHandlerCache;
    }

    this.applePayHandlerCache = new ApplePayFlowHandler({
      braintreeManager: this.braintreeManager,
      modalManager: this.modalManager
    });

    return this.applePayHandlerCache;
  }

  private creditCardHandlerCache?: CreditCardFlowHandlerInterface;
  private paypalHandlerCache?: PayPalFlowHandlerInterface;
  private applePayHandlerCache?: ApplePayFlowHandlerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface,
    recaptchaManager: RecaptchaManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
    this.recaptchaManager = options.recaptchaManager;
  }

  private braintreeManager: BraintreeManagerInterface;
  private modalManager: ModalManagerInterface;
  private recaptchaManager: RecaptchaManagerInterface;
}
