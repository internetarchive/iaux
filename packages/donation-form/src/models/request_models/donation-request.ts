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
  paypal_checkout_id?: string;
}

export class DonationRequestOptions {
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
  recaptchaToken?: string;
  customerId?: string;

  bin?: string; // first 6 digits of CC
  binName?: string; // credit card bank name

  amount: number;
  frequency: DonationFrequency;
  isUpsell: boolean;

  customer: CustomerInfo;
  billing: BillingInfo;
  customFields?: DonationRequestCustomFields;
  options?: DonationRequestOptions;

  constructor(options: {
    paymentProvider: DonationRequestPaymentProvider,
    paymentMethodNonce: string,
    recaptchaToken?: string,
    customerId?: string,

    bin?: string, // first 6 digits of CC
    binName?: string, // credit card bank name

    amount: number,
    frequency: DonationFrequency,
    isUpsell: boolean,

    customer: CustomerInfo,
    billing: BillingInfo,
    customFields?: DonationRequestCustomFields,
    options?: DonationRequestOptions
  }) {
    this.paymentProvider = options.paymentProvider;
    this.paymentMethodNonce = options.paymentMethodNonce;
    this.recaptchaToken = options.recaptchaToken;
    this.customerId = options.customerId;

    this.bin = options.bin;
    this.binName = options.binName;

    this.amount = options.amount;
    this.frequency = options.frequency;
    this.isUpsell = options.isUpsell;

    this.customer = options.customer;
    this.billing = options.billing;
    this.customFields = options.customFields;
    this.options = options.options;
  }
}
