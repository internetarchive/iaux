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
      <div class="dev-tools">
        <h1>Dev Tools</h1>

        <h2>Username</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.screenName = 'brewster';
              this.topnav.username = '@brewster';
            }}
          >
            switch username to brewster
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.screenName = 'a😊b😊c😊d😊e😊f😊g😊h😊i😊';
              this.topnav.username = '@test';
            }}
          >
            switch username to a😊b😊c😊d😊e😊f😊g😊h😊i😊
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.screenName =
                'الدكتور محمالدكتور محمد العجوز محمالدكتور محمد العجوز';
              this.topnav.username = '@test';
            }}
          >
            switch username to محمالدكتور محمد العجوز الدكتور محمالدكتور محمد
            العجوز
          </button>

          <br />

          <button
            @click=${() => {
              this.topnav.username = '';
              this.topnav.screenName = '';
            }}
          >
            switch to un - logged -in
          </button>
        </fieldset>
        <hr />
        <h2>Local Links</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.localLinks = false;
            }}
          >
            switch localLinks false(change to https://archive.org)
          </button>
          < br />
          <button
            @click=${() => {
              this.topnav.localLinks = true;
            }}
          >
            switch to localLinks(default, change links to start with /)
          </button>
        </fieldset>

        <hr />
        <h2>Wayback Count</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.waybackPagesArchived = 'many, MAAAANNNY';
            }}
          >
            change WB pages count
          </button>

          <button
            @click=${() => {
              this.topnav.waybackPagesArchived = '740 billion';
            }}
          >
            reset WB pages count
          </button>
        </fieldset>
        <hr />
        <h2>Search</h2>
        <fieldset>
          <button
            @click=${() => {
              this.topnav.hideSearch = true;
            }}
          >
            HIDE Top Row Search button, like on mobile
          </button>
          <button
            @click=${() => {
              this.topnav.hideSearch = false;
            }}
          >
            SHOW Top Row Search button, like on mobile
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
  `;
}

// <center>
//   <h1>demo </h1>

//   < button
// onclick = "document.querySelector('ia-topnav').setAttribute('screenname', 'brewster'); document.querySelector('ia-topnav').setAttribute('username', '@brewster')" >
//     switch username to brewster
//   </button>
//   < br />
//   <button
//     onclick="document.querySelector('ia-topnav').setAttribute('screenname', 'a😊b😊c😊d😊e😊f😊g😊h😊i😊'); document.querySelector('ia-topnav').setAttribute('username', '@test')" >
//     switch username to a😊b😊c😊d😊e😊f😊g😊h😊i😊
// </button>
//   < br />
//   <button
//     onclick="document.querySelector('ia-topnav').setAttribute('screenname', 'الدكتور محمالدكتور محمد العجوز محمالدكتور محمد العجوز'); document.querySelector('ia-topnav').setAttribute('username', '@test')" >
//     switch username to محمالدكتور محمد العجوز الدكتور محمالدكتور محمد العجوز
//   </button>
//   < br />
//   <br />
//   < button onclick = "document.querySelector('ia-topnav').removeAttribute('username')" >
//     switch to un - logged -in
//   </button>

//   < hr />

//   <button onclick="document.querySelector('ia-topnav').setAttribute('localLinks', false)" >
//     switch localLinks false(change to https://archive.org)
//     </button>
//     < br />
//     <button onclick="document.querySelector('ia-topnav').removeAttribute('localLinks')" >
//     switch to localLinks(default, change links to start with /)
// </button>

//   < hr />
//   <button onclick="document.querySelector('ia-topnav').setAttribute('waybackPagesArchived', 'many, MAAAANNNY')" >
//     change WB pages count
//       </button>

//       < hr />
//       <button onclick="document.querySelector('ia-topnav').setAttribute('hideSearch', true)" >
//         HIDE Top Row Search button, like on mobile
//           </button>
//           < button onclick = "document.querySelector('ia-topnav').removeAttribute('hideSearch')" >
//             SHOW Top Row Search button, like on mobile
//               </button>
//               </center>
