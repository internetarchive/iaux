import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '../src/ia-topnav';
import type TopNav from '../src/ia-topnav';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('ia-topnav')
  private topnav!: TopNav;

  @state() private admin = false;

  @state() private canManageFlags = false;

  @state() private username = '';

  @state() private screenName = '';

  @state() private itemIdentifier = '';

  render() {
    return html`
      <ia-topnav
        ?admin=${this.admin}
        ?canManageFlags=${this.canManageFlags}
        .username=${this.username}
        .screenName=${this.screenName}
        .itemIdentifier=${this.itemIdentifier}
      >
      </ia-topnav>

      ${this.devTools}
    `;
  }

  private get devTools(): TemplateResult {
    return html`
      <div id="dev-tools">
        <h1>Dev Tools</h1>

        <h2>User menu</h2>
        <fieldset>
          <ul>
            <li>
              <button
                @click=${() => {
      this.screenName = 'brewster';
      this.username = '@brewster';
    }}
              >
                Switch username to brewster
              </button>
            </li>

            <li>
              <button
                @click=${() => {
      this.screenName = 'a😊b😊c😊d😊e😊f😊g😊h😊i😊';
      this.username = '@test';
    }}
              >
                Switch username to a😊b😊c😊d😊e😊f😊g😊h😊i😊
              </button>
            </li>

            <li>
              <button
                @click=${() => {
        this.screenName =
          'الدكتور محمالدكتور محمد العجوز محمالدكتور محمد العجوز';
        this.username = '@test';
      }}
              >
                Switch username to محمالدكتور محمد العجوز الدكتور محمالدكتور
                محمد العجوز
              </button>
            </li>

            <li>
              <button
                @click=${() => {
      this.username = '';
      this.screenName = '';
    }}
              >
                Switch to logged out
              </button>
            </li>

            <li>
              <button
                @click=${() => {
        this.itemIdentifier = this.admin ? '' : 'boop';
        this.admin = !this.admin;
      }}
              >
                Toggle admin mode (${this.admin ? 'on' : 'off'}) (requires
                logged in)
              </button>
            </li>

            <li>
              <button
                @click=${() => {
      this.canManageFlags = !this.canManageFlags;
    }}
              >
                Toggle manage flags mode (${this.canManageFlags ? 'on' : 'off'})
                (requires admin mode)
              </button>
            </li>
          </ul>
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
