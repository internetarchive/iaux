import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
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

  /** inheritdoc */
  firstUpdated(): void {
    this.dispatchEvent(new Event('firstUpdated'));
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    const event = new CustomEvent('applePaySelected', { detail: { originalEvent: e }})
    this.dispatchEvent(event);
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
