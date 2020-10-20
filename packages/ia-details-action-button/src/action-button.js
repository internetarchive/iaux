import { html } from 'lit-element';
import TrackedElement from './tracked-element';
// import icons from './assets/img/icons';
import actionButtonCSS from './styles/action-button';

class ActionButton extends TrackedElement {
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

  get borrowDVDButton() {
    return html`
      <div class='topinblock borrow-dvd-btn'>
        <a href='/services/borrow/<?=$this->identifier?>'
          class='stealth'
          rel='nofollow'>
          <div id='tvborrow'>
            <?=glyph('disc')?> Borrow
            <span class='visible-xs hidden-sm visible-md visible-lg'>a DVD of this</span>
            <span class='visible-xs hidden-sm visible-md visible-lg'>show</span>
            <span class='hidden-xs visible-sm hidden-md hidden-lg'>DVD</span>
          </div>
        </a>
      </div>
    `;
  }

  get borrowProgramButton() {
    return html`
      <div class='topinblock borrow-program-btn'>
        <a href='/services/borrow/<?=$this->identifier?>'
          class='button'
          id='radio-borrow-button'
          rel='nofollow'>
          <div><?=glyph('email')?> Borrow Program</div>
        </a>
      </div>
    `;
  }

  get favoriteButton() {
    return html`
      <div class='topinblock favorite-btn'>
        <button
          class='button js-manage-toggle_list_status ${this.is_favorited} ? "favorited" : ""'
          type='button'
          data-href='${this.favorite_link}'
          data-target='#favorite-modal'
          data-id='${this.identifier}'
          data-fav-collection='fav-${this.collection_name}'
          data-toggle='tooltip'
          data-container='body'
          data-placement='bottom'
          data-original-title='${this.is_favorited ? "Unf" : "F"}avorite'
          aria-haspopup='true'>
          ${this.is_favorited ? 'favorite' : 'No_Favorite'}
        </button>
      </div>
    `;
  }

  
  get shareButton() {
    return html`
      <div class='topinblock share-button'>
        <button id='share-button'
          class='button'
          type='button'
          onclick='return AJS.modal_go(this, {ignore_lnk:1, shown:AJS.embed_codes_adjust})'
          data-target='#cher-modal'
          data-toggle='tooltip'
          data-container='body'
          data-placement='bottom'
          data-original-title='Share this item'
          aria-haspopup='true'>
          <?=glyph('share')?>
        </button>
      </div>
    `;
  }

  render() {
    return html`
      ${this.borrowDVDButton}
      ${this.borrowProgramButton}
      ${this.favoriteButton}
      ${this.shareButton}

      <div class="topinblock favorite-btn">
        <button class="button js-manage-toggle_list_status favorited" type="button" data-href="/bookmarks.php?add_bookmark=1&amp;mediatype=texts&amp;identifier=goody&amp;title=The+history+of+Little+Goody+Two-Shoes+%3A+otherwise+called+Mrs.+Margery+Two-Shoes+...+%5B1766+edition%5D" data-target="#favorite-modal" data-id="goody" data-fav-collection="fav-neeraj-archive" data-toggle="tooltip" data-container="body" data-placement="bottom" data-original-title="Unfavorite" aria-haspopup="true">
          <span class="iconochive-favorite" aria-hidden="true"></span><span class="sr-only">favorite</span>        </button>
      </div>
    `;
  }
}

customElements.define('action-button', ActionButton);
