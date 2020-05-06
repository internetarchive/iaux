import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('contact-form')
export class ContactForm extends LitElement {
  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="First name" />
      <input type="text" placeholder="Last name" />
    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
