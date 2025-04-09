import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/ia-topnav';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html` <ia-topnav> </ia-topnav> `;
  }

  static styles = css`
    :host {
      display: block;
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
