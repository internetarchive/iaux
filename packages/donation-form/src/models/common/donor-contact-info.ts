import { CustomerInfo } from "./customer-info";
import { BillingInfo } from "./billing-info";

/**
 * This is a container for combining `CustomerInfo` and `BillingInfo` since we
 * use these together frequently.
 *
 * @export
 * @class DonorContactInfo
 */
export class DonorContactInfo {
  customer: CustomerInfo;
  billing: BillingInfo;

  constructor(params: {
    customer: CustomerInfo,
    billing: BillingInfo
  }) {
    this.customer = params.customer;
    this.billing = params.billing;
  }
}
