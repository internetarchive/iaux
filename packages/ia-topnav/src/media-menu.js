import { LitElement, html } from 'lit-element';

import './media-button';
import mediaMenuCSS from './styles/media-menu';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    label: 'Wayback Machine',
    url: '/web/',
  },
  {
    icon: 'texts',
    menu: 'texts',
    label: 'Books',
    url: '/details/texts',
  },
  {
    icon: 'video',
    menu: 'video',
    label: 'Video',
    url: '/details/movies',
  },
  {
    icon: 'audio',
    menu: 'audio',
    label: 'Audio',
    url: '/details/audio',
  },
  {
    icon: 'software',
    menu: 'software',
    label: 'Software',
    url: '/details/sofware',
  },
  {
    icon: 'images',
    menu: 'images',
    label: 'Images',
    url: '/details/image',
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
    url: '/about/',
  },
];

class MediaMenu extends LitElement {
  static get styles() {
    return mediaMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaMenuAnimate = false;
    this.mediaMenuOpen = false;
    this.selectedMenuOption = '';
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(({
      icon,
      menu,
      label,
      href,
      url,
    }) => {
      const selected = this.selectedMenuOption === menu;
      return html`
        <media-button
          .config=${this.config}
          .icon=${icon}
          .href=${href}
          .url=${url}
          .label=${label}
          mediatype=${menu}
          .selected=${selected}
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

    return html`
      <nav
        class="media-menu tx-slide ${mediaMenuClass}"
        aria-hidden="${!this.mediaMenuOpen}"
        aria-expanded="${this.mediaMenuOpen}"
      >
        <div class="menu-group">
          ${this.mediaMenuOptionsTemplate}
        </div>
      </nav>
    `;
  }
}

customElements.define('media-menu', MediaMenu);
