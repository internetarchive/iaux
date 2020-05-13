export interface PaymentClientsInterface {
  braintree: braintree.Client | undefined;
  dataCollector: braintree.DataCollector | undefined;
  hostedFields: braintree.HostedFields | undefined;
  venmo: braintree.Venmo | undefined;
  paypal: braintree.PayPalCheckout | undefined;
  applePay: braintree.ApplePay | undefined;

  braintreeLibrary: any;
  paypalLibrary: any;
}

/**
 * The PaymentClients class is a container for all of the payment libraries that get loaded.
 *
 * For instance, it carries around the braintree and paypal libraries, as well as the specific
 * payment-provider clients for each of the providers.
 *
 * @export
 * @class PaymentClients
 * @implements {PaymentClientsInterface}
 */
export class PaymentClients implements PaymentClientsInterface {
  /**
   * The top-level braintree library that gets loaded from the script tag.
   *
   * It is used to get the provider-specific clients.
   *
   * @type {object} Braintree library
   * @memberof PaymentClients
   */
  readonly braintreeLibrary: any;

  /**
   * The PayPal library loaded from the script tag.
   *
   * This is needed to configure the PayPal button. The Braintree library does not handle this.
   *
   * @type {object} PayPal library
   * @memberof PaymentClients
   */
  readonly paypalLibrary: any;

  /**
   * The Braintree client from Braintree.
   *
   * @readonly
   * @type {(braintree.Client | undefined)}
   * @memberof BraintreeManager
   */
  get braintree(): braintree.Client | undefined {
    return this.braintreeLibrary.client;
  }

  /**
   * The Braintree Data Collector
   *
   * @readonly
   * @type {(braintree.Client | undefined)}
   * @memberof BraintreeManager
   */
  get dataCollector(): braintree.DataCollector | undefined {
    return this.braintreeLibrary.dataCollector;
  }

  /**
   * The HostedFields client from Braintree.
   *
   * @readonly
   * @type {(braintree.HostedFields | undefined)}
   * @memberof BraintreeManager
   */
  get hostedFields(): braintree.HostedFields {
    return this.braintreeLibrary.hostedFields;
  }

  /**
   * The Venmo client from Braintree.
   *
   * @readonly
   * @type {(braintree.Venmo | undefined)}
   * @memberof BraintreeManager
   */
  get venmo(): braintree.Venmo | undefined {
    return this.braintreeLibrary.venmo;
  }

  /**
   * The PayPalCheckout client from Braintree.
   *
   * @readonly
   * @type {(braintree.PayPalCheckout | undefined)}
   * @memberof BraintreeManager
   */
  get paypal(): braintree.PayPalCheckout | undefined {
    return this.braintreeLibrary.paypalCheckout;
  }

  /**
   * The Apple Pay client from Braintree.
   *
   * @readonly
   * @type {(braintree.ApplePay | undefined)}
   * @memberof BraintreeManager
   */
  get applePay(): braintree.ApplePay | undefined {
    return this.braintreeLibrary.applePay;
  }

  constructor(
    braintreeLibrary: any,
    paypalLibrary: any
  ) {
    this.braintreeLibrary = braintreeLibrary;
    this.paypalLibrary = paypalLibrary;

    console.log('payment-clients', this.paypalLibrary);
  }
}
