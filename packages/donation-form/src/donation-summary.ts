import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

import { DonationFrequency } from './models/donation-frequency';

@customElement('donation-summary')
export class DonationForm extends LitElement {
  @property({ type: Number }) amount = 50;

  @property({ type: String }) frequency: DonationFrequency = DonationFrequency.OneTime;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>Edit this amount</button>
    `;
  }

  get displayTitle(): string {
    const monthlyString = this.frequency === DonationFrequency.Monthly ? 'Monthly' : '';
    return `$${this.amount} ${monthlyString} Donation`;
  }

  private editClicked() {
    console.log('editClicked');
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
