import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

import './form-section';
import './donation-summary';

@customElement('donation-form')
export class DonationForm extends LitElement {
  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <h1>Donation Form</h1>
      <donation-summary></donation-summary>
      <form-section
        number=1
        title="Choose a frequency"
      ></form-section>
      <form-section
        number=2
        title="Choose an amount"
      ></form-section>

    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      :host {
        text-align: center;
      }
    `;
  }
}
