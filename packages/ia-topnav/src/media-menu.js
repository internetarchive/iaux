import { LitElement, html } from 'https://offshoot.prod.archive.org/lit.js';

import './media-button.js';
import mediaMenuCSS from './styles/media-menu.js';
import formatUrl from './lib/formatUrl.js';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    href: 'https://web.archive.org',
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
    href: '/details/software',
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
      baseHost: { type: String },
      config: { type: Object },
      openMenu: { type: String },
      selectedMenuOption: { type: String },
      currentTab: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.openMenu = '';
    this.selectedMenuOption = '';
    this.currentTab = {};
  }

  updated(props) {
    if (props.has('currentTab')) {
      const mediaButtons = Array.from(this.shadowRoot.querySelectorAll('media-button'));

      mediaButtons.map((button, index) => {
        const linkItem = button.shadowRoot.querySelector('a.menu-item');
        if (linkItem) {
          if (linkItem.classList.contains(`${this.selectedMenuOption}`)) {
            linkItem.classList.remove('selected');
            linkItem.blur();

            const newFocusIndex = this.currentTab.moveTo === 'next' ? index + 1 : index - 1;
            mediaButtons[newFocusIndex].shadowRoot.querySelector('a.menu-item').focus();
          }
        }
      });
    }
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
          .href=${formatUrl(href, this.baseHost)}
          .followable=${followable}
          .label=${label}
          .mediatype=${menu}
          .openMenu=${this.openMenu}
          .selected=${selected}
          .selectedMenuOption=${this.selectedMenuOption}
          data-mediatype="${menu}"
        ></media-button>
      `;
    });
    return buttons;
  }

  get menuOpened() {
    return this.openMenu === 'media';
  }

  get menuClass() {
    return this.menuOpened ? 'open' : 'closed';
  }

  render() {
    return html`
      <div class="media-menu-container ${this.menuClass}">
        <div class="overflow-clip">
          <nav
            class="media-menu-inner"
            aria-expanded="${this.menuOpened}"
          >
            <div class="menu-group">
              ${this.mediaMenuOptionsTemplate}
            </div>
          </nav>
        </div>
      </div>
    `;
  }
}

customElements.define('media-menu', MediaMenu);
