import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/ia-wayback-search';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <ia-wayback-search
        .queryHandler=${{
          performQuery: (query: string) =>
            (window.location.href = `https://web.archive.org/web/*/${query}`),
        }}
        @waybackSearchSubmitted=${(e: CustomEvent) =>
          console.log(`waybackSearchSubmitted: ${e.detail.query}`)}
        @waybackMachineStatsLinkClicked=${() =>
          console.log('waybackMachineStatsLinkClicked event')}
        @waybackMachineLogoLink=${() =>
          console.log('waybackMachineLogoLink event')}
      >
      </ia-wayback-search>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
