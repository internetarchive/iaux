import { BraintreeManagerInterface } from '../braintree-manager';
import { ApplePaySessionManagerInterface } from './apple-pay-session-manager';
import { BraintreeError } from 'braintree-web';
import { DonationRequest } from '../../models/request_models/donation_request';
import { BillingInfo } from '../../models/common/billing_info';
import { CustomerInfo } from '../../models/common/customer_info';
import { DonationType } from '../../models/donation-info/donation-type';

export interface ApplePayHandlerInterface {
  isAvailable(): Promise<boolean>;
  getApplePayInstance(): Promise<any | undefined>;
  createPaymentRequest(e: Event): Promise<any>;
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
      await this.getApplePayInstance();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getApplePayInstance(): Promise<any | undefined> {
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
  async createPaymentRequest(e: Event): Promise<any> {
    const applePayInstance = await this.getApplePayInstance();

    const paymentRequest = applePayInstance.createPaymentRequest({
      total: {
        label: 'Internet Archive Donation',
        amount: '19.99'
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

    console.log(paymentRequest.countryCode);
    console.log(paymentRequest.currencyCode);
    console.log(paymentRequest.merchantCapabilities);
    console.log(paymentRequest.supportedNetworks);

    console.log('createPaymentRequest', session, paymentRequest);

    // session.

    session.onvalidatemerchant = function (event: ApplePayJS.ApplePayValidateMerchantEvent) {
      console.log('onvalidatemerchant', event);

      applePayInstance.performValidation({
        validationURL: event.validationURL,
        displayName: 'My Great Store'
      }, (validationErr: any, validationData: any) => {
        if (validationErr) {
          console.error(validationErr);
          session.abort();
          return;
        }
        console.log('validate merchange', validationData);

        session.completeMerchantValidation(validationData);
      });
    };

    session.onpaymentauthorized = (event: ApplePayJS.ApplePayPaymentAuthorizedEvent) => {
      console.log('onpaymentauthorized, event', event);

      applePayInstance.tokenize({
        token: event.payment.token
      }, (tokenizeErr: braintree.BraintreeError, payload: any) {
        if (tokenizeErr) {
          console.error('Error tokenizing Apple Pay:', tokenizeErr);
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          return;
        }

        console.log('payload', payload);

        const payment = event.payment;
        const billingContact = payment.billingContact;
        const shippingContact = payment.shippingContact;

        const billingInfo = new BillingInfo({
          firstName: billingContact?.givenName,
          lastName: billingContact?.familyName,
          streetAddress: billingContact?.addressLines[0],
          extendedAddress: billingContact?.addressLines[1],
          locality: billingContact?.locality,
          region: billingContact?.administrativeArea,
          postalCode: billingContact?.postalCode,
          countryCodeAlpha2: billingContact?.countryCode
        })

        const customerInfo = new CustomerInfo({
          email: billingContact?.emailAddress,
          firstName: billingContact?.givenName,
          lastName: billingContact?.familyName
        })

        const donationRequest = new DonationRequest();
        donationRequest.paymentMethodNonce = payload.nonce;
        donationRequest.billing = billingInfo;
        donationRequest.customer = customerInfo;
        donationRequest.amount = 10;
        donationRequest.frequency = DonationType.OneTime;

        this.braintreeManager.submitDataToEndpoint(donationRequest);

        // Send payload.nonce to your server.
        console.log('nonce:', payload.nonce);


        // If requested, address information is accessible in event.payment
        // and may also be sent to your server.
        // console.log('billingPostalCode:', event.payment.billingContact.postalCode);

        // After you have transacted with the payload.nonce,
        // call `completePayment` to dismiss the Apple Pay sheet.
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
      });
    };

    console.log('session', session);
    session.begin();
  }
}
