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

import { DonationFrequency } from '../models/donation-info/donation-frequency';
import { DonationPaymentInfo } from '../models/donation-info/donation-payment-info';

@customElement('donation-summary')
export class DonationSummary extends LitElement {
  @property({ type: Object }) donationInfo: DonationPaymentInfo = new DonationPaymentInfo(
    DonationFrequency.OneTime, 5);

  // @property({ type: String }) frequency: DonationType = DonationType.OneTime;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>Edit this amount</button>
    `;
  }

  get displayTitle(): string {
    const monthlyString = this.donationInfo.type === DonationFrequency.Monthly ? 'Monthly' : '';
    return `$${this.donationInfo.amount} ${monthlyString} Donation`;
  }

  private editClicked() {
    this.dispatchEvent(new Event('editClicked'));
  }

  updated(changed: PropertyValues) {
    console.log(changed);
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
