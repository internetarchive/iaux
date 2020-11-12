import { html, LitElement } from 'lit-element';
import TrackedElement from './tracked-element'
import shareIcon from '../assets/icons/icon-share';
import shareButtonCSS from '../assets/styles/css-share-button';

class ShareButton extends LitElement {
  static get styles() {
    return shareButtonCSS;
  }

  static get properties() {
    return {
      identifier: { type: String },
    };
  }

  constructor() {
    super();
    this.identifier = '';
  }

  render() {
    return html`
      <div class='grid-item'>
        <button id='share-button'
          class='button share-button grid-item'
          type='button'
          data-target='#cher-modal'>
          ${shareIcon} <span>Share</span>
        </button>
      </div>
    `;
  }
}

customElements.define('share-button', ShareButton);
