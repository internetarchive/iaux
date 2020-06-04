import { CustomerInfo } from '../common/customer-info';
import { BillingInfo } from '../common/billing-info';
import { DonationType } from '../donation-info/donation-type';

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

export class DonationRequest {
  paymentProvider: DonationRequestPaymentProvider;
  paymentMethodNonce: string;
  recaptchaToken?: string;
  customerId?: string;
  deviceData?: string;

  bin?: string; // first 6 digits of CC
  binName?: string; // credit card bank name

  amount: number;
  donationType: DonationType;

  customer: CustomerInfo;
  billing: BillingInfo;
  customFields?: DonationRequestCustomFields;

  constructor(options: {
    paymentProvider: DonationRequestPaymentProvider,
    paymentMethodNonce: string,
    recaptchaToken?: string,
    customerId?: string,
    deviceData?: string,

    bin?: string, // first 6 digits of CC
    binName?: string, // credit card bank name

    amount: number,
    donationType: DonationType,

    customer: CustomerInfo,
    billing: BillingInfo,
    customFields?: DonationRequestCustomFields,
  }) {
    this.paymentProvider = options.paymentProvider;
    this.paymentMethodNonce = options.paymentMethodNonce;
    this.recaptchaToken = options.recaptchaToken;
    this.customerId = options.customerId;
    this.deviceData = options.deviceData;

    this.bin = options.bin;
    this.binName = options.binName;

    this.amount = options.amount;
    this.donationType = options.donationType;

    this.customer = options.customer;
    this.billing = options.billing;
    this.customFields = options.customFields;
  }
}
