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

import { DonationPaymentInfo } from '../models/donation-info/donation-payment-info';
import { DonationFrequency } from '../models/donation-info/donation-frequency';
import { PaymentFlowHandlersInterface } from '../payment-flow-handlers/payment-flow-handlers';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) paymentFlowHandlers: PaymentFlowHandlersInterface | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    frequency: DonationFrequency.OneTime,
    amount: 5,
    isUpsell: false
  });

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
    if (changedProperties.has('paymentFlowHandlers')) {
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo);
      this.paymentFlowHandlers?.paypalHandler?.renderPayPalButton();
    }

    if (changedProperties.has('donationInfo')) {
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo);
    }
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    this.dispatchEvent(new Event('applePaySelected'));
    // you must pass the event to start the ApplePay flow
    this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(
      this.donationInfo.amount, e);
  }

  private venmoSelected(): void {
    this.dispatchEvent(new Event('venmoSelected'));
  }

  private creditCardSelected(): void {
    this.dispatchEvent(new Event('creditCardSelected'));
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
