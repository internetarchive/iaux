import { LitElement, html } from 'lit-element';

import './media-button';
import mediaMenuCSS from './styles/media-menu';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    href: '/web/',
    label: 'Wayback Machine',
  },
  {
    icon: 'texts',
    menu: 'texts',
    href: '/details/texts',
    label: 'Books',
  },
  {
    icon: 'video',
    menu: 'video',
    href: '/details/movies',
    label: 'Video',
  },
  {
    icon: 'audio',
    menu: 'audio',
    href: '/details/audio',
    label: 'Audio',
  },
  {
    icon: 'software',
    menu: 'software',
    href: '/details/sofware',
    label: 'Software',
  },
  {
    icon: 'images',
    menu: 'images',
    href: '/details/image',
    label: 'Images',
  },
  {
    icon: 'donate',
    menu: 'donate',
    href: '/donate/',
    label: 'Donate',
    followable: true,
  },
  {
    icon: 'ellipses',
    menu: 'more',
    href: '/about/',
    label: 'More',
  },
];

class MediaMenu extends LitElement {
  static get styles() {
    return mediaMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaMenuOpen = false;
    this.selectedMenuOption = '';
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(({
      icon,
      menu,
      label,
      href,
      followable,
    }) => {
      const selected = this.selectedMenuOption === menu;
      return html`
        <media-button
          .config=${this.config}
          .icon=${icon}
          .href=${href}
          .followable=${followable}
          .label=${label}
          .mediatype=${menu}
          .selected=${selected}
          data-mediatype="${menu}"
        ></media-button>
      `;
    });
    return buttons;
  }

  render() {
    const mediaMenuClass = this.mediaMenuOpen ? 'open' : 'closed';

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
