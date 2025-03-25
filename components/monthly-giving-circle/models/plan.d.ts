type BtData = {
    billingDayOfMonth: number;
    nextBillingDate: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    status: string;
    paymentMethodType: string;
    last4: string | null;
    cardType: string | null;
    expirationMonth: string | null;
    expirationYear: string | null;
    paypalEmail?: string;
    venmoUsername?: string;
};
type Plan = {
    token: string;
    amount: number;
    currency: string;
    start_date: string;
    is_test: boolean;
    btdata: BtData;
    oldAmount?: number;
    oldDate?: string;
    oldPaymentMethod?: string;
    isCancelled?: boolean;
};
export declare class MonthlyPlan {
    plan: Plan;
    currency: string;
    payment: BtData;
    constructor(plan: Plan);
    get id(): string;
    get currencySymbol(): string;
    get amount(): number;
    get startDate(): string;
    get nextBillingDate(): string;
    get hasBeenCancelled(): boolean;
    get isTest(): boolean;
    cancelPlan(): void;
}
export {};
