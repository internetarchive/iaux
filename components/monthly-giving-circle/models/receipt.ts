type AReceipt = {
  currency: string;
  net_amount: number;
  total_amount: number;
  fee_amount: number;
  receive_date?: Date;
  date: string;
  isTest: boolean;
  token: string;
};
export class Receipt {
  receipt: AReceipt;

  constructor(receipt: AReceipt) {
    this.receipt = receipt;
  }

  get amountFormatted(): string {
    const value = this.receipt.total_amount ?? this.receipt.net_amount;
    const currencyType = this.receipt.currency ?? 'CURR not found';
    if (value) {
      return `${currencyType} ${this.currencySymbol}${value}`;
    }
    return "no amount found, can't find total_amount or net_amount";
  }

  get amount(): string {
    return (
      this.receipt.total_amount?.toString() ??
      this.receipt.net_amount?.toString() ??
      "no amount found, can't find total_amount or net_amount"
    );
  }

  get isTest(): boolean {
    return this.receipt.isTest ?? false;
  }

  get id(): string {
    return this.receipt.token ?? 'no token found';
  }

  get date(): string {
    return this.receipt.date ?? 'no date found';
  }

  get currencySymbol(): string {
    if (this.receipt.currency === 'USD') {
      return '$';
    }

    return '';
  }
}
