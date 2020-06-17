import { LazyLoaderServiceInterface } from "../utilities/lazy-loader-service";

export interface PaymentClientsInterface {
  getBraintreeClient(): Promise<braintree.Client | undefined>;
  getDataCollector(): Promise<braintree.DataCollector | undefined>;
  getHostedFields(): Promise<braintree.HostedFields | undefined>;
  getVenmo(): Promise<braintree.Venmo | undefined>;
  getPayPal(): Promise<braintree.PayPalCheckout | undefined>;
  getApplePay(): Promise<braintree.ApplePay | undefined>;

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
  async getPaypalLibrary(): Promise<any> {
    await this.lazyLoader.loadScript(
      'https://www.paypalobjects.com/api/checkout.js',
      undefined,
      [
        { key: 'data-version-4', value: '' },
        { key: 'log-level', value: 'warn' }
      ]
    );
    return window.paypal;
  }

  /**
   * The Braintree client from Braintree.
   *
   * @readonly
   * @type {(braintree.Client | undefined)}
   * @memberof BraintreeManager
   */
  async getBraintreeClient(): Promise<braintree.Client | undefined> {
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
  async getDataCollector(): Promise<braintree.DataCollector | undefined> {
    if (window.braintree?.dataCollector) {
      return window.braintree.dataCollector;
    }
    await this.loadBraintreeScript('data-collector');
    return window.braintree.dataCollector;
  }

  private dataCollectorCache?: braintree.DataCollector;

  /**
   * The HostedFields client from Braintree.
   *
   * @readonly
   * @type {(braintree.HostedFields | undefined)}
   * @memberof BraintreeManager
   */
  async getHostedFields(): Promise<braintree.HostedFields | undefined> {
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
  async getVenmo(): Promise<braintree.Venmo | undefined> {
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
  async getPayPal(): Promise<braintree.PayPalCheckout | undefined> {
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
  async getApplePay(): Promise<braintree.ApplePay | undefined> {
    if (window.braintree?.applePay) {
      return window.braintree.applePay;
    }
    await this.loadBraintreeScript('apple-pay');
    return window.braintree.applePay;
  }

  private async loadBraintreeScript(scriptName: string): Promise<any> {
    const scriptWithSuffix = `${scriptName}.js`;
    const url = `https://js.braintreegateway.com/web/${this.braintreeVersion}/js/${scriptWithSuffix}`
    return this.lazyLoader.loadScript(url);
  }

  private braintreeVersion = '3.62.2';

  constructor(lazyLoader: LazyLoaderServiceInterface) {
    this.lazyLoader = lazyLoader;

  }

  private lazyLoader: LazyLoaderServiceInterface;
}
