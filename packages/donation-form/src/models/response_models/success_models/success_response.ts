import { CustomerInfo } from '../../common/customer_info';
import { BillingInfo } from '../../common/billing_info';
import { SubscriptionResponse } from './subscription_response';
import { ResponseValueInterface } from '../response_value';

export class SuccessResponse implements ResponseValueInterface {
  paymentMethodNonce: string;
  amount: string;
  transaction_id: string;
  customer_id: string;
  customer: CustomerInfo;
  billing: BillingInfo;
  subscription: SubscriptionResponse | undefined;

  constructor(params: any) {
    this.paymentMethodNonce = params.paymentMethodNonce;
    this.amount = params.amount;
    this.transaction_id = params.transaction_id;
    this.customer_id = params.customer_id;

    this.customer = new CustomerInfo(params.customer);
    this.billing = new BillingInfo(params.billing);

    if (params.subscription) {
      this.subscription = new SubscriptionResponse(params.subscription);
    }
  }
}
