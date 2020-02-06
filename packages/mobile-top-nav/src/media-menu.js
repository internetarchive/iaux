import { LitElement, html, css } from 'lit-element';

import './media-slider';
import './assets/img/media-menu-images';
import mediaMenuCss from './css/media-menu';

const menuSelection = [
  {
    icon: 'web',
    label: 'Wayback Machine',
  },
  {
    icon: 'texts',
    label: 'Texts',
  },
  {
    icon: 'video',
    label: 'Video',
  },
  {
    icon: 'audio',
    label: 'Audio',
  },
  {
    icon: 'software',
    label: 'Software',
  },
  {
    icon: 'images',
    label: 'Images',
  },
  {
    icon: 'more',
    label: 'More',
  },
];

class MediaMenu extends LitElement {
  static get properties() {
    return {
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = '';
  }

  updated(changedProperties) {
    const { mediaMenuOpen, mediaSliderOpen } = this;
    const menuClosed =
      changedProperties.has('mediaMenuOpen') &&
      changedProperties.get('mediaMenuOpen') &&
      !mediaMenuOpen;

    if (menuClosed && mediaSliderOpen) {
      this.mediaSliderOpen = false;
      this.mediaSliderAnimate = false;
      this.selectedMenuOption = '';
    }
  }

  closeMediaSlider() {
    this.mediaSliderAnimate = true;
    this.mediaSliderOpen = false;
    this.selectedMenuOption = '';
  }

  toggleMediaSlider() {
    if (!this.mediaSliderOpen) {
      this.mediaSliderAnimate = true;
      this.mediaSliderOpen = !this.mediaSliderOpen;
    }
  }

  select(mediatype) {
    const currentSelection = this.selectedMenuOption;

    if (currentSelection === mediatype) {
      this.closeMediaSlider();
      return;
    }

    this.selectedMenuOption = mediatype;
    this.toggleMediaSlider();
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(({ icon: mediatype, label }) => {
      const selected = this.selectedMenuOption === mediatype ? 'selected' : '';
      return html`
        <button class="menu-item ${selected}" @click="${this.select.bind(this, mediatype)}">
          <span class="icon"
            ><mediamenu-image
              type="${mediatype}"
              fill="${selected ? 'white' : ''}"
            ></mediamenu-image
          ></span>
          <span class="label">${label}</span>
        </button>
      `;
    });
    return buttons;
  }

  render() {
    let mediaMenuClass = 'initial';
    if (this.mediaMenuOpen) {
      mediaMenuClass = 'open';
    }
    if (!this.mediaMenuOpen && this.mediaMenuAnimate) {
      mediaMenuClass = 'closed';
    }
    const mediaMenuHidden = Boolean(!this.mediaMenuOpen).toString();
    const mediaMenuExpanded = Boolean(this.mediaMenuOpen).toString();

    return html`
      <nav
        class="media-menu tx-slide ${mediaMenuClass}"
        aria-hidden="${mediaMenuHidden}"
        aria-expanded="${mediaMenuExpanded}"
      >
        <div class="menu-group">
          ${this.mediaMenuOptionsTemplate}
          <media-slider
            ?mediaSliderOpen="${this.mediaSliderOpen}"
            ?mediaSliderAnimate="${this.mediaSliderAnimate}"
          ></media-slider>
        </div>
      </nav>
    `;
  }

  static get styles() {
    return mediaMenuCss();
  }
}

customElements.define('media-menu', MediaMenu);
