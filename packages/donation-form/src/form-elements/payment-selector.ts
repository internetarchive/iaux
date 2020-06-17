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

import applePayButtonImage from '../assets/img/payment-providers/applepay';
import googlePayButtonImage from '../assets/img/payment-providers/googlepay';
import paypalButtonImage from '../assets/img/payment-providers/paypal';
import venmoButtonImage from '../assets/img/payment-providers/venmo';
import { PaymentProvidersInterface } from '../braintree-manager/payment-providers';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Boolean }) donationInfoValid = true;

  @property({ type: Object }) paymentProviders?: PaymentProvidersInterface;

  @property({ type: Boolean }) private applePayVisible = false;

  @property({ type: Boolean }) private googlePayVisible = false;

  @property({ type: Boolean }) private venmoVisible = false;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="payment-container ${this.donationInfoValid ? 'donation-info-valid' : 'donation-info-invalid'}">

        <div
          class="applepay provider-button ${this.applePayVisible ? '' : 'hidden'}"
          @click=${this.applePaySelected}>${applePayButtonImage}</div>

        <div
          class="googlepay provider-button ${this.googlePayVisible ? '' : 'hidden'}"
          @click=${this.googlePaySelected}>${googlePayButtonImage}</div>

        <div
          class="venmo provider-button ${this.venmoVisible ? '' : 'hidden'}"
          @click=${this.venmoSelected}>${venmoButtonImage}</div>

        <div class="paypal-container">
          <div class="provider-button paypal-local-button" @click=${this.localPaypalButtonClicked}>
            ${paypalButtonImage}
          </div>
          <slot name="paypal-button"></slot>
        </div>

        <button
          @click=${this.creditCardSelected}
          class="button-style credit-card-button">Credit Card</button>
      </div>
    `;
  }

  /** inheritdoc */
  firstUpdated(): void {
    this.dispatchEvent(new Event('firstUpdated'));
  }

  updated(changed: PropertyValues) {
    console.debug('updated', changed);
    if (changed.has('paymentProviders')) {
      this.setButtonVisibility();
    }
  }

  private async setButtonVisibility(): Promise<void> {
    console.debug('setButtonVisibility')

    this.paymentProviders?.getVenmoHandler().then(handler => {
      console.debug('getVenmo inside')
      handler?.isBrowserSupported().then(value => {
        console.debug('venmo: isBrowserSupporter', value);
        this.venmoVisible = value;
      });
    });

    this.paymentProviders?.getApplePayHandler().then(handler => {
      console.debug('getApplePayHandler inside')
      handler?.isAvailable().then(value => {
        console.debug('applePay: isAvailable', value);
        this.applePayVisible = value;
      });
    });

    this.paymentProviders?.getGooglePayHandler().then(handler => {
      handler.isBrowserSupported().then(value => {
        console.debug('googlePay: isAvailable', value);
        this.googlePayVisible = value;
      });
    });
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    const event = new CustomEvent('applePaySelected', { detail: { originalEvent: e }})
    this.dispatchEvent(event);
  }

  private venmoSelected(): void {
    this.dispatchEvent(new Event('venmoSelected'));
  }

  private creditCardSelected(): void {
    this.dispatchEvent(new Event('creditCardSelected'));
  }

  private localPaypalButtonClicked(): void {
    this.dispatchEvent(new Event('paypalBlockerSelected'));
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    const paymentButtonWidthCss = css`var(--paymentButtonWidth, 50px)`;

    return css`
      .hidden {
        display: none;
      }

      .payment-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 10px;
        row-gap: 5px;
      }

      .provider-button {
        cursor: pointer;
        width: ${paymentButtonWidthCss};
      }

      .paypal-local-button {
        position: absolute;
      }

      .donation-info-valid .paypal-local-button {
        z-index: 0;
      }

      .donation-info-invalid .paypal-local-button {
        z-index: 250;
      }

      .credit-card-button {
        grid-column-start: 1;
        grid-column-end: 5;
      }
    `;
  }
}
