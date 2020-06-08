import { DonationType } from "./donation-type";

export enum DonationPaymentInfoState {
  Valid = 'valid',
  TooHigh = 'toohigh',
  BelowMinimum = 'below-minimum'
}

export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;

  get state(): DonationPaymentInfoState {
    if (this.amount > 10000) {
      return DonationPaymentInfoState.TooHigh;
    }
    if (this.amount < 5 && this.donationType === DonationType.OneTime) {
      return DonationPaymentInfoState.BelowMinimum;
    }
    return DonationPaymentInfoState.Valid
  }

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
