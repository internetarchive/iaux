import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('static-custom-button')
export class StaticCustomButton extends LitElement {
  @property({ type: String }) value = '';

  @property({ type: String }) displayText = '';

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <button @click=${this.clicked}>${this.displayText}</button>
    `;
  }

  private clicked() {
    const event = new CustomEvent('selected', { detail: { value: this.value }});
    this.dispatchEvent(event);
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
