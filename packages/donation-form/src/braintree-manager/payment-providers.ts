import { CreditCardHandlerInterface, CreditCardHandler } from './payment-providers/credit-card';
import { ApplePayHandlerInterface, ApplePayHandler } from './payment-providers/apple-pay/apple-pay';
import { VenmoHandlerInterface, VenmoHandler } from './payment-providers/venmo';
import { PayPalHandlerInterface, PayPalHandler } from './payment-providers/paypal/paypal';
import { HostingEnvironment, BraintreeManagerInterface } from './braintree-manager';
import { ApplePaySessionManager } from './payment-providers/apple-pay/apple-pay-session-manager';
import { PaymentClientsInterface } from './payment-clients';

export interface PaymentProvidersInterface {
  getCreditCardHandler(): Promise<CreditCardHandlerInterface | undefined>;
  getApplePayHandler(): Promise<ApplePayHandlerInterface | undefined>;
  getVenmoHandler(): Promise<VenmoHandlerInterface | undefined>;
  getPaypalHandler(): Promise<PayPalHandlerInterface | undefined>;
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
  async getCreditCardHandler(): Promise<CreditCardHandlerInterface | undefined> {
    if (this.creditCardHandlerCache) {
      return this.creditCardHandlerCache;
    }

    const client = await this.paymentClients.getHostedFields();

    if (client) {
      this.creditCardHandlerCache = new CreditCardHandler(
        this.braintreeManager,
        client,
        this.hostedFieldStyle,
        this.hostedFieldConfig
      );
    }

    return this.creditCardHandlerCache;
  }

  async getApplePayHandler(): Promise<ApplePayHandlerInterface | undefined> {
    console.debug('getApplePayHandler start');

    if (this.applePayHandlerCache) {
      return this.applePayHandlerCache;
    }

    const client = await this.paymentClients.getApplePay();

    if (client) {
      const applePaySessionManager = new ApplePaySessionManager();
      this.applePayHandlerCache = new ApplePayHandler(
        this.braintreeManager,
        client,
        applePaySessionManager
      );
    }

    console.debug('getApplePayHandler done', client, this.applePayHandlerCache);

    return this.applePayHandlerCache;
  }

  async getVenmoHandler(): Promise<VenmoHandlerInterface | undefined> {
    console.debug('getVenmoHandler start');

    if (this.venmoHandlerCache) {
      return this.venmoHandlerCache;
    }

    const client = await this.paymentClients.getVenmo();

    if (client) {
      this.venmoHandlerCache = new VenmoHandler(this.braintreeManager, client);
    }

    console.debug('getVenmoHandler done', client, this.venmoHandlerCache);

    return this.venmoHandlerCache;
  }

  async getPaypalHandler(): Promise<PayPalHandlerInterface | undefined> {
    if (this.paypalHandlerCache) {
      return this.paypalHandlerCache;
    }

    const paypalLibrary = await this.paymentClients.getPaypalLibrary();
    const client = await this.paymentClients.getPayPal();

    if (client) {
      this.paypalHandlerCache = new PayPalHandler(
        this.braintreeManager,
        client,
        paypalLibrary,
        this.hostingEnvironment
      );
    }

    console.log(this.paymentClients.getPayPal, paypalLibrary, this.paypalHandlerCache);
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
