import { DonationFrequency } from "./donation-frequency";

export class DonationPaymentInfo {
  frequency: DonationFrequency;
  amount: number;
  isUpsell: boolean;

  constructor(params: {
    frequency: DonationFrequency,
    amount: number,
    isUpsell: boolean
  }) {
    this.frequency = params.frequency;
    this.amount = params.amount;
    this.isUpsell = params.isUpsell;
  }
}
