import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
class TopnavElement extends LitElement {
  render() {
    return html`
     <p>Is gonna be built here!</p>
   `;
  }
}

customElements.define('topnav-element', TopnavElement);
