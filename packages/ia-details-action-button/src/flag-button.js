import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import flagIcon from '../assets/icons/icon-question-mark';
import flagButtonCSS from '../assets/styles/css-flag-button';

class FlagButton extends TrackedElement {
  static get styles() {
    return flagButtonCSS;
  }

  static get properties() {
    return {
      flagConfig: { type: Object },
    };
  }

  constructor() {
    super();
    this.flagConfig = null;
    this.isFlagged = false;
  }

  openMenu() {
    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('hidden');
  }

  async toggleFlag(e) {
    const container = document.querySelector('ia-details-action-button').shadowRoot.querySelector('flag-button').shadowRoot.querySelector('#flag-button-container');
    e.preventDefault();

    const currentFlagElement = e.target.querySelector('a');
    const flagName = currentFlagElement.getAttribute('flag-name');

    const ajaxUrl = this.getAjaxURL(flagName, currentFlagElement);

    this.getAjaxRequest(ajaxUrl + `&no_chrome=1`);

    currentFlagElement.setAttribute('href', `${ajaxUrl}`);
    container.querySelector('.dropdown-menu').classList.toggle('hidden');
    container.classList.toggle('flagged');
    e.target.classList.toggle('flagged-text');
  }

  getAjaxURL(flagName, element) {
    let source = '';
    const random = Math.random();
    if (element.parentNode.classList.contains('flagged-text')) {
      source = `?flag_remove=${flagName}&rand=${random}`;
    } else {
      source = `?flag_set=${flagName}&rand=${random}`;
    }

    return source
  }

  async getAjaxRequest(ajaxUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ajaxUrl, true);
    xhr.responseType = 'json';
    xhr.send();
  }


  get isFlaggedItem() {
    return this.flagConfig.user.length != 0;
  }

  get getFlagList() {
    const userFlag = this.flagConfig.user;
    const list = this.flagConfig.types.map(link => (
      html`
        <li @click='${this.toggleFlag}'
          class='${userFlag.includes(link.key) ? 'flagged-text': ''}'>
            <a
              flag-name=${link.key}
              href='?${userFlag.includes(link.key) ? 'flag_remove=' : 'flag_set='}${link.key}&amp;rand=${Math.random()}'
              role='menuitem'>${link.value}
            </a>
        </li>`
    ));
    
    return list;
  }

  render() {
    return html`
      <div id='flag-button-container' class='${this.isFlaggedItem ? 'flagged': ''} grid-item'>
        <button id='flag-button'
          class='button flag-button grid-item'
          @click='${this.openMenu}'
          type='button'
          data-target='#cher-modal'
          data-toggle='tooltip'
          data-container='body'
          data-placement='bottom'
          data-original-title='Flag this item'
          aria-haspopup='true'>
          ${flagIcon} <span>Flag</span>
        </button>
        <div id='flag-popover' class='dropdown-menu hidden' aria-labelledby='flag-button'>
          <h3 class='dropdown-title'>Flag this item for</h3>
          <ul role='menu open'>
            ${this.getFlagList}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('flag-button', FlagButton);
