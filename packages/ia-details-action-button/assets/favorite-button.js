import { html } from 'lit-element';
import TrackedElement from './tracked-element';
// import icons from './assets/img/icons';
import searchIcon from './styles/icons/icon-question-mark';

import actionButtonCSS from './styles/action-button';
import venmoButtonImage from '@internetarchive/icon-venmo';

class favoriteButton extends TrackedElement {
  static get styles() {
    return actionButtonCSS;
  }

  static get properties() {
    return {
      identifier: { type: String },
      collectionName: { type: String },
      isFavorited: { type: String },
      favoriteLink: { type: String },
    };
  }

  async toggleButton(e) {
    const favoriteButton = this.shadowRoot.querySelector('.favorite-button');

    if (favoriteButton.classList.contains('favorited')) {
      favoriteButton.textContent = 'Favorite';
    } else {
      favoriteButton.textContent = 'Unfavorite';
    }

    favoriteButton.classList.toggle("favorited");
  }

  constructor() {
    super();
    this.identifier = '';
    this.collectionName = '';
    this.isFavorited = '';
    this.favoriteLink = '';
  }

  render() {
    console.log(searchIcon)
    return html`
      <div class="grid-item">
      <button
        @click=${this.toggleButton}
        class='topinblock favorite-button button grid-item js-manage-toggle_list_status ${this.isFavorited} ? "favorited" : ""'
        type='button'
        data-href='${this.favoriteLink}'
        data-target='#favorite-modal'
        data-id='${this.identifier}'
        data-fav-collection='fav-${this.collectionName}'
        data-toggle='tooltip'
        data-container='body'
        data-placement='bottom'
        data-original-title='${this.isFavorited ? "Unf" : "F"}avorite'
        aria-haspopup='true'>
          ${searchIcon} ${this.isFavorited ? 'Favorite' : 'No_Favorite'}
      </button>
      </div>
    `;
  }
}

customElements.define('favorite-button', favoriteButton);
