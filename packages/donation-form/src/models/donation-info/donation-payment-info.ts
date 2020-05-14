import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  type: DonationType;

  amount: number;

  constructor(
    type: DonationType,
    amount: number
  ) {
    this.type = type;
    this.amount = amount;
  }
}
