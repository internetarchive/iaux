import { CustomerInfo } from '../common/customer_info';
import { BillingInfo } from '../common/billing_info';
import { DonationFrequency } from '../donation-frequency';

export enum DonationRequestType {
  OneTime = 'one-time',
  Monthly = 'monthly',
  Upsell = 'upsell',
}

export class DonationRequest {
  paymentMethodNonce: string | undefined;
  amount: number | undefined;
  customer: CustomerInfo | undefined;
  billing: BillingInfo | undefined;
  referrer: string | undefined;
  // frequency: DonationFrequency | undefined;

  customFields: object = {
    'ip_address': 'baz',
    'logged_in_user': 'bar',
    'referrer': 'foo'
  }

  options: object = {
    'submitForSettlement': false
  }

  get isValid() {
    return (
      this.paymentMethodNonce !== undefined &&
      this.amount !== undefined &&
      this.customer !== undefined &&
      this.billing !== undefined &&
      this.referrer !== undefined
      // this.frequency !== undefined
    )
  }
}
