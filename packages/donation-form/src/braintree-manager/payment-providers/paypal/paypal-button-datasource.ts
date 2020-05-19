import { DonationPaymentInfo } from "../../../models/donation-info/donation-payment-info";
import { DonationFrequency } from "../../../models/donation-info/donation-frequency";
import { CustomerInfo } from "../../../models/common/customer-info";
import { BillingInfo } from "../../../models/common/billing-info";
import { DonationRequest, DonationRequestPaymentProvider } from "../../../models/request_models/donation-request";
import { BraintreeManager, BraintreeManagerInterface } from "../../braintree-manager";

export interface PayPalButtonDataSourceInterface {
  updateDonationInfo(donationInfo: DonationPaymentInfo): void;
  payment(): Promise<any>;
  onAuthorize(data: any, actions: any): Promise<braintree.PayPalCheckoutTokenizePayload | undefined>;
  onCancel(data: object): void;
  onError(error: string): void;
}

export class PayPalButtonDataSource implements PayPalButtonDataSourceInterface {
  private paypalInstance: braintree.PayPalCheckout;
  private donationInfo: DonationPaymentInfo;
  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    donationInfo: DonationPaymentInfo,
    paypalInstance: braintree.PayPalCheckout,
    braintreeManager: BraintreeManagerInterface
  }) {
    this.donationInfo = options.donationInfo;
    this.paypalInstance = options.paypalInstance;
    this.braintreeManager = options.braintreeManager;
  }

  updateDonationInfo(donationInfo: DonationPaymentInfo): void {
    console.log('updateDonationInfo', donationInfo);
    this.donationInfo = donationInfo;
  }

  async payment(): Promise<any> {
    console.log('PayPalButtonDataSource payment, donationInfo', this, this.donationInfo);

    const frequency = this.donationInfo.frequency;

    // you can't use the proper enum in here because it's in a callback
    const flow: braintree.PayPalCheckoutFlowType =
      (frequency === DonationFrequency.Monthly ? 'vault' : 'checkout') as braintree.PayPalCheckoutFlowType;
    const { amount } = this.donationInfo;
    const options = {
      flow,
      enableShippingAddress: true
    };

    let checkoutOptions = {};
    if (flow === 'checkout') {
      checkoutOptions = {
        amount,
        currency: 'USD',
      };
    } else {
      checkoutOptions = {
        billingAgreementDescription: `Subscribe to donate $${amount} monthly`,
      };
    }
    Object.assign(options, checkoutOptions);

    // console.log('options', options, this, this.paypalInstance);

    return this.paypalInstance.createPayment(options);
  }

  async onAuthorize(data: any, actions: any): Promise<braintree.PayPalCheckoutTokenizePayload | undefined> {
    const payload: braintree.PayPalCheckoutTokenizePayload = await this.paypalInstance.tokenizePayment(data);

    console.log('PAYLOAD', payload);

    const details = payload?.details;

    const customerInfo = new CustomerInfo({
      email: details?.email,
      firstName: details?.firstName,
      lastName: details?.lastName
    });

    const shippingAddress = payload?.shippingAddress;

    const billingInfo = new BillingInfo({
      // firstName: details?.firstName,
      // lastName: details?.lastName,
      streetAddress: shippingAddress?.line1,
      extendedAddress: shippingAddress?.line2,
      locality: shippingAddress?.city,
      region: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      countryCodeAlpha2: shippingAddress?.countryCode
    })

    const request = new DonationRequest({
      paymentProvider: DonationRequestPaymentProvider.PayPal,
      paymentMethodNonce: payload.nonce,
      isUpsell: false,
      amount: this.donationInfo.amount,
      frequency: this.donationInfo.frequency,
      customer: customerInfo,
      billing: billingInfo,
      referrer: undefined,
      customFields: undefined,
      options: undefined
    });

    this.braintreeManager.submitDataToEndpoint(request);

    return payload;
  }

  onCancel(data: object): void {
    // DonateIframe.postMessage('close modal');
    // log('PayPal payment cancelled', JSON.stringify(data, 0, 2));
    console.log('cancel', data);
  }

  onError(error: string): void {
    // DonateIframe.postMessage('close modal');
    // log(`PayPal error: ${general_err}`);
    console.log('error', error);
  }
}
