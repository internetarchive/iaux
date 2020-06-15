import { LitElement, html, css } from 'lit-element';

import './media-slider';
import './media-button';

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
    icon: 'donate',
    menu: 'donate',
    href: '/donate/',
    label: 'Donate',
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
      .media-menu {
        position: absolute;
        z-index: -1;
        top: -400px;
        width: 100%;
        background-color: var(--grey13);
        margin: 0;
        overflow: hidden;
      }
      .media-menu.tx-slide {
        transition-property: top;
        transition-duration: 0.2s;
        transition-timing-function: ease;
      }
      .media-menu.tx-slide.open {
        top: 100%;
      }
      .media-menu.tx-slide.initial,
      .media-menu.tx-slide.closed {
        top: -400px;
      }
      .media-menu.tx-slide.closed {
        transition-duration: 0.2s;
      }
      .menu-group {
        position: relative;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = '';
  }

  updated(changedProperties) {
    const { mediaMenuOpen, mediaSliderOpen } = this;
    const menuClosed = changedProperties.has('mediaMenuOpen')
      && changedProperties.get('mediaMenuOpen')
      && !mediaMenuOpen;

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

  select(e) {
    const { mediatype } = e.detail;
    const currentSelection = this.selectedMenuOption;

    if (currentSelection === mediatype) {
      this.closeMediaSlider();
      return;
    }

    this.selectedMenuOption = mediatype;
    this.toggleMediaSlider();
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(({
      icon,
      menu,
      label,
      href,
    }) => {
      const selected = this.selectedMenuOption === menu;
      return html`
        <media-button
          .config=${this.config}
          .icon=${icon}
          .href=${href}
          .label=${label}
          mediatype=${menu}
          .selected=${selected}
          @selected=${this.select}
        ></media-button>
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
            .config=${this.config}
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
