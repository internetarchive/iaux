import { DonationType } from "./donation-type";

export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;
  coverFees: boolean;

  get feeAmountCovered(): number {
    return this.coverFees ? this.fee : 0;
  }

  get fee(): number {
    const fee = (this.amount * 0.022) + 0.30;
    return isNaN(fee) ? 0 : fee;
  }

  get total(): number {
    const total = this.amount + this.feeAmountCovered;
    return isNaN(total) ? 0 : total;
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
