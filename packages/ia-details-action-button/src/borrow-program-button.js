import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import searchIcon from '../assets/icons/icon-question-mark';
import actionButtonCSS from '../assets/styles/action-button';

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
