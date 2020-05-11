import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  readonly type: DonationType;

  readonly amount: number;

  constructor(
    type: DonationType,
    amount: number
  ) {
    this.type = type;
    this.amount = amount;
  }
}
