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

import './form-elements/form-section';
import './form-elements/header/donation-form-header';
import './form-elements/contact-form';
import './form-elements/payment-selector';
import './modal-manager/modal-template';
import { BraintreeManagerInterface } from './braintree-manager/braintree-manager';
import { DonationRequest } from './models/request_models/donation-request';
import { ContactForm } from './form-elements/contact-form';
import { DonationPaymentInfo } from './models/donation-info/donation-payment-info';
import { DonationFormHeader, DonationFormHeaderMode } from './form-elements/header/donation-form-header';
import { DonationType } from './models/donation-info/donation-type';
import { PaymentFlowHandlersInterface } from './payment-flow-handlers/payment-flow-handlers';
import { PaymentProvider } from './models/common/payment-provider-name';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) paymentFlowHandlers: PaymentFlowHandlersInterface | undefined;

  @property({ type: Object }) donationRequest: DonationRequest | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = DonationPaymentInfo.default;

  @property({ type: Boolean }) private creditCardVisible = false;

  @property({ type: Boolean }) private contactFormVisible = false;

  @property({ type: String }) private selectedPaymentProvider?: PaymentProvider;

  @query('contact-form') contactForm?: ContactForm;

  @query('donation-form-header') donationFormHeader!: DonationFormHeader;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header
        @donationInfoChanged=${this.donationInfoChanged}
        .donationInfo=${this.donationInfo}>
      </donation-form-header>

      <form-section number=3 headline="Choose a payment method">
        <payment-selector
          .paymentFlowHandlers=${this.paymentFlowHandlers}
          .donationInfo=${this.donationInfo}
          @creditCardSelected=${this.creditCardSelected}
          @venmoSelected=${this.venmoSelected}
          @applePaySelected=${this.applePaySelected}
          @googlePaySelected=${this.googlePaySelected}>
          <slot name="paypal-button" slot="paypal-button"></slot>
        </payment-selector>
      </form-section>

      ${this.contactFormSection}
    `;
  }

  get contactFormSection(): TemplateResult {
    if (!this.contactFormVisible) { return html``; }
    return html`
      <form-section number=4 headline="Tell us about yourself">
        <contact-form></contact-form>
        ${this.creditCardVisible ?
            html`<slot name="braintree-hosted-fields"></slot>` : ''}
      </form-section>

      <form-section number=5>
        <button @click=${this.donateClicked}>Donate</button>
      </form-section>
    `;
  }

  private applePaySelected(): void {
    this.selectedPaymentProvider = PaymentProvider.ApplePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;
  }

  private googlePaySelected(): void {
    this.selectedPaymentProvider = PaymentProvider.GooglePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;
  }

  private creditCardSelected(): void {
    this.selectedPaymentProvider = PaymentProvider.CreditCard;
    this.contactFormVisible = true;
    this.creditCardVisible = true;
  }

  private venmoSelected(): void {
    this.selectedPaymentProvider = PaymentProvider.Venmo;
    this.contactFormVisible = true;
    this.creditCardVisible = false;
  }

  firstUpdated() {
    this.readQueryParams();
  }

  private readQueryParams(): void {
    const urlParams = new URLSearchParams(window.location.search);

    const frequencyParam = urlParams.get('frequency');
    const amountParam = urlParams.get('amount');

    let frequency = DonationType.OneTime;
    if (frequencyParam === 'monthly') {
      frequency = DonationType.Monthly;
    }

    let amount = 5;
    if (amountParam) {
      amount = parseFloat(amountParam);
    }

    const donationInfo = new DonationPaymentInfo({
      donationType: frequency,
      amount: amount
    });

    this.donationInfo = donationInfo;

    if (amountParam || frequencyParam) {
      this.donationFormHeader.mode = DonationFormHeaderMode.Summary;
    } else {
      this.donationFormHeader.mode = DonationFormHeaderMode.Edit;
    }

    console.log('donationInfo', donationInfo);
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('creditCardVisible')) {
      if (this.creditCardVisible) {
        this.braintreeManager?.paymentProviders.creditCardHandler?.setupHostedFields();
      } else {
        this.braintreeManager?.paymentProviders.creditCardHandler?.teardownHostedFields();
      }
    }
  }

  private donationInfoChanged(e: CustomEvent) {
    const donationInfo: DonationPaymentInfo = e.detail.donationInfo;
    this.donationInfo = donationInfo;
    console.log('DonationForm donationInfoChanged', donationInfo);
    this.braintreeManager?.updateDonationInfo(donationInfo);
  }

  private donateClicked() {
    if (!this.contactForm) {
      alert('NO CONTACT FORM');
      return;
    }
    const contactInfo = this.contactForm.donorContactInfo;

    switch (this.selectedPaymentProvider) {
      case PaymentProvider.CreditCard:
        this.paymentFlowHandlers?.creditCardHandler?.paymentInitiated(this.donationInfo, contactInfo);
        break;
      case PaymentProvider.Venmo:
        this.paymentFlowHandlers?.venmoHandler?.paymentInitiated(contactInfo, this.donationInfo);
        break;
    }
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      h1 {
        margin: 0;
        padding: 0;
      }
    `;
  }
}
