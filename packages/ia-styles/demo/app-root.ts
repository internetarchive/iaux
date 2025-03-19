import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iaButtonStyles, iaSronlyStyles } from '../index';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = [
    iaButtonStyles,
    iaSronlyStyles,
    css`
      div {
        display: flex;
      }
      legend {
        font-size: 1.6rem;
      }
      button {
        margin: 0.5rem 0;
      }
    `,
  ];

  getButtonTemplate(): TemplateResult {
    return html`
      <legend>Button Template Demo</legend>
      <table class="initial">
        <tr>
          <td>
            <button class="ia-button dark">Dark Button</button>
            <button class="ia-button primary">Primary Button</button>
            <button class="ia-button danger">Danger Button</button>
            <button class="ia-button warning">Warning Button</button>
            <button class="ia-button" disabled>Disabled</button>
            <a href="#" class="ia-button primary"
              >I am a link but look like a button</a
            >
            <button class="ia-button link">Link Button</button>
          </td>
        </tr>
      </table>
    `;
  }

  getSrOnlyTemplate(): TemplateResult {
    return html`
      <legend>Screen Reader Only Text Demo</legend>
      <span>
        (There is some text that is only available for screen readers)
      </span>
      <p class="sr-only">This text is only available for screen readers</p>
    `;
  }

  render() {
    return html` <div>
      <fieldset>${this.getButtonTemplate()}</fieldset>
      <fieldset>${this.getSrOnlyTemplate()}</fieldset>
    </div>`;
  }
}
