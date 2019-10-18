import {
  LitElement,
  html,
  css,
  customElement,
  property,
  PropertyValues,
  TemplateResult,
  CSSResult,
} from 'lit-element';

@customElement('section-marker')
export default class SectionMarker extends LitElement {

  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="left-arrow arrow"></div>
        <div class="center-divider"></div>
        <div class="right-arrow arrow"></div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        position: relative;
      }

      div {
        position: absolute;
      }

      .center-divider {
        border-left: 1px solid white;
        width: 1px;
        height: 50px;
        left: 50%;
      }

      .arrow {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
      }

      .left-arrow {
        background-color: blue;
      }

      .right-arrow {
        background-color: green;
        left: 50%;
      }
    `;
  }
}
