import { LazyLoaderServiceInterface } from '@internetarchive/lazy-loader-service';
import { HostingEnvironment } from './braintree-manager';

export interface PaymentClientsInterface {
  getBraintreeClient(): Promise<braintree.Client>;
  getDataCollector(): Promise<braintree.DataCollector>;
  getHostedFields(): Promise<braintree.HostedFields>;
  getVenmo(): Promise<braintree.Venmo>;
  getPayPal(): Promise<braintree.PayPalCheckout>;
  getApplePay(): Promise<braintree.ApplePay>;
  getGooglePayBraintreeClient(): Promise<braintree.GooglePayment>;

  getGooglePaymentsClient(): Promise<google.payments.api.PaymentsClient>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaypalLibrary(): Promise<any>;
}

/**
 * The PaymentClients class is a container for all of the payment libraries that get loaded.
 *
 * For instance, it carries around the braintree and paypal libraries, as well as the specific
 * payment-provider clients for each of the providers. This allows us to pass around typed
 * objects instead of the untyped libraries we get from the providers.
 *
 * @export
 * @class PaymentClients
 * @implements {PaymentClientsInterface}
 */
export class PaymentClients implements PaymentClientsInterface {
  /**
   * The PayPal library loaded from the script tag.
   *
   * This is needed to configure the PayPal button. The Braintree library does not handle this.
   *
   * @type {object} PayPal library
   * @memberof PaymentClients
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getPaypalLibrary(): Promise<any> {
    if (window.paypal) {
      return window.paypal;
    }
    await this.lazyLoader.loadScript({
      src: 'https://www.paypalobjects.com/api/checkout.js',
      attributes: [
        { key: 'data-version-4', value: '' },
        { key: 'log-level', value: 'warn' }
      ]
    });
    return window.paypal;
  }

  async getGooglePaymentsClient(): Promise<google.payments.api.PaymentsClient> {
    await this.lazyLoader.loadScript({ src: 'https://pay.google.com/gp/p/js/pay.js' });
    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: 'TEST' // Or 'PRODUCTION'
    });
    return paymentsClient;
  }

  /**
   * The Braintree client from Braintree.
   *
   * @readonly
   * @type {(braintree.Client | undefined)}
   * @memberof BraintreeManager
   */
  async getBraintreeClient(): Promise<braintree.Client> {
    if (window.braintree?.client) {
      return window.braintree.client;
    }
    await this.loadBraintreeScript('client');
    return window.braintree.client;
  }

  /**
   * The Braintree Data Collector
   *
   * @readonly
   * @type {(braintree.Client | undefined)}
   * @memberof BraintreeManager
   */
  async getDataCollector(): Promise<braintree.DataCollector> {
    if (window.braintree?.dataCollector) {
      return window.braintree.dataCollector;
    }
    await this.loadBraintreeScript('data-collector');
    return window.braintree.dataCollector;
  }

  /**
   * The HostedFields client from Braintree.
   *
   * @readonly
   * @type {(braintree.HostedFields | undefined)}
   * @memberof BraintreeManager
   */
  async getHostedFields(): Promise<braintree.HostedFields> {
    if (window.braintree?.hostedFields) {
      return window.braintree.hostedFields;
    }
    await this.loadBraintreeScript('hosted-fields');
    return window.braintree.hostedFields;
  }

  /**
   * The Venmo client from Braintree.
   *
   * @readonly
   * @type {(braintree.Venmo | undefined)}
   * @memberof BraintreeManager
   */
  async getVenmo(): Promise<braintree.Venmo> {
    if (window.braintree?.venmo) {
      return window.braintree.venmo;
    }
    await this.loadBraintreeScript('venmo');
    return window.braintree.venmo;
  }

  /**
   * The PayPalCheckout client from Braintree.
   *
   * @readonly
   * @type {(braintree.PayPalCheckout | undefined)}
   * @memberof BraintreeManager
   */
  async getPayPal(): Promise<braintree.PayPalCheckout> {
    if (window.braintree?.paypalCheckout) {
      return window.braintree.paypalCheckout;
    }
    await this.loadBraintreeScript('paypal-checkout');
    return window.braintree.paypalCheckout;
  }

  /**
   * The Apple Pay client from Braintree.
   *
   * @readonly
   * @type {(braintree.ApplePay | undefined)}
   * @memberof BraintreeManager
   */
  async getApplePay(): Promise<braintree.ApplePay> {
    if (window.braintree?.applePay) {
      return window.braintree.applePay;
    }
    await this.loadBraintreeScript('apple-pay');
    return window.braintree.applePay;
  }

  /**
   * The Google Pay client from Braintree.
   *
   * @readonly
   * @type {(braintree.GooglePay)}
   * @memberof BraintreeManager
   */
  async getGooglePayBraintreeClient(): Promise<braintree.GooglePayment> {
    if (window.braintree?.googlePayment) {
      return window.braintree.googlePayment;
    }
    await this.loadBraintreeScript('google-payment');
    return window.braintree.googlePayment;
  }

  private async loadBraintreeScript(scriptName: string): Promise<any> {
    const extension = this.environment === HostingEnvironment.Production ? 'min.js' : 'js';
    const scriptWithSuffix = `${scriptName}.${extension}`;
    const url = `https://js.braintreegateway.com/web/${this.braintreeVersion}/js/${scriptWithSuffix}`;
    return this.lazyLoader.loadScript({ src: url });
  }

  private braintreeVersion = '3.62.2';

  private environment: HostingEnvironment = HostingEnvironment.Development;

  constructor(
    lazyLoader: LazyLoaderServiceInterface,
    environment: HostingEnvironment
  ) {
    this.lazyLoader = lazyLoader;
    this.environment = environment;
  }

  private lazyLoader: LazyLoaderServiceInterface;
}
