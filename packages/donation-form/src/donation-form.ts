import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  query,
  PropertyValues,
} from 'lit-element';

import './form-section';
import './donation-form-header/donation-form-header';
import './contact-form';
import './payment-selector';
import './donation-modal';
import { BraintreeManagerInterface } from './braintree-manager/braintree-manager';
import { DonationRequest } from './models/request_models/donation-request';
import { ContactForm } from './contact-form';
import { RecaptchaManagerInterface } from './recaptcha-manager';
import { DonationPaymentInfo } from './models/donation-info/donation-payment-info';
import { DonationFormHeader } from './donation-form-header/donation-form-header';
import { DonationFrequency } from './models/donation-info/donation-frequency';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) recaptchaManager: RecaptchaManagerInterface | undefined;

  @property({ type: Object }) donationRequest: DonationRequest | undefined;

  @property({ type: Boolean }) modalVisible = false;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    frequency: DonationFrequency.OneTime,
    amount: 5,
    isUpsell: false
  });

  @query('contact-form') contactForm!: ContactForm;

  @query('donation-form-header') donationFormHeader!: DonationFormHeader;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header
        @donationInfoChanged=${this.donationInfoChanged}
        .donationInfo=${this.donationInfo}>
      </donation-form-header>

      <form-section number=3 headline="Tell us about yourself">
        <contact-form></contact-form>
      </form-section>

      <form-section number=4 headline="Choose a payment method">
        <payment-selector
          .braintreeManager=${this.braintreeManager}
          .donationInfo=${this.donationInfo}>
          <slot name="braintree-hosted-fields" slot="braintree-hosted-fields"></slot>
          <slot name="paypal-button" slot="paypal-button"></slot>
        </payment-selector>
      </form-section>

      <form-section number=5>
        <button @click=${this.donateClicked}>Donate</button>
      </form-section>

      <!-- <slot name="paypal-upsell-button"></slot> -->
      ${this.modalView}
    `;
  }

  get modalView(): TemplateResult {
    if (!this.modalVisible) { return html``; }

    return html`
      <donation-modal>
        <slot name="paypal-upsell-button"></slot>
      </donation-modal>
    `;
  }

  firstUpdated() {
    const urlParams = new URLSearchParams(window.location.search);

    const frequencyParam = urlParams.get('frequency');
    const amountParam = urlParams.get('amount');

    let frequency = DonationFrequency.OneTime;
    if (frequencyParam === 'monthly') {
      frequency = DonationFrequency.Monthly;
    }

    let amount = 5;
    if (amountParam) {
      amount = parseFloat(amountParam);
    }

    const donationInfo = new DonationPaymentInfo({
      frequency: frequency,
      amount: amount,
      isUpsell: false
    });

    this.donationInfo = donationInfo;

    console.log('donationInfo', donationInfo);
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('modalVisible') && this.modalVisible) {
      const upsellDonationInfo = new DonationPaymentInfo({
        frequency: DonationFrequency.Monthly,
        amount: 10,
        isUpsell: true
      });
      this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
        selector: '#paypal-upsell-button',
        style: {
          color: 'gold',
          label: 'paypal',
          size: 'small',
          tagline: false
        },
        donationInfo: upsellDonationInfo
      });
    }
  }

  private donationInfoChanged(e: CustomEvent) {
    const donationInfo: DonationPaymentInfo = e.detail.donationInfo;
    this.donationInfo = donationInfo;
    console.log('DonationForm donationInfoChanged', donationInfo);
    this.braintreeManager?.updateDonationInfo(donationInfo);
  }

  private donateClicked() {
    this.recaptchaManager?.execute();
    this.modalVisible = true
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
