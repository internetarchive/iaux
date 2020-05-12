export interface PaymentClientsInterface {
  braintree: braintree.Client | undefined;
  hostedFields: braintree.HostedFields | undefined;
  venmo: braintree.Venmo | undefined;
  paypal: braintree.PayPal | undefined;
}

export class PaymentClients implements PaymentClientsInterface {
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
   * The PayPal client from Braintree.
   *
   * @readonly
   * @type {(braintree.PayPal | undefined)}
   * @memberof BraintreeManager
   */
  get paypal(): braintree.PayPal | undefined {
    return this.braintreeLibrary.paypal;
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

  constructor(braintreeLibrary: any) {
    this.braintreeLibrary = braintreeLibrary;
  }

  private braintreeLibrary: any;
}
