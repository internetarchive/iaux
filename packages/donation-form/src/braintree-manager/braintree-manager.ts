import { BraintreePaymentProvider } from "./payment-providers/credit-card";
import { DonationResponse } from "../models/response_models/donation_response";

export interface BraintreeManagerInterface {
  braintree: any;
  creditCardHandler: BraintreePaymentProvider.CreditCardHandlerInterface;
  getBraintreeClient(): Promise<any | undefined>;
  submitDataToEndpoint(data: object): Promise<DonationResponse>;
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

  async submitDataToEndpoint(data: object): Promise<DonationResponse> {
    console.log('data', data);

    const rawResponse = await fetch(this.endpoint, {
      method: 'post',
      body: JSON.stringify(data)
    });

    console.log('rawResponse', rawResponse, data);

    const jsonResponse = await rawResponse.json();
    const modeledResponse = new DonationResponse(jsonResponse);

    return modeledResponse;
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

  private endpoint: string = 'https://archive.org/services/donations/braintree-charge.php'

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
