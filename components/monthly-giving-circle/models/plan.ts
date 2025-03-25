type BtData = {
  billingDayOfMonth: number;
  nextBillingDate: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  status: string; // active, inactive
  paymentMethodType: string; // cc, paypal, venmo, etc
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
  start_date: string; // UTC
  is_test: boolean;
  btdata: BtData;
  oldAmount?: number;
  oldDate?: string;
  oldPaymentMethod?: string;
  isCancelled?: boolean;
};

export class MonthlyPlan {
  plan: Plan;

  currency: string;

  payment: BtData;

  constructor(plan: Plan) {
    this.plan = plan;
    this.payment = plan.btdata;
    this.currency = plan.currency ?? 'USD'; // not in data
  }

  get id(): string {
    // use token as unique id
    return this.plan.token;
  }

  get currencySymbol(): string {
    return this.currency === 'USD' ? '$' : '';
  }

  get amount(): number {
    return this.plan.amount;
  }

  get startDate(): string {
    const date = new Date(this.plan.start_date);
    return date.toLocaleDateString();
  }

  get nextBillingDate(): string {
    const nextBillingDate = new Date(
      this.payment.nextBillingDate.date
    ).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return nextBillingDate ?? 'not found';
  }

  get hasBeenCancelled(): boolean {
    return this.plan.isCancelled === true;
  }

  get isTest(): boolean {
    return this.plan.is_test;
  }

  cancelPlan(): void {
    this.plan.isCancelled = true;
  }
}

/*

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYWlsc3luYyIsImlhdCI6MTczODYxNTY3NS41ODA4MTcsIm5iZiI6MTczODYxNTYxNS41ODA4MTcsImV4cCI6MTczODYxNjI3NS41ODA4MTcsImtleSI6eyJwaWQiOiJkd2NrN20iLCJjaWQiOjgwMzUzOCwiYW1vdW50Ijo1LCJwYXltZW50TWV0aG9kVG9rZW4iOiJxMXllYndoaiIsImN1c3RvbWVySWQiOiI4NTQ2MTk4MzUifSwidXNlciI6IkBpc2EtYXQtdGhlLWFyY2hpdmUifQ.TYlkU1ZZLHmj2ahrkTV7JGLmpCPN4BcOeDFPiXVj0pM",
  "amount": 5,
  "currency": "USD",
  "start_date": "2022-12-09 00:00:00",
  "contribution_status_id": 5,
  "is_test": true,
  "btdata": {
    "billingDayOfMonth": 9,
    "nextBillingDate": {
      "date": "2025-02-09 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "UTC"
    },
    "status": "Active",
    "paymentMethodType": "creditCard",
    "last4": "1111",
    "cardType": "Visa",
    "expirationMonth": "12",
    "expirationYear": "2023"
  }
}
  */
