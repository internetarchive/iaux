import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import searchIcon from '../assets/icons/icon-question-mark';
import actionButtonCSS from '../assets/styles/action-button';

class FlagButton extends TrackedElement {
  static get styles() {
    return actionButtonCSS;
  }

  static get properties() {
    return {
      flagConfig: { type: Object },
    };
  }

  constructor() {
    super();
    this.flagConfig = null;
  }

  openMenu() {
    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle("hidden");
  }

  render() {
    // console.log(this.flagConfig.types)
    return html`
      <div id="flag-button-container" class="grid-item">
        <button id='flag-button'
          class='button flag-button grid-item'
          @click="${this.openMenu}"
          type='button'
          data-target='#cher-modal'
          data-toggle='tooltip'
          data-container='body'
          data-placement='bottom'
          data-original-title='Flag this item'
          aria-haspopup='true'>
          ${searchIcon} <span>Flag</span>
        </button>

        <div id="flag-popover" class="dropdown-menu hidden" aria-labelledby="flag-button">
          <h3 class="dropdown-title">Flag this item for</h3>
          <ul role="menu open">
            <li class="">
                <a href="?flag_set=violence&amp;rand=1058657979" role="menuitem">Graphic Violence</a>
            </li>
            <li class="">
                <a href="?flag_set=porn&amp;rand=2118345163" role="menuitem">Graphic Sexual Content</a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('flag-button', FlagButton);
