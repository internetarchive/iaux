import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;

  static get default() {
    return new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: 5
    });
  }

  constructor(params: {
    donationType: DonationType,
    amount: number
  }) {
    this.donationType = params.donationType;
    this.amount = params.amount;
  }
}
