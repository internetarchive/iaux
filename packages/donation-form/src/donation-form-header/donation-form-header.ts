import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

import './donation-summary';
import './edit-donation';

export enum DonationFormHeaderMode {
  Summary = 'summary',
  Edit = 'edit',
}

@customElement('donation-form-header')
export class DonationFormHeader extends LitElement {
  @property({ type: String }) mode: DonationFormHeaderMode = DonationFormHeaderMode.Summary;

  /** @inheritdoc */
  render(): TemplateResult {
    switch (this.mode) {
      case DonationFormHeaderMode.Summary:
        return this.donationSummaryTemplate;
      case DonationFormHeaderMode.Edit:
        return this.editDonationTemplate;
    }
  }

  get editDonationTemplate(): TemplateResult {
    return html`
      <edit-donation
        @donationAmountChanged=${this.amountChanged}
        @donationTypeChanged=${this.frequencyChanged}>
      </edit-donation>`;
  }

  get donationSummaryTemplate(): TemplateResult {
    return html`
      <donation-summary
        @editClicked=${this.summaryEditClicked}>
      </donation-summary>`;
  }

  private frequencyChanged(e: CustomEvent) {
    console.log('DonationFormHeader frequencyChanged', e.detail.frequency);
    const event = new CustomEvent('donationTypeChanged', { detail: { frequency: e.detail.frequency }});
    this.dispatchEvent(event);
  }

  private amountChanged(e: CustomEvent) {
    console.log('DonationFormHeader amountChanged', e.detail.amount);
    const event = new CustomEvent('donationAmountChanged', { detail: { amount: e.detail.amount }});
    this.dispatchEvent(event);
  }

  private summaryEditClicked() {
    this.mode = DonationFormHeaderMode.Edit;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
