import { BraintreeManagerInterface } from '../../braintree-manager';
import { ApplePaySessionManagerInterface } from './apple-pay-session-manager';
import { DonationType } from '../../../models/donation-info/donation-type';
import { ApplePaySessionDataSource } from './apple-pay-session-datasource';
import { DonationPaymentInfo } from '../../../models/donation-info/donation-payment-info';

export interface ApplePayHandlerInterface {
  isAvailable(): Promise<boolean>;
  getInstance(): Promise<any | undefined>;
  createPaymentRequest(
    e: Event,
    donationInfo: DonationPaymentInfo
  ): Promise<ApplePaySessionDataSource>;
}

export class ApplePayHandler implements ApplePayHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
    applePayClient: braintree.ApplePay,
    applePaySessionManager: ApplePaySessionManagerInterface
  ) {
    this.braintreeManager = braintreeManager;
    this.applePayClient = applePayClient;
    this.applePaySessionManager = applePaySessionManager;
  }

  private braintreeManager: BraintreeManagerInterface;

  private applePaySessionManager: ApplePaySessionManagerInterface;

  private applePayInstance: any | undefined;

  private applePayClient: braintree.ApplePay;

  async isAvailable(): Promise<boolean> {
    try {
      await this.getInstance();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getInstance(): Promise<any | undefined> {
    if (this.applePayInstance) {
      return this.applePayInstance;
    }

    const braintreeClient = await this.braintreeManager.getInstance();
    if (!braintreeClient) { return undefined; }

    return new Promise((resolve, reject) => {
      this.applePayClient.create({
        client: braintreeClient
      }, (error: any, instance: any) => {
        console.log('instance', error, instance, instance.merchantIdentifier);
        if (error) {
          return reject(error);
        }

        if (!this.applePaySessionManager?.canMakePayments()) {
          return reject('Apple Pay unavailable');
        }

        var canMakePayments = ApplePaySession.canMakePaymentsWithActiveCard(instance.merchantIdentifier);
        canMakePayments.then((canMakePaymentsWithActiveCard) => {
          console.log('can make payments?', canMakePaymentsWithActiveCard);
          if (canMakePaymentsWithActiveCard) {
            // Set up Apple Pay buttons
          }
        });

        console.log('ApplePay Available')
        this.applePayInstance = instance;
        resolve(instance);
      });
    });
  }

  // In order to trigger the Apple Pay flow, you HAVE to pass in the event
  // that triggered the launch. Notice we're not actually using the event
  // but ApplePay won't launch without it.
  async createPaymentRequest(
    e: Event,
    donationInfo: DonationPaymentInfo
  ): Promise<ApplePaySessionDataSource> {
    const applePayInstance = await this.getInstance();

    let label = 'Internet Archive Monthly';
    if (donationInfo.donationType === DonationType.OneTime) {
      label = 'Internet Archive';
    }

    const paymentRequest = applePayInstance.createPaymentRequest({
      total: {
        label: label,
        amount: donationInfo.amount
      },
      requiredBillingContactFields: [
        "postalAddress"
      ],
      requiredShippingContactFields: [
        "name",
        "email"
      ]
    });
    const session = this.applePaySessionManager.createNewPaymentSession(paymentRequest);

    const sessionDataSource = new ApplePaySessionDataSource({
      donationInfo: donationInfo,
      session: session,
      applePayInstance: applePayInstance,
      braintreeManager: this.braintreeManager
    });

    console.log('createPaymentRequest', session, paymentRequest);

    session.onvalidatemerchant = sessionDataSource.onvalidatemerchant.bind(sessionDataSource);
    session.onpaymentauthorized = sessionDataSource.onpaymentauthorized.bind(sessionDataSource);
    session.oncancel = sessionDataSource.oncancel.bind(sessionDataSource);

    console.log('session, sessionDataSource', session, sessionDataSource);
    session.begin();

    return sessionDataSource;
  }
}
