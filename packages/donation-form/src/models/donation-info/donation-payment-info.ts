import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;

  constructor(params: {
    donationType: DonationType,
    amount: number
  }) {
    this.donationType = params.donationType;
    this.amount = params.amount;
  }
}
