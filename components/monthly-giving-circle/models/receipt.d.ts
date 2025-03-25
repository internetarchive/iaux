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
export declare class Receipt {
    receipt: AReceipt;
    constructor(receipt: AReceipt);
    get amountFormatted(): string;
    get amount(): string;
    get isTest(): boolean;
    get id(): string;
    get date(): string;
    get currencySymbol(): string;
}
export {};
