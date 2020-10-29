import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import favoriteIcon from '../assets/icons/icon-favorite';
import favoriteButtonCSS from '../assets/styles/css-favorite-button';

class FavoriteButton extends TrackedElement {
  static get styles() {
    return favoriteButtonCSS;
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
    const favoriteButtonText = this.shadowRoot.querySelector('.favorite-button span');

    if (favoriteButton.classList.contains('favorited')) {
      favoriteButtonText.textContent = 'Favorite';
    } else {
      favoriteButtonText.textContent = 'Unfavorite';
    }
    // favoriteButton.classList.toggle("favorited");
  }

  constructor() {
    super();
    // this.identifier = '';
    // this.collectionName = '';
    // this.isFavorited = '';
    // this.favoriteLink = '';
  }

  get isAlreadyFavorite() {
    if (this.isFavorited === 'true') {
      return true;
    }
    return false;
  }

  render() {
    return html`
      <div class="grid-item">
        <button
          @click=${this.toggleButton}
          class='topinblock favorite-button button grid-item js-manage-toggle_list_status ${this.isAlreadyFavorite ? 'favorited' : ''}'
          type='button'
          data-href='${this.favoriteLink}'
          data-target='#favorite-modal'
          data-id='${this.identifier}'
          data-fav-collection='fav-${this.collectionName}'
          data-toggle='tooltip'
          data-container='body'
          data-placement='bottom'
          data-original-title='${this.isAlreadyFavorite ? "Unf" : "F"}avorite'
          aria-haspopup='true'>
            ${favoriteIcon} <span>${this.isAlreadyFavorite ? 'Unfavorite' : 'Favorite'}</span>
        </button>
      </div>
    `;
  }
}

customElements.define('favorite-button', FavoriteButton);
