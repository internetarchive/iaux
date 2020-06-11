import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;
  coverFees: boolean;

  get fee(): number {
    return (this.amount * 0.022) + 0.30
  }

  get total(): number {
    return this.coverFees ? this.amount + this.fee : this.amount;
  }

  static get default() {
    return new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: 5,
      coverFees: false
    });
  }

  constructor(params: {
    donationType: DonationType,
    amount: number,
    coverFees: boolean
  }) {
    this.donationType = params.donationType;
    this.amount = params.amount;
    this.coverFees = params.coverFees
  }
}
