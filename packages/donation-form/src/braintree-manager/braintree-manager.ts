import { DonationResponse } from "../models/response_models/donation_response";
import { DonationRequest } from "../models/request_models/donation_request";
import { PaymentProvidersInterface, PaymentProviders } from "./payment-providers";
import { DonationType } from "../models/donation-info/donation-type";

export interface BraintreeManagerInterface {
  braintree: any;
  paymentProviders: PaymentProvidersInterface;
  donationAmount: number;
  donationType: DonationType;
  getBraintreeClient(): Promise<any | undefined>;
  submitDataToEndpoint(request: DonationRequest): Promise<DonationResponse>;
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
  submitData(request: DonationRequest): Promise<object>;
}

export enum HostingEnvironment {
  Development = 'dev',
  Production = 'prod',
}

export class BraintreeManager implements BraintreeManagerInterface {
  donationAmount: number = 5;

  donationType: DonationType = DonationType.OneTime;

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

  /**
   * This contains all of the individual payment providers so as to not clutter the
   * top-level BraintreeManager class.
   *
   * @type {PaymentProvidersInterface}
   * @memberof BraintreeManager
   */
  paymentProviders: PaymentProvidersInterface;

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

  async submitDataToEndpoint(request: DonationRequest): Promise<DonationResponse> {
    const jsonResponse = await this.endpointManager.submitData(request);
    const modeledResponse = new DonationResponse(jsonResponse);
    return modeledResponse;
  }

  private authorizationToken: string;

  private endpointManager: BraintreeEndpointManagerInterface;

  private braintreeClient: any | undefined;

  private hostingEnvironment: HostingEnvironment = HostingEnvironment.Development;

  constructor(
    braintree: any = window.braintree,
    endpointManager: BraintreeEndpointManagerInterface,
    authorizationToken: string,
    hostedFieldStyle: object,
    hostedFieldConfig: object,
    hostingEnvironment: HostingEnvironment,
    paypal: any
  ) {
    this.authorizationToken = authorizationToken;
    this.braintree = braintree;
    this.endpointManager = endpointManager;
    this.hostingEnvironment = hostingEnvironment;

    this.paymentProviders = new PaymentProviders(
      this,
      hostingEnvironment,
      hostedFieldStyle,
      hostedFieldConfig,
      paypal
    )
  }
}
