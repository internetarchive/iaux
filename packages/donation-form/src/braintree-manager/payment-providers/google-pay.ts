import { BraintreeManagerInterface } from '../braintree-manager';
import { DonationPaymentInfo } from '../../models/donation-info/donation-payment-info';

export interface GooglePayHandlerInterface {
  isBrowserSupported(): Promise<boolean>;
  getPaymentsClient(): Promise<google.payments.api.PaymentsClient>
  getInstance(): Promise<braintree.GooglePayment>;
  startPayment(donationInfo: DonationPaymentInfo): Promise<braintree.VenmoTokenizePayload | undefined>;
}

export class GooglePayHandler implements GooglePayHandlerInterface {
  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    googlePayBraintreeClient: braintree.GooglePayment,
    googlePaymentsClient: google.payments.api.PaymentsClient
  }) {
    this.braintreeManager = options.braintreeManager;
    this.googlePayBraintreeClient = options.googlePayBraintreeClient;
    this.googlePaymentsClient = options.googlePaymentsClient;
  }

  private braintreeManager: BraintreeManagerInterface;

  private googlePayBraintreeClient: braintree.GooglePayment;

  private googlePayInstance?: braintree.GooglePayment;

  private googlePaymentsClient: google.payments.api.PaymentsClient;

  async isBrowserSupported(): Promise<boolean> {
    const instance = await this.getInstance();
    const request = await instance?.createPaymentDataRequest();
    const allowedPaymentMethods = request?.allowedPaymentMethods;

    if (allowedPaymentMethods === undefined) {
      return false;
    }

    return this.googlePaymentsClient.isReadyToPay({
      // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest for all options
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: allowedPaymentMethods,
      existingPaymentMethodRequired: true
    }).then((isReadyToPay) => isReadyToPay.result);
  }

  async getPaymentsClient(): Promise<google.payments.api.PaymentsClient> {
    return this.googlePaymentsClient;
  }

  async getInstance(): Promise<braintree.GooglePayment> {
    if (this.googlePayInstance) {
      return this.googlePayInstance;
    }

    const braintreeInstance = await this.braintreeManager.getInstance();

    return new Promise((resolve, reject) => {
      this.googlePayBraintreeClient.create({
        client: braintreeInstance,
        googlePayVersion: 2, // TODO: add merchant id
      }, (error: any, instance: braintree.GooglePayment) => {
        if (error) {
          return reject(error);
        }

        this.googlePayInstance = instance;
        resolve(instance);
      });
    });
  }

  async startPayment(donationInfo: DonationPaymentInfo): Promise<braintree.VenmoTokenizePayload | undefined> {
    const instance = await this.getInstance();
    // return instance?.tokenize();
    return undefined;
  }
}
