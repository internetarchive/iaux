import { LitElement, html, css } from 'lit-element';

import './media-slider';
import './assets/img/media-menu-images';

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
      selected: { type: String },
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
      this.selected = '';
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
    const currentSelection = this.selected;

    if (currentSelection === mediatype) {
      this.closeMediaSlider();
      return;
    }

    this.selectedMenuOption = mediatype;
    this.toggleMediaSlider();
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
    return html`
      <nav
        class="media-menu tx-slide ${mediaMenuClass}"
        aria-hidden="${mediaMenuHidden}"
        aria-expanded="${mediaMenuExpanded}"
      >
        <div class="menu-group">
          ${buttons}
          <media-slider
            ?mediaSliderOpen="${this.mediaSliderOpen}"
            ?mediaSliderAnimate="${this.mediaSliderAnimate}"
          ></media-slider>
        </div>
      </nav>
    `;
  }

  static get styles() {
    return css`
      button:focus {
        outline-color: var(--link-color);
        outline-width: 0.1rem;
        outline-style: auto;
      }
      .media-menu {
        width: 100%;
        background-color: var(--black);
        margin: 0;
        overflow: hidden;
      }
      .media-menu.tx-slide {
        transition-property: max-height;
        transition-duration: 1s;
        transition-timing-function: ease;
      }
      .media-menu.tx-slide.open {
        max-height: 100vh;
      }
      .media-menu.tx-slide.initial,
      .media-menu.tx-slide.closed {
        max-height: 0;
      }
      .media-menu.tx-slide.closed {
        transition-duration: 0.1s;
      }
      .media-menu .menu-group {
        height: 80vh;
      }
      .media-menu .menu-item {
        width: 100%;
        background: transparent;
        font-size: inherit;
        cursor: pointer;
        height: 12%;
        border: none;
        text-align: left;
        padding: 0;
      }
      .media-menu .menu-item > .label {
        color: var(--grey999);
        text-align: left;
        display: inline;
      }
      .media-menu .menu-item > .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 8%;
      }
      .menu-item.selected .icon {
        background-color: var(--grey20);
        border-radius: 17% 0 0 17%;
      }
    `;
  }
}

customElements.define('media-menu', MediaMenu);
