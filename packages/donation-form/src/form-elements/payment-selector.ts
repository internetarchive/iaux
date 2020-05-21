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

import { BraintreeManagerInterface } from '../braintree-manager/braintree-manager';
import { DonationPaymentInfo } from '../models/donation-info/donation-payment-info';
import { DonationFrequency } from '../models/donation-info/donation-frequency';
import { ModalManagerInterface } from '../modals/modal-manager';
import { PayPalFlowHandler } from './payment-flow-handlers/paypal-flow-handler';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: Object }) modalManager: ModalManagerInterface | undefined;

  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    frequency: DonationFrequency.OneTime,
    amount: 5,
    isUpsell: false
  });

  private paypalHandler?: PayPalFlowHandler;

  // @property({ type: Boolean }) private creditCardVisible = false;

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

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('braintreeManager') || changedProperties.has('modalManager')) {
      if (this.braintreeManager && this.modalManager) {
        this.paypalHandler = new PayPalFlowHandler(this.braintreeManager, this.modalManager);
        this.paypalHandler?.updateDonationInfo(this.donationInfo);
        this.paypalHandler?.renderPayPalButton();
      }
    }

    if (changedProperties.has('donationInfo')) {
      this.paypalHandler?.updateDonationInfo(this.donationInfo);
    }
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    this.dispatchEvent(new Event('applePaySelected'));
    // you must pass the event to start the ApplePay flow
    this.braintreeManager?.paymentProviders.applePayHandler?.createPaymentRequest(e);
  }

  private venmoSelected(): void {
    this.dispatchEvent(new Event('venmoSelected'));
  }

  private creditCardSelected(): void {
    this.dispatchEvent(new Event('creditCardSelected'));
    // this.creditCardVisible = !this.creditCardVisible;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
