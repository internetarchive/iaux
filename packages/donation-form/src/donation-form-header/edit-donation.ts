import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

import '../form-section';

@customElement('edit-donation')
export class EditDonation extends LitElement {
  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <form-section
        number=1
        headline="Choose a frequency">
        <button>One-Time</button><button>Monthly</button>
      </form-section>

      <form-section
        number=2
        headline="Choose an amount">
        <button>$5</button><button>$10</button>
      </form-section>
    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
