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
import { DonationType } from '../models/donation-info/donation-type';
import { PaymentFlowHandlersInterface } from '../payment-flow-handlers/payment-flow-handlers';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) paymentFlowHandlers: PaymentFlowHandlersInterface | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = DonationPaymentInfo.default;

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
    this.paymentFlowHandlers?.applePayHandler?.paymentInitiated(this.donationInfo, e);
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
