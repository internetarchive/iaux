import { CreditCardHandlerInterface, CreditCardHandler } from "./payment-providers/credit-card";
import { ApplePayHandlerInterface, ApplePayHandler } from "./payment-providers/apple-pay";
import { VenmoHandlerInterface, VenmoHandler } from "./payment-providers/venmo";
import { PayPalHandlerInterface, PayPalHandler } from "./payment-providers/paypal";
import { HostingEnvironment, BraintreeManagerInterface } from "./braintree-manager";
import { ApplePaySessionManager } from "./payment-providers/apple-pay-session-manager";

export interface PaymentProvidersInterface {
  creditCardHandler: CreditCardHandlerInterface;
  applePayHandler: ApplePayHandlerInterface;
  venmoHandler: VenmoHandlerInterface;
  paypalHandler: PayPalHandlerInterface;
}

export class PaymentProviders implements PaymentProvidersInterface {
  get creditCardHandler(): CreditCardHandlerInterface {
    if (this.creditCardHandlerCache) {
      return this.creditCardHandlerCache;
    }

    this.creditCardHandlerCache = new CreditCardHandler(
      this.braintreeManager,
      this.hostedFieldStyle,
      this.hostedFieldConfig
    );

    return this.creditCardHandlerCache;
  }

  get applePayHandler(): ApplePayHandlerInterface {
    if (this.applePayHandlerCache) {
      return this.applePayHandlerCache;
    }

    const applePaySessionManager = new ApplePaySessionManager();
    this.applePayHandlerCache = new ApplePayHandler(this.braintreeManager, applePaySessionManager);

    return this.applePayHandlerCache;
  }

  get venmoHandler(): VenmoHandlerInterface {
    if (this.venmoHandlerCache) {
      return this.venmoHandlerCache;
    }

    this.venmoHandlerCache = new VenmoHandler(this.braintreeManager);

    return this.venmoHandlerCache;
  }

  get paypalHandler(): PayPalHandlerInterface {
    if (this.paypalHandlerCache) {
      return this.paypalHandlerCache;
    }

    this.paypalHandlerCache = new PayPalHandler(
      this.braintreeManager, this.paypal, this.hostingEnvironment);

    return this.paypalHandlerCache;
  }

  private braintreeManager: BraintreeManagerInterface;

  private creditCardHandlerCache: CreditCardHandlerInterface | undefined;

  private applePayHandlerCache: ApplePayHandlerInterface | undefined;

  private venmoHandlerCache: VenmoHandlerInterface | undefined;

  private paypalHandlerCache: PayPalHandlerInterface | undefined;

  private hostedFieldStyle: object;

  private hostedFieldConfig: object;

  private hostingEnvironment: HostingEnvironment = HostingEnvironment.Development;

  private paypal: any | undefined;

  constructor(
    braintreeManager: BraintreeManagerInterface,
    hostingEnvironment: HostingEnvironment,
    hostedFieldStyle: object,
    hostedFieldConfig: object,
    paypal: any | undefined
  ) {
    this.braintreeManager = braintreeManager;
    this.hostingEnvironment = hostingEnvironment;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
    this.paypal = paypal;
  }
}
