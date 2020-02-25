import { LitElement, html, css } from 'lit-element';

import './media-slider';
import icons from './assets/img/static_icons';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    label: 'Wayback Machine',
  },
  {
    icon: 'texts',
    menu: 'texts',
    label: 'Texts',
  },
  {
    icon: 'video',
    menu: 'video',
    label: 'Video',
  },
  {
    icon: 'audio',
    menu: 'audio',
    label: 'Audio',
  },
  {
    icon: 'software',
    menu: 'software',
    label: 'Software',
  },
  {
    icon: 'images',
    menu: 'images',
    label: 'Images',
  },
  {
    icon: 'ellipses',
    menu: 'more',
    label: 'More',
  },
];

class MediaMenu extends LitElement {
  static get styles() {
    return css`
      button:focus {
        outline-color: var(--link-color);
        outline-width: 0.16rem;
        outline-style: auto;
      }
      .media-menu {
        width: 100%;
        background-color: var(--grey13);
        margin: 0;
        overflow: hidden;
      }
      .media-menu.tx-slide {
        transition-property: max-height;
        transition-duration: 0.2s;
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
        transition-duration: 0.2s;
      }
      .menu-group {
        position: relative;
        height: 80vh;
      }
      .menu-item {
        width: 100%;
        background: transparent;
        font-size: 1.6rem;
        cursor: pointer;
        border: none;
        text-align: left;
        padding: 0.1rem 0;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      .menu-item:focus {
        outline: none;
      }
      .menu-item > .label {
        display: inline-block;
        color: var(--white);
        text-align: left;
        vertical-align: middle;
      }
      .menu-item > .icon {
        display: inline-flex;
        width: 42px;
        height: 42px;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
      }
      .menu-item.selected .icon {
        background-color: var(--grey20);
        border-radius: 1rem 0 0 1rem;
      }
      .icon .fill-color {
        fill: #999;
      }
      .icon.active .fill-color {
        fill: #fff;
      }
    `;
  }

  static get properties() {
    return {
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  static get icons() {
    return icons;
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
    const buttons = menuSelection.map(({ icon, menu, label }) => {
      const selected = this.selectedMenuOption === menu ? 'selected' : '';
      return html`
        <button class="menu-item ${selected}" @click="${this.select.bind(this, menu)}">
          <span class="icon${selected ? ' active' : ''}">
            ${MediaMenu.icons[icon]}
          </span>
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
            .selectedMenuOption=${this.selectedMenuOption}
            ?mediaSliderOpen="${this.mediaSliderOpen}"
            ?mediaSliderAnimate="${this.mediaSliderAnimate}"
          ></media-slider>
        </div>
      </nav>
    `;
  }
}

customElements.define('media-menu', MediaMenu);
