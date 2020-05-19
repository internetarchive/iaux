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
import { DonationPaymentInfo } from './models/donation-info/donation-payment-info';
import { DonationFrequency } from './models/donation-info/donation-frequency';
import { PayPalButtonDataSourceInterface } from './braintree-manager/payment-providers/paypal/paypal-button-datasource';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    frequency: DonationFrequency.OneTime,
    amount: 5,
    isUpsell: false
  });

  @property({ type: Object }) private paypalDataSource: PayPalButtonDataSourceInterface | undefined;

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
      this.setupPayPal();
    }

    if (changedProperties.has('donationInfo')) {
      this.paypalDataSource?.updateDonationInfo(this.donationInfo);
    }
  }

  private async setupPayPal(): Promise<void> {
    this.paypalDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-button',
      style: {
        color: 'blue',
        label: 'paypal',
        size: 'small',
        tagline: false
      },
      donationInfo: this.donationInfo
    });
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
