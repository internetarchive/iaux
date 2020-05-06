import { BraintreePaymentProvider } from "./payment-providers/credit-card";
import { DonationResponse } from "../models/response_models/donation_response";

export interface BraintreeManagerInterface {
  braintree: any;
  creditCardHandler: BraintreePaymentProvider.CreditCardHandlerInterface;
  getBraintreeClient(): Promise<any | undefined>;
  submitDataToEndpoint(data: object): Promise<DonationResponse>;
}

export interface BraintreeEndpointManagerInterface {
  /**
   * Responsible for submitting a data object to the backend
   * and returning a Promise of the JSON object response.
   *
   * @param {object} data
   * @returns {Promise<object>}
   * @memberof BraintreeEndpointManagerInterface
   */
  submitData(data: object): Promise<object>;
}

export class BraintreeManager implements BraintreeManagerInterface {
  /**
   * This is the Braintree library from Braintree.
   *
   * By making it a property in this class instead of accessing window.braintree directly,
   * we can inject mock braintree objects for testing.
   *
   * @type {*}
   * @memberof BraintreeManager
   */
  readonly braintree: any;

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
    console.debug('submitDataToEndpoint', data);

    const jsonResponse = await this.endpointManager.submitData(data);

    console.debug('submitDataToEndpoint, response', jsonResponse);

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

  private authorizationToken: string;

  private endpointManager: BraintreeEndpointManagerInterface;

  private hostedFieldStyle: object;

  private hostedFieldConfig: object;

  private braintreeClient: any | undefined;

  private creditCardHandlerCache: BraintreePaymentProvider.CreditCardHandlerInterface | undefined;

  constructor(
    braintree: any = window.braintree,
    endpointManager: BraintreeEndpointManagerInterface,
    authorizationToken: string,
    hostedFieldStyle: object,
    hostedFieldConfig: object
  ) {
    this.authorizationToken = authorizationToken;
    this.braintree = braintree;
    this.endpointManager = endpointManager;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }
}
