import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

import '../form-section';
import '../static-custom-button';
import { DonationType } from '../../models/donation-info/donation-type';
import { DonationPaymentInfo } from '../../models/donation-info/donation-payment-info';

@customElement('edit-donation')
export class EditDonation extends LitElement {
  @property({ type: Object }) donationInfo: DonationPaymentInfo = DonationPaymentInfo.default;

  render(): TemplateResult {
    return html`
      <form-section
        number=1
        headline="Choose a frequency">

        <static-custom-button
          .value=${DonationType.OneTime}
          displayText='One-Time'
          @selected=${this.frequencyChanged}>
        </static-custom-button>

        <static-custom-button
          .value=${DonationType.Monthly}
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
      <button @click=${this.showSummary}>Switch to Summary</button>
    `;
  }

  private showSummary() {
    this.dispatchEvent(new Event('showSummaryClicked'));
  }

  private frequencyChanged(e: CustomEvent) {
    this.donationInfo.donationType = e.detail.value as DonationType;
    console.log('EditDonation frequencyChanged', e.detail.value);
    this.dispatchDonationInfoChangedEvent();
  }

  private amountChanged(e: CustomEvent) {
    this.donationInfo.amount = e.detail.value;
    console.log('EditDonation amountChanged', e.detail.value);
    this.dispatchDonationInfoChangedEvent();
  }

  private dispatchDonationInfoChangedEvent() {
    const event = new CustomEvent('donationInfoChanged', { detail: { donationInfo: this.donationInfo }});
    this.dispatchEvent(event);
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}