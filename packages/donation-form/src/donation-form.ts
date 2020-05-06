import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

import './form-section';
import './donation-form-header/donation-form-header';
import './contact-form';
import './payment-selector';
import { BraintreeManagerInterface } from './braintree-manager';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header></donation-form-header>

      <form-section number=3 headline="Tell us about yourself">
        <contact-form></contact-form>
      </form-section>

      <form-section number=4 headline="Choose a payment method">
        <payment-selector .braintreeManager=${this.braintreeManager}>

          <slot name="braintree-hosted-fields"></slot>

        </payment-selector>
      </form-section>

      <form-section number=5>
        <button>Donate</button>
      </form-section>
    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
