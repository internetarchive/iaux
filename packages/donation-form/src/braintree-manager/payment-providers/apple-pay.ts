/// <reference path="braintree-payment-provider.ts" />

import { BraintreeManagerInterface } from "../braintree-manager";

export interface ApplePayHandlerInterface {
  getApplePayInstance(): Promise<any | undefined>;
  createPaymentRequest(): Promise<any>;
}

export class ApplePayHandler implements ApplePayHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
  ) {
    this.braintreeManager = braintreeManager;
  }

  private braintreeManager: BraintreeManagerInterface;

  private applePayInstance: any | undefined;

  async getApplePayInstance(): Promise<any | undefined> {
    if (this.applePayInstance) {
      return this.applePayInstance;
    }

    const braintreeClient = await this.braintreeManager.getBraintreeClient();
    const braintree = this.braintreeManager.braintree;

    return new Promise((resolve, reject) => {
      braintree.applePay.create({
        client: braintreeClient
      }, (error: any, instance: any) => {
        if (error) {
          return reject(error);
        }

        this.applePayInstance = instance;
        resolve(instance);
      });
    });
  }

  async createPaymentRequest(): Promise<any> {
    const applePayInstance = await this.getApplePayInstance();

    var paymentRequest = applePayInstance.createPaymentRequest({
      total: {
        label: 'My Company',
        amount: '19.99'
      }
    });
    var session = new ApplePaySession(3, paymentRequest);

    session.onvalidatemerchant = function (event) {
      applePayInstance.performValidation({
        validationURL: event.validationURL,
        displayName: 'My Great Store'
      }, function (validationErr, validationData) {
        if (validationErr) {
          console.error(validationErr);
          session.abort();
          return;
        }

        session.completeMerchantValidation(validationData);
      });
    };

  }

}
