import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  query,
} from 'lit-element';

import './form-section';
import './donation-form-header/donation-form-header';
import './contact-form';
import './payment-selector';
import { BraintreeManagerInterface } from './braintree-manager/braintree-manager';
import { DonationRequest } from './models/request_models/donation_request';
import { ContactForm } from './contact-form';
import { DonationType } from './models/donation-info/donation-type';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) donationRequest: DonationRequest = new DonationRequest();

  @query('contact-form') contactForm!: ContactForm;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header
        @donationAmountChanged=${this.amountChanged}
        @donationTypeChanged=${this.frequencyChanged}>
      </donation-form-header>

      <form-section number=3 headline="Tell us about yourself">
        <contact-form></contact-form>
      </form-section>

      <form-section number=4 headline="Choose a payment method">
        <payment-selector .braintreeManager=${this.braintreeManager}>
          <slot name="braintree-hosted-fields" slot="braintree-hosted-fields"></slot>
          <slot name="paypal-button" slot="paypal-button"></slot>
        </payment-selector>
      </form-section>

      <form-section number=5>
        <button @click=${this.donateClicked}>Donate</button>
      </form-section>
    `;
  }

  firstUpdated() {
    // this.donationRequest.type = DonationType.OneTime;
    this.donationRequest.amount = 50;
  }

  private frequencyChanged(e: CustomEvent) {
    console.log('DonationForm frequencyChanged', e.detail.frequency);
    // this.donationRequest.frequency = e.detail.frequency;
  }

  private amountChanged(e: CustomEvent) {
    console.log('DonationForm amountChanged', e.detail.amount);
    this.donationRequest.amount = e.detail.amount;
    console.log(this.donationRequest);
  }

  private donateClicked() {
    this.donationRequest.paymentMethodNonce = 'fake-valid-nonce';
    this.donationRequest.billing = this.contactForm.billingInfo;
    this.donationRequest.customer = this.contactForm.contactInfo;

    this.braintreeManager?.submitDataToEndpoint(this.donationRequest);
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
