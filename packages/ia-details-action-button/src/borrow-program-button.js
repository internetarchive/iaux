import { html } from 'lit-element';
import TrackedElement from './tracked-element';
// import icons from './assets/img/icons';
import searchIcon from './styles/icons/icon-question-mark';
import actionButtonCSS from './styles/action-button';
import emailImg from '@internetarchive/icon-email';


class BorrowProgramButton extends TrackedElement {
  static get styles() {
    return actionButtonCSS;
  }

  static get properties() {
    return {
      identifier: { type: String },
      borrowButton: { type: String },
    };
  }

  constructor() {
    super();
    this.identifier = '';
    this.borrowButton = '';
  }

  render() {
    if (this.borrowButton === 'none') return;
    return html`
      <div class="grid-item">
      <a
        class='topinblock button borrow-program-button'
        href='/services/borrow/${this.identifier}'
        class='stealth'
        rel='nofollow'>
        ${searchIcon} <span>Borrow Program</span>
      </a>
      </div>
    `;
  }
}

customElements.define('borrow-program-button', BorrowProgramButton);
