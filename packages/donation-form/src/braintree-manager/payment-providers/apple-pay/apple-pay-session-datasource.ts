import { DonationPaymentInfo } from "../../../models/donation-info/donation-payment-info";
import { BraintreeManagerInterface } from "../../braintree-manager";
import { BillingInfo } from "../../../models/common/billing-info";
import { CustomerInfo } from "../../../models/common/customer-info";
import { DonationRequest } from "../../../models/request_models/donation-request";
import { DonationType } from "../../../models/donation-info/donation-type";
import { DonationResponse } from "../../../models/response-models/donation-response";
import { PaymentProvider } from "../../../models/common/payment-provider-name";

export interface ApplePaySessionDataSourceInterface {
  delegate?: ApplePaySessionDataSourceDelegate;
  updateDonationInfo(donationInfo: DonationPaymentInfo): void;
  onvalidatemerchant(event: ApplePayJS.ApplePayValidateMerchantEvent): Promise<void>;
  onpaymentauthorized(event: ApplePayJS.ApplePayPaymentAuthorizedEvent): Promise<void>;
}

export interface ApplePaySessionDataSourceDelegate {
  paymentComplete(response: DonationResponse): void;
  paymentFailed(error: string): void;
}

export class ApplePaySessionDataSource implements ApplePaySessionDataSourceInterface {
  delegate?: ApplePaySessionDataSourceDelegate;

  private session: ApplePaySession;
  private applePayInstance: any;
  private donationInfo: DonationPaymentInfo;
  private braintreeManager: BraintreeManagerInterface;

  updateDonationInfo(donationInfo: DonationPaymentInfo): void {
    console.log('updateDonationInfo', donationInfo);
    this.donationInfo = donationInfo;
  }

  constructor(options: {
    donationInfo: DonationPaymentInfo,
    session: ApplePaySession,
    applePayInstance: any,
    braintreeManager: BraintreeManagerInterface
  }) {
    this.session = options.session;
    this.donationInfo = options.donationInfo;
    this.applePayInstance = options.applePayInstance;
    this.braintreeManager = options.braintreeManager;
  }

  async onvalidatemerchant(event: ApplePayJS.ApplePayValidateMerchantEvent): Promise<void> {
    console.log('onvalidatemerchant', event);

    this.applePayInstance.performValidation({
      validationURL: event.validationURL,
      displayName: 'Internet Archive'
    }, (validationErr: any, validationData: any) => {
      if (validationErr) {
        console.error(validationErr);
        this.delegate?.paymentFailed(validationErr);
        this.session.abort();
        return;
      }
      console.log('validate merchant', validationData);

      this.session.completeMerchantValidation(validationData);
    });
  };

  async onpaymentauthorized(event: ApplePayJS.ApplePayPaymentAuthorizedEvent): Promise<void> {
    console.log('onpaymentauthorized, event', event);

    let payload;

    try {
      payload = await this.applePayInstance.tokenize({
        token: event.payment.token
      });
    } catch (err) {
      console.error('Error tokenizing Apple Pay:', err);
      this.delegate?.paymentFailed(err);
      this.session.completePayment(ApplePaySession.STATUS_FAILURE);
      return;
    }

    console.log('payload', payload);

    const payment = event.payment;
    const billingContact = payment.billingContact;
    const addressLines = billingContact?.addressLines;

    let line1 = undefined;
    let line2 = undefined;

    if (addressLines) {
      line1 = addressLines[0];
      line2 = addressLines[1];
    }

    const billingInfo = new BillingInfo({
      streetAddress: line1,
      extendedAddress: line2,
      locality: billingContact?.locality,
      region: billingContact?.administrativeArea,
      postalCode: billingContact?.postalCode,
      countryCodeAlpha2: billingContact?.countryCode
    })

    const customerInfo = new CustomerInfo({
      email: billingContact?.emailAddress,
      firstName: billingContact?.givenName,
      lastName: billingContact?.familyName
    })

    const donationRequest = new DonationRequest({
      paymentProvider: PaymentProvider.ApplePay,
      paymentMethodNonce: payload.nonce,
      amount: 5,
      donationType: DonationType.OneTime,
      customer: customerInfo,
      billing: billingInfo,
      customFields: {
        referrer: undefined
      }
    })

    console.log('nonce:', payload.nonce);

    try {
      const donationResponse = await this.braintreeManager.submitDataToEndpoint(donationRequest);
      if (donationResponse.success) {
        this.delegate?.paymentComplete(donationResponse);
        this.session.completePayment(ApplePaySession.STATUS_SUCCESS);
      } else {
        this.delegate?.paymentFailed('Failure submitting data');
        this.session.completePayment(ApplePaySession.STATUS_FAILURE);
      }
    } catch (err) {
      this.delegate?.paymentFailed(err);
      this.session.completePayment(ApplePaySession.STATUS_FAILURE);
    }
  };

}
