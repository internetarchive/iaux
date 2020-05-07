import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

import '../form-section';
import '../static-custom-button';
import { DonationFrequency } from '../models/donation-frequency';

@customElement('edit-donation')
export class EditDonation extends LitElement {
  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <form-section
        number=1
        headline="Choose a frequency">

        <static-custom-button
          .value=${DonationFrequency.OneTime}
          displayText='One-Time'
          @selected=${this.frequencyChanged}>
        </static-custom-button>

        <static-custom-button
          .value=${DonationFrequency.Monthly}
          displayText='Monthly'
          @selected=${this.frequencyChanged}>
        </static-custom-button>
      </form-section>

      <form-section
        number=2
        headline="Choose an amount">

        ${[5, 10, 25, 50, 100, 250, 500, 1000].map(value => html`
          <static-custom-button
            value=${value}
            displayText='$${value}'
            @selected=${this.amountChanged}>
          </static-custom-button>
        `)}

      </form-section>
    `;
  }

  private frequencyChanged(e: CustomEvent) {
    console.log('EditDonation frequencyChanged', e.detail.value);
    const event = new CustomEvent('donationFrequencyChanged', { detail: { frequency: e.detail.value }});
    this.dispatchEvent(event);
  }

  private amountChanged(e: CustomEvent) {
    console.log('EditDonation amountChanged', e.detail.value);
    const event = new CustomEvent('donationAmountChanged', { detail: { amount: e.detail.value }});
    this.dispatchEvent(event);
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
