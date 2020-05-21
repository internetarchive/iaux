import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('form-section')
export class FormSection extends LitElement {
  @property({ type: Number }) number = 0;

  @property({ type: String }) headline: string | undefined;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="col left">
          <div class="number">${this.number}</div>
        </div>
        <div class="col right">
          <div class="title">${this.headline}</div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    const numberSize = css`var(--formSectionNumberRadius, 15px)`;

    return css`
      .container {
        display: flex;
        background-color: lightblue;
      }

      .left {
        background-color: lightcoral;
      }

      .right {
        background-color: lightgreen;
      }

      .number {
        background-color: black;
        color: white;
        width: calc(${numberSize} * 2);
        height: calc(${numberSize} * 2);
        border-radius: ${numberSize};
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .title {
        line-height: calc(${numberSize} * 2);
      }
    `;
  }
}
