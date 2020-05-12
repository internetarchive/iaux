import { DonationResponse } from "../models/response_models/donation_response";
import { DonationRequest } from "../models/request_models/donation_request";
import { PaymentProvidersInterface, PaymentProviders } from "./payment-providers";
import { DonationType } from "../models/donation-info/donation-type";
import { DonationPaymentInfo } from "../models/donation-info/donation-payment-info";
import { PaymentClientsInterface, PaymentClients } from "./payment-clients";

export interface BraintreeManagerInterface {
  paymentProviders: PaymentProvidersInterface;
  donationInfo: DonationPaymentInfo;
  getInstance(): Promise<any | undefined>;
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
  readonly donationInfo: DonationPaymentInfo = new DonationPaymentInfo(DonationType.OneTime, 5);

  /**
   * This contains all of the individual payment providers so as to not clutter the
   * top-level BraintreeManager class.
   *
   * @type {PaymentProvidersInterface}
   * @memberof BraintreeManager
   */
  paymentProviders: PaymentProvidersInterface;


  async getInstance(): Promise<any | undefined> {
    if (this.braintreeInstance) {
      return this.braintreeInstance;
    }

    return new Promise((resolve, reject) => {
      this.paymentClients.braintree?.create({
        authorization: this.authorizationToken
      }, (clientErr: any | undefined, clientInstance: any | undefined) => {
        if (clientErr) {
          return reject(clientErr);
        }
        this.braintreeInstance = clientInstance;
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

  private braintreeInstance: braintree.Client | undefined;

  private endpointManager: BraintreeEndpointManagerInterface;

  private paymentClients: PaymentClientsInterface;

  private hostingEnvironment: HostingEnvironment = HostingEnvironment.Development;

  constructor(
    braintreeLibrary: any = window.braintree,
    endpointManager: BraintreeEndpointManagerInterface,
    authorizationToken: string,
    hostedFieldStyle: object,
    hostedFieldConfig: braintree.HostedFieldFieldOptions,
    hostingEnvironment: HostingEnvironment,
    paypal: any
  ) {
    this.authorizationToken = authorizationToken;
    this.endpointManager = endpointManager;
    this.hostingEnvironment = hostingEnvironment;

    this.paymentClients = new PaymentClients(braintreeLibrary);
    this.paymentProviders = new PaymentProviders(
      this,
      this.paymentClients,
      hostingEnvironment,
      hostedFieldStyle,
      hostedFieldConfig,
      paypal
    )
  }
}
