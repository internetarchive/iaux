import { CreditCardHandlerInterface, CreditCardHandler } from './payment-providers/credit-card';
import { ApplePayHandlerInterface, ApplePayHandler } from './payment-providers/apple-pay';
import { VenmoHandlerInterface, VenmoHandler } from './payment-providers/venmo';
import { PayPalHandlerInterface, PayPalHandler } from './payment-providers/paypal';
import { HostingEnvironment, BraintreeManagerInterface } from './braintree-manager';
import { ApplePaySessionManager } from './payment-providers/apple-pay-session-manager';
import { PaymentClientsInterface } from './payment-clients';

export interface PaymentProvidersInterface {
  creditCardHandler: CreditCardHandlerInterface | undefined;
  applePayHandler: ApplePayHandlerInterface | undefined;
  venmoHandler: VenmoHandlerInterface | undefined;
  paypalHandler: PayPalHandlerInterface | undefined;
}

/**
 * The PaymentProviders class contains the IA-specific handlers for each of the
 * different payment providers.
 *
 * @export
 * @class PaymentProviders
 * @implements {PaymentProvidersInterface}
 */
export class PaymentProviders implements PaymentProvidersInterface {
  get creditCardHandler(): CreditCardHandlerInterface | undefined {
    if (this.creditCardHandlerCache) {
      return this.creditCardHandlerCache;
    }

    const hostedFieldsClient = this.paymentClients.hostedFields;

    if (hostedFieldsClient) {
      this.creditCardHandlerCache = new CreditCardHandler(
        this.braintreeManager,
        hostedFieldsClient,
        this.hostedFieldStyle,
        this.hostedFieldConfig
      );
    }

    return this.creditCardHandlerCache;
  }

  get applePayHandler(): ApplePayHandlerInterface | undefined {
    if (this.applePayHandlerCache) {
      return this.applePayHandlerCache;
    }

    if (this.paymentClients.applePay) {
      const applePaySessionManager = new ApplePaySessionManager();
      this.applePayHandlerCache = new ApplePayHandler(
        this.braintreeManager,
        this.paymentClients.applePay,
        applePaySessionManager
      );
    }

    return this.applePayHandlerCache;
  }

  get venmoHandler(): VenmoHandlerInterface | undefined {
    if (this.venmoHandlerCache) {
      return this.venmoHandlerCache;
    }

    if (this.paymentClients.venmo) {
      this.venmoHandlerCache = new VenmoHandler(this.braintreeManager, this.paymentClients.venmo);
    }

    return this.venmoHandlerCache;
  }

  get paypalHandler(): PayPalHandlerInterface | undefined {
    if (this.paypalHandlerCache) {
      return this.paypalHandlerCache;
    }

    if (this.paymentClients.paypal) {
      this.paypalHandlerCache = new PayPalHandler(
        this.braintreeManager,
        this.paymentClients.paypal,
        this.paymentClients.paypalLibrary,
        this.hostingEnvironment
      );
    }

    console.log(this.paymentClients.paypal, this.paymentClients.paypalLibrary, this.paypalHandlerCache);
    return this.paypalHandlerCache;
  }

  private braintreeManager: BraintreeManagerInterface;

  private creditCardHandlerCache: CreditCardHandlerInterface | undefined;

  private applePayHandlerCache: ApplePayHandlerInterface | undefined;

  private venmoHandlerCache: VenmoHandlerInterface | undefined;

  private paypalHandlerCache: PayPalHandlerInterface | undefined;

  private hostedFieldStyle: object;

  private hostedFieldConfig: braintree.HostedFieldFieldOptions;

  private hostingEnvironment: HostingEnvironment = HostingEnvironment.Development;

  private paymentClients: PaymentClientsInterface;

  constructor(
    braintreeManager: BraintreeManagerInterface,
    paymentClients: PaymentClientsInterface,
    hostingEnvironment: HostingEnvironment,
    hostedFieldStyle: object,
    hostedFieldConfig: braintree.HostedFieldFieldOptions
  ) {
    this.braintreeManager = braintreeManager;
    this.paymentClients = paymentClients;
    this.hostingEnvironment = hostingEnvironment;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }
}
