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

import currency from 'currency.js';

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
import { PaymentSelector } from './form-elements/payment-selector';

@customElement('donation-form')
export class DonationForm extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) paymentFlowHandlers: PaymentFlowHandlersInterface | undefined;

  @property({ type: Object }) donationRequest: DonationRequest | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = DonationPaymentInfo.default;

  @property({ type: Boolean }) private creditCardVisible = false;

  @property({ type: Boolean }) private contactFormVisible = false;

  @property({ type: Boolean }) private donationInfoValid = true;

  @property({ type: String }) private selectedPaymentProvider?: PaymentProvider;

  @query('contact-form') contactForm?: ContactForm;

  @query('donation-form-header') donationFormHeader!: DonationFormHeader;

  @query('payment-selector') paymentSelector!: PaymentSelector;

  private paypalButtonNeedsRender = true;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>

      <donation-form-header
        @donationInfoChanged=${this.donationInfoChanged}
        @editDonationError=${this.editDonationError}>
      </donation-form-header>

      <form-section number=3 headline="Choose a payment method">
        <input
          type="checkbox"
          id="cover-fees"
          @input=${this.coverFeesChecked} />
        <label for="cover-fees">
          I'll generously add ${currency(this.donationInfo.fee, { formatWithSymbol: true }).format()} to cover the transaction fees so you can keep 100% of my donation.
        </label>
        <payment-selector
          .paymentProviders=${this.braintreeManager?.paymentProviders}
          @firstUpdated=${this.paymentSelectorFirstUpdated}
          @creditCardSelected=${this.creditCardSelected}
          @venmoSelected=${this.venmoSelected}
          @applePaySelected=${this.applePaySelected}
          @googlePaySelected=${this.googlePaySelected}
          @paypalBlockerSelected=${this.paypalBlockerSelected}>
          <slot name="paypal-button" slot="paypal-button"></slot>
        </payment-selector>
      </form-section>

      Total: ${currency(this.donationInfo.total, { formatWithSymbol: true }).format()}

      <div class="contact-form-section" class="${this.contactFormVisible ? '' : 'hidden'}">
        ${this.contactFormSection}
      </div>
    `;
  }

  get contactFormSection(): TemplateResult {
    return html`
      <form-section number=4 headline="Tell us about yourself">
        <contact-form></contact-form>
        <div class="credit-card-fields" class="${this.creditCardVisible ? '' : 'hidden'}">
          <slot name="braintree-hosted-fields"></slot>
        </div>
      </form-section>

      <form-section number=5>
        <button @click=${this.donateClicked} ?disabled=${this.donationInfoValid === false}>Donate</button>
      </form-section>
    `;
  }

  private coverFeesChecked(e: Event): void {
    const target = e.target as HTMLInputElement;
    const coverFees = target.checked;
    this.donationInfo = new DonationPaymentInfo({
      amount: this.donationInfo.amount,
      donationType: this.donationInfo.donationType,
      coverFees: coverFees
    });
  }

  private editDonationError(e: CustomEvent): void {
    this.donationInfoValid = false;
    console.debug('editDonationError', e.detail);
  }

  private paymentSelectorFirstUpdated(): void {
    console.debug('paymentSelectorFirstUpdated', this.donationInfo);
    if (this.paypalButtonNeedsRender && this.paymentFlowHandlers?.paypalHandler) {
      this.renderPayPalButton();
    }
  }

  private applePaySelected(e: CustomEvent): void {
    this.selectedPaymentProvider = PaymentProvider.ApplePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;

    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
      return;
    }

    const originalEvent = e.detail.originalEvent;
    this.paymentFlowHandlers?.applePayHandler?.paymentInitiated(this.donationInfo, originalEvent);
  }

  private googlePaySelected(): void {
    this.selectedPaymentProvider = PaymentProvider.GooglePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;

    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
    } else {
      this.paymentFlowHandlers?.googlePayHandler?.paymentInitiated(this.donationInfo);
    }
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

  private paypalBlockerSelected(): void {
    this.contactFormVisible = false;
    this.creditCardVisible = false;
    this.showInvalidDonationInfoAlert();
  }

  private donateClicked() {
    if (!this.contactForm) {
      console.error('no contact form');
      alert('Please enter contact info.');
      return;
    }
    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
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

  private showInvalidDonationInfoAlert(): void {
    alert('Please enter valid donation info.');
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
      amount: amount,
      coverFees: false
    });

    console.debug('queryParam donationInfo', donationInfo);

    this.donationInfo = donationInfo;

    if (amountParam || frequencyParam) {
      this.donationFormHeader.mode = DonationFormHeaderMode.Summary;
    } else {
      this.donationFormHeader.mode = DonationFormHeaderMode.Edit;
    }
  }

  private renderPayPalButton(): void {
    this.paymentFlowHandlers?.paypalHandler?.renderPayPalButton(this.donationInfo);
    this.paypalButtonNeedsRender = false;
  }

  updated(changedProperties: PropertyValues): void {
    console.debug('updated: changedProperties', changedProperties);

    if (changedProperties.has('paymentFlowHandlers')) {
      console.debug('updated: paymentFlowHandlers', this.paymentFlowHandlers);
      if (this.paypalButtonNeedsRender) {
        this.renderPayPalButton();
      }
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo);
      this.setupHostedFields();
    }

    if (changedProperties.has('donationInfo')) {
      // The PayPal button has a standalone datasource since we don't initiate the payment
      // through code so it has to have the donation info ready when the user taps the button.
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo);
      this.donationFormHeader.donationInfo = this.donationInfo;
    }

    if (changedProperties.has('donationInfoValid')) {
      this.paymentSelector.donationInfoValid = this.donationInfoValid;
    }
  }

  private async setupHostedFields() {
    console.debug('setupHostedFields');
    const start = performance.now();
    const handler = await this.braintreeManager?.paymentProviders.getCreditCardHandler();
    await handler?.teardownHostedFields();
    const teardown = performance.now();
    console.debug('setupHostedFields, teardown took (ms)', teardown - start);
    await handler?.setupHostedFields();
    console.debug('setupHostedFields, setup took (ms)', performance.now() - teardown);
  }

  private donationInfoChanged(e: CustomEvent) {
    const donationInfo: DonationPaymentInfo = e.detail.donationInfo;
    console.debug('donationInfoChanged', this.donationInfo, donationInfo, this.donationInfo === donationInfo);

    this.donationInfo = new DonationPaymentInfo({
      amount: donationInfo.amount,
      donationType: donationInfo.donationType,
      coverFees: this.donationInfo.coverFees
    });

    this.donationInfoValid = true;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      h1 {
        margin: 0;
        padding: 0;
      }

      .hidden {
        display: none;
      }
    `;
  }
}
