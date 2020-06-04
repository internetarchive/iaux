import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  query,
  PropertyValues,
} from 'lit-element';

@customElement('upsell-modal-content')
export class UpsellModalContent extends LitElement {
  @property({ type: Boolean }) showYesButton = true;

  @property({ type: Number }) amount = 5;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="monthly-amount">
        <h3>Enter your monthly amount</h3>
        $ <input type="text" value=${this.amount} @input=${this.amountChanged}>
      </div>
      <slot>
      </slot>

      ${this.yesButton}

      <button @click=${this.noThanksSelected}>
        No, thanks. Maybe next year.
      </button>
    `;
  }

  private get yesButton(): TemplateResult {
    if (!this.showYesButton) {
      return html``;
    } else {
      return html`
        <button @click=${this.yesSelected}>
          YES, I'll become a monthly donor
        </button>
      `;
    }
  }

  private amountChanged(e: Event) {
    const amount = (e.target as HTMLFormElement).value;
    console.debug('amountChanged', e, amount);
    this.amount = parseFloat(amount);
    const event = new CustomEvent('amountChanged', { detail: { amount: this.amount }});
    this.dispatchEvent(event);
  }

  private yesSelected() {
    const event = new CustomEvent('yesSelected', { detail: { amount: this.amount }});
    this.dispatchEvent(event);
  }

  private noThanksSelected() {
    this.dispatchEvent(new Event('noThanksSelected'));
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      h1 {
        margin: 0;
        padding: 0;
      }
    `;
  }
}
