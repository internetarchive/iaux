import { CustomerInfo } from '../common/customer-info';
import { BillingInfo } from '../common/billing-info';
import { DonationFrequency } from '../donation-info/donation-frequency';

export enum DonationRequestFrequency {
  OneTime = 'one-time',
  Monthly = 'monthly'
}

export enum DonationRequestPaymentProvider {
  CreditCard = 'Credit Card',
  PayPal = 'PayPal',
  GooglePay = 'Google Pay',
  Venmo = 'Venmo',
  ApplePay = 'Apple Pay'
}

// in order to add additional custom fields, you must add them in the brain
export class DonationRequestCustomFields {
  logged_in_user?: string;
  referrer?: string;
}

export class DonatinoRequestOptions {
  submitForSettlement: boolean;

  constructor(options: {
    submitForSettlement: boolean
  }) {
    this.submitForSettlement = options.submitForSettlement;
  }
}

export class DonationRequest {
  paymentProvider: DonationRequestPaymentProvider;
  paymentMethodNonce: string;
  isUpsell: boolean;
  amount: number;
  frequency: DonationFrequency;
  customer: CustomerInfo;
  billing: BillingInfo;
  referrer: string | undefined;
  customFields: DonationRequestCustomFields | undefined;
  options: DonatinoRequestOptions | undefined;

  constructor(options: {
    paymentProvider: DonationRequestPaymentProvider,
    paymentMethodNonce: string,
    isUpsell: boolean,
    amount: number,
    frequency: DonationFrequency,
    customer: CustomerInfo,
    billing: BillingInfo,
    referrer: string | undefined,
    customFields: DonationRequestCustomFields | undefined,
    options: DonatinoRequestOptions | undefined
  }) {
    this.paymentProvider = options.paymentProvider;
    this.paymentMethodNonce = options.paymentMethodNonce;
    this.isUpsell = options.isUpsell;
    this.amount = options.amount;
    this.frequency = options.frequency;
    this.customer = options.customer;
    this.billing = options.billing;
    this.referrer = options.referrer;
    this.customFields = options.customFields;
    this.options = options.options;
  }
}
