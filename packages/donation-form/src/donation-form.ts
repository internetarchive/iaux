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
import { RecaptchaManagerInterface } from './recaptcha-manager';
import { DonationPaymentInfo } from './models/donation-info/donation-payment-info';
import { DonationFormHeader } from './donation-form-header/donation-form-header';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) recaptchaManager: RecaptchaManagerInterface | undefined;

  @property({ type: Object }) donationRequest: DonationRequest = new DonationRequest();

  @query('contact-form') contactForm!: ContactForm;

  @query('donation-form-header') donationFormHeader!: DonationFormHeader;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header
        @donationInfoChanged=${this.donationInfoChanged}>
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

    const urlParams = new URLSearchParams(window.location.search);

    const frequency = urlParams.get('frequency');
    const amount = urlParams.get('amount');

    if (frequency && amount) {
      const donationInfo = new DonationPaymentInfo(frequency, amount);
      console.log('donationInfo', donationInfo);
      this.donationFormHeader.donationInfo = donationInfo;
    }
  }

  private donationInfoChanged(e: CustomEvent) {
    const donationInfo: DonationPaymentInfo = e.detail.donationInfo;
    console.log('DonationForm donationInfoChanged', donationInfo);
    this.donationRequest.frequency = donationInfo.type;
    this.donationRequest.amount = donationInfo.amount;
    this.braintreeManager?.updateDonationInfo(donationInfo);
  }

  private donateClicked() {
    this.recaptchaManager?.execute();

    // this.donationRequest.paymentMethodNonce = 'fake-valid-nonce';
    // this.donationRequest.billing = this.contactForm.billingInfo;
    // this.donationRequest.customer = this.contactForm.contactInfo;

    // this.braintreeManager?.submitDataToEndpoint(this.donationRequest);
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
