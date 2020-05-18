import { DonationFrequency } from "./donation-frequency";

export class DonationPaymentInfo {
  type: DonationFrequency;

  amount: number;

  constructor(
    type: DonationFrequency,
    amount: number
  ) {
    this.type = type;
    this.amount = amount;
  }
}
