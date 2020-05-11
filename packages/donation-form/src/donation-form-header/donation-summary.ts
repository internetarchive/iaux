import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

import { DonationType } from '../models/donation-info/donation-type';
import { DonationPaymentInfo } from '../models/donation-info/donation-payment-info';

@customElement('donation-summary')
export class DonationSummary extends LitElement {
  @property({ type: Object }) donationPaymentInfo: DonationPaymentInfo = new DonationPaymentInfo(
    DonationType.OneTime, 5);

  // @property({ type: String }) frequency: DonationType = DonationType.OneTime;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>Edit this amount</button>
    `;
  }

  get displayTitle(): string {
    const monthlyString = this.donationPaymentInfo.type === DonationType.Monthly ? 'Monthly' : '';
    return `$${this.donationPaymentInfo.amount} ${monthlyString} Donation`;
  }

  private editClicked() {
    this.dispatchEvent(new Event('editClicked'));
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-content: center;
      }

      button {
        border: 0;
        background: none;
        color: blue;
      }
    `;
  }
}
