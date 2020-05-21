import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  PropertyValues,
  query,
} from 'lit-element';

import { BraintreeManagerInterface } from './braintree-manager/braintree-manager';
import { DonationPaymentInfo } from './models/donation-info/donation-payment-info';
import { DonationFrequency } from './models/donation-info/donation-frequency';
import { PayPalButtonDataSourceInterface, PayPalButtonDataSourceDelegate } from './braintree-manager/payment-providers/paypal/paypal-button-datasource';
import { DonationResponse } from './models/response-models/donation-response';

@customElement('payment-selector')
export class PaymentSelector extends LitElement implements PayPalButtonDataSourceDelegate {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    frequency: DonationFrequency.OneTime,
    amount: 5,
    isUpsell: false
  });

  @property({ type: Object }) private paypalDataSource: PayPalButtonDataSourceInterface | undefined;

  // @property({ type: Boolean }) private creditCardVisible = false;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <slot name="paypal-button"></slot>
      <button @click=${this.applePaySelected}>Apple Pay</button>
      <button @click=${this.googlePaySelected}>Google Pay</button>
      <button @click=${this.venmoSelected}>Venmo</button>
      <button @click=${this.creditCardSelected}>Credit Card</button>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('braintreeManager')) {
      this.setupPayPal();
    }

    if (changedProperties.has('donationInfo')) {
      this.paypalDataSource?.updateDonationInfo(this.donationInfo);
    }
  }

  payPalPaymentStarted(options: object): void {
    console.debug('PaymentSector:payPalPaymentStarted options:', options);
  }

  payPalPaymentAuthorized(payload: braintree.PayPalCheckoutTokenizePayload, response: DonationResponse): void {
    console.debug('PaymentSector:payPalPaymentAuthorized payload,response', payload,response);
  }

  payPalPaymentCancelled(data: object): void {
    console.debug('PaymentSector:payPalPaymentCancelled data:', data);
  }

  payPalPaymentError(error: string): void {
    console.debug('PaymentSector:payPalPaymentError error:', error);
  }

  private async setupPayPal(): Promise<void> {
    this.paypalDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-button',
      style: {
        color: 'blue' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'small' as paypal.ButtonSizeOption,
        tagline: false
      },
      donationInfo: this.donationInfo
    });
    if (this.paypalDataSource) {
      this.paypalDataSource.delegate = this;
    }
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    this.dispatchEvent(new Event('applePaySelected'));
    // you must pass the event to start the ApplePay flow
    this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(e);
  }

  private venmoSelected(): void {
    this.dispatchEvent(new Event('venmoSelected'));
  }

  private creditCardSelected(): void {
    this.dispatchEvent(new Event('creditCardSelected'));
    // this.creditCardVisible = !this.creditCardVisible;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
