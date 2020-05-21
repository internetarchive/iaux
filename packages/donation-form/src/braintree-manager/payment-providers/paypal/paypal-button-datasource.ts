import { DonationPaymentInfo } from "../../../models/donation-info/donation-payment-info";
import { DonationFrequency } from "../../../models/donation-info/donation-frequency";
import { CustomerInfo } from "../../../models/common/customer-info";
import { BillingInfo } from "../../../models/common/billing-info";
import { DonationRequest, DonationRequestPaymentProvider } from "../../../models/request_models/donation-request";
import { BraintreeManager, BraintreeManagerInterface } from "../../braintree-manager";
import { DonationResponse } from "../../../models/response-models/donation-response";

export interface PayPalButtonDataSourceInterface {
  delegate?: PayPalButtonDataSourceDelegate;
  updateDonationInfo(donationInfo: DonationPaymentInfo): void;
  payment(): Promise<any>;
  onAuthorize(data: any, actions: any): Promise<braintree.PayPalCheckoutTokenizePayload | undefined>;
  onCancel(data: object): void;
  onError(error: string): void;
}

export interface PayPalButtonDataSourceDelegate {
  payPalPaymentStarted(options: object): void;
  payPalPaymentAuthorized(payload: braintree.PayPalCheckoutTokenizePayload, response: DonationResponse): void;
  payPalPaymentCancelled(data: object): void;
  payPalPaymentError(error: string): void;
}

export class PayPalButtonDataSource implements PayPalButtonDataSourceInterface {
  delegate?: PayPalButtonDataSourceDelegate;

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

    const options: any = {};
    options.enableShippingAddress = true;

    const frequency = this.donationInfo.frequency;
    let flow: braintree.PayPalCheckoutFlowType = 'checkout' as braintree.PayPalCheckoutFlowType;
    if (frequency === DonationFrequency.Monthly) {
      flow = 'vault' as braintree.PayPalCheckoutFlowType
    }
    options.flow = flow;

    if (flow === 'checkout') {
      options.amount = this.donationInfo.amount;
      options.currency = 'USD';
    } else {
      options.billingAgreementDescription = `Subscribe to donate $${this.donationInfo.amount} monthly`
    }

    this.delegate?.payPalPaymentStarted(options);

    return this.paypalInstance.createPayment(options);
  }

  async onAuthorize(data: any, actions: any): Promise<braintree.PayPalCheckoutTokenizePayload | undefined> {
    const payload: braintree.PayPalCheckoutTokenizePayload = await this.paypalInstance.tokenizePayment(data);

    console.debug('onAuthorize data', data, 'payload', payload);

    const details = payload?.details;

    const customerInfo = new CustomerInfo({
      email: details?.email,
      firstName: details?.firstName,
      lastName: details?.lastName
    });

    const shippingAddress = payload?.shippingAddress;

    const billingInfo = new BillingInfo({
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
      isUpsell: this.donationInfo.isUpsell,
      amount: this.donationInfo.amount,
      frequency: this.donationInfo.frequency,
      customer: customerInfo,
      billing: billingInfo,
      referrer: undefined,
      customFields: undefined,
      options: undefined
    });

    const response: DonationResponse = await this.braintreeManager.submitDataToEndpoint(request);

    this.delegate?.payPalPaymentAuthorized(payload, response);

    return payload;
  }

  onCancel(data: object): void {
    console.debug('cancel', data);
    this.delegate?.payPalPaymentCancelled(data);
  }

  onError(error: string): void {
    console.error('error', error);
    this.delegate?.payPalPaymentError(error);
  }
}
