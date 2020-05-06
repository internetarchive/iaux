import { BraintreePaymentProvider } from "./payment-providers/credit-card";

export interface BraintreeManagerInterface {
  braintree: any;
  creditCardHandler: BraintreePaymentProvider.CreditCardHandlerInterface;
  getBraintreeClient(): Promise<any | undefined>;
}

export class BraintreeManager implements BraintreeManagerInterface {
  get braintree(): any {
    return this._braintree;
  }

  async getBraintreeClient(): Promise<any | undefined> {
    if (this.braintreeClient) {
      return this.braintreeClient;
    }

    return new Promise((resolve, reject) => {
      this.braintree.client.create({
        authorization: this.authorizationToken
      }, (clientErr: any | undefined, clientInstance: any | undefined) => {
        if (clientErr) {
          return reject(clientErr);
        }
        this.braintreeClient = clientInstance;
        resolve(clientInstance);
      });
    });
  }

  get creditCardHandler(): BraintreePaymentProvider.CreditCardHandlerInterface {
    if (this.creditCardHandlerCache) {
      return this.creditCardHandlerCache;
    }

    this.creditCardHandlerCache = new BraintreePaymentProvider.CreditCardHandler(
      this,
      this.hostedFieldStyle,
      this.hostedFieldConfig
    );

    return this.creditCardHandlerCache;
  }

  private _braintree: any;

  private authorizationToken: string;

  private hostedFieldStyle: object;

  private hostedFieldConfig: object;

  private braintreeClient: any | undefined;

  private creditCardHandlerCache: BraintreePaymentProvider.CreditCardHandlerInterface | undefined;

  constructor(
    braintree: any = window.braintree,
    authorizationToken: string,
    hostedFieldStyle: object,
    hostedFieldConfig: object
  ) {
    this.authorizationToken = authorizationToken;
    this._braintree = braintree;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }
}
