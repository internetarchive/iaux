import { CustomerResponse } from './customer_response';
import { BillingResponse } from './billing_response';
import { SubscriptionResponse } from './subscription_response';
import { ResponseValueInterface } from '../response_value';

export class SuccessResponse implements ResponseValueInterface {
  paymentMethodNonce: string;
  amount: string;
  transaction_id: string;
  customer_id: string;
  customer: CustomerResponse;
  billing: BillingResponse;
  subscription: SubscriptionResponse | undefined;

  constructor(params: any) {
    this.paymentMethodNonce = params.paymentMethodNonce;
    this.amount = params.amount;
    this.transaction_id = params.transaction_id;
    this.customer_id = params.customer_id;

    this.customer = new CustomerResponse(params.customer);
    this.billing = new BillingResponse(params.billing);

    if (params.subscription) {
      this.subscription = new SubscriptionResponse(params.subscription);
    }
  }
}
