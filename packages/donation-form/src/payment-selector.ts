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

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Boolean }) private creditCardVisible = false;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <button @click=${this.startApplePay}>Apple Pay</button>
      <button>Google Pay</button>
      <button @click=${this.startVenmo}>Venmo</button>
      <slot name="paypal-button"></slot>
      <button @click=${this.toggleCreditCard}>Credit Card</button>
      ${this.creditCardVisible ? html`<slot name="braintree-hosted-fields"></slot>` : ''}
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('braintreeManager')) {
      this.braintreeManager?.paymentProviders.creditCardHandler?.setupHostedFields();
      this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton();
      console.log('updated', this.braintreeManager?.paymentProviders);
    }
  }

  private startApplePay(e: Event): void {
    // you must pass the event to start the ApplePay flow
    this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(e);
  }

  private startVenmo(): void {
    this.braintreeManager?.paymentProviders.venmoHandler?.startPayment();
  }

  private toggleCreditCard(): void {
    this.creditCardVisible = !this.creditCardVisible;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      div[slot='braintree-hosted-fields'] div {
        height: 30px;
      }
    `;
  }
}
