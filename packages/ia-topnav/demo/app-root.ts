import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '../src/ia-topnav';
import type TopNav from '../src/ia-topnav';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('ia-topnav')
  private topnav!: TopNav;

  render() {
    return html`
      <ia-topnav> </ia-topnav>

      ${this.devTools}
    `;
  }

  private get devTools(): TemplateResult {
    return html`
      <div id="dev-tools">
        <h1>Dev Tools</h1>

        <h2>Username</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.screenName = 'brewster';
              this.topnav.username = '@brewster';
            }}
          >
            Switch username to brewster
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.screenName = 'a😊b😊c😊d😊e😊f😊g😊h😊i😊';
              this.topnav.username = '@test';
            }}
          >
            Switch username to a😊b😊c😊d😊e😊f😊g😊h😊i😊
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.screenName =
                'الدكتور محمالدكتور محمد العجوز محمالدكتور محمد العجوز';
              this.topnav.username = '@test';
            }}
          >
            Switch username to محمالدكتور محمد العجوز الدكتور محمالدكتور محمد
            العجوز
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.username = '';
              this.topnav.screenName = '';
            }}
          >
            Switch to logged out
          </button>
        </fieldset>

        <h2>Local Links</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.localLinks = false;
            }}
          >
            Disable local links
          </button>
          <button
            @click=${() => {
              this.topnav.localLinks = true;
            }}
          >
            Enable local links
          </button>
        </fieldset>

        <h2>Wayback Count</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.waybackPagesArchived = 'many, MAAAANNNY';
            }}
          >
            Change WB pages count
          </button>

          <button
            @click=${() => {
              this.topnav.waybackPagesArchived = '740 billion';
            }}
          >
            Reset WB pages count
          </button>
        </fieldset>

        <h2>Search</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.hideSearch = true;
            }}
          >
            Hide Top Row Search button, like on mobile
          </button>
          <button
            @click=${() => {
              this.topnav.hideSearch = false;
            }}
          >
            Show Top Row Search button, like on mobile
          </button>
        </fieldset>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    #dev-tools {
      margin: 1rem;
    }
  `;
}
