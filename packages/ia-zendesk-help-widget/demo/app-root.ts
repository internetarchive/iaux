import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/ia-zendesk-help-widget';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <ia-zendesk-help-widget
        .widgetKey=${'6fe87bd8-d4e3-4b42-8632-be6eb933d54d'}
      >
      </ia-zendesk-help-widget>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
