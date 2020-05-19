export interface ApplePaySessionManagerInterface {
  canMakePayments(): boolean;
  canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;
  createNewPaymentSession(paymentRequest: ApplePayJS.ApplePayPaymentRequest): ApplePaySession;
}

export class ApplePaySessionManager implements ApplePaySessionManagerInterface {
  static VERSION = 3;

  canMakePayments(): boolean {
    return ApplePaySession &&
     ApplePaySession.supportsVersion(ApplePaySessionManager.VERSION) &&
     ApplePaySession.canMakePayments();
  }

  async canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean> {
    return ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
  }

  createNewPaymentSession(paymentRequest: ApplePayJS.ApplePayPaymentRequest): ApplePaySession {
    var session = new ApplePaySession(ApplePaySessionManager.VERSION, paymentRequest);
    return session;
  }
}
