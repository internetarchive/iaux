import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconWeb extends Icon {
  render() {
    return html`
      <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg"><path d="m0 17.5185405v-8.16081077-9.35772973h24v9.35772973 8.16081077zm14.2702703-15.88637834h-12.43243246v2.61145946h12.43243246zm7.7837838 14.03659464v-7.07270275-1.84978378h-20.21621626v1.84978378 7.07270275zm-3.7837838-14.03659464h-2.7027027v2.61145946h2.7027027zm4 0h-2.7027027v2.61145946h2.7027027z" fill="${this.fill}" fill-rule="evenodd" transform="translate(8 11)"/></svg>
    `
  };
}

customElements.define('icon-web', IconWeb);
