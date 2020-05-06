import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  PropertyValues,
} from 'lit-element';

import './form-section';
import './donation-form-header/donation-form-header';
import './contact-form';
import './payment-selector';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintree: any | undefined;

  @property({ type: Object }) braintreeClient: any | undefined;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header></donation-form-header>

      <form-section number=3 headline="Tell us about yourself">
        <contact-form></contact-form>
      </form-section>

      <form-section number=4 headline="Choose a payment method">
        <payment-selector
          .braintree=${this.braintree}
          .braintreeClient=${this.braintreeClient}>
        </payment-selector>
      </form-section>

      <form-section number=5>
        <button>Donate</button>
      </form-section>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('braintree')) {
      this.createBraintreeClient();
    }
  }

  private createBraintreeClient(): void {
    console.log('starting braintree client creation');
    this.braintree?.client.create({
      authorization: 'sandbox_x634jsj7_7zybks4ybp63pbmd',
      debug: true
    }, (clientErr: any | undefined, clientInstance: any | undefined) => {
      console.log('braintree client creation complete');
      if (clientErr) {
        console.error(clientErr);
        return;
      }

      console.log(clientInstance);
      this.braintreeClient = clientInstance;
    });
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
