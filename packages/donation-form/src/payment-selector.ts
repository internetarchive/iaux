import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <button>Apple Pay</button>
      <button>Google Pay</button>
      <button>Venmo</button>
      <button>PayPal</button>
      <button>Credit Card</button>
    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
