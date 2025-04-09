import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';

import { defaultTopNavConfig } from './data/menus';
import formatUrl from './lib/formatUrl';
import './media-button';
import { MediaButton } from './media-button';
import { IATopNavConfig } from './models';
import mediaMenuCSS from './styles/media-menu';

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
    label: 'Texts',
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

@customElement('media-menu')
export class MediaMenu extends LitElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';
  @property({ type: String }) selectedMenuOption = '';
  @property({ type: Object }) currentTab: { moveTo: string } | undefined;

  @queryAll('media-button') mediaButtons?: MediaButton[];

  static get styles() {
    return mediaMenuCSS;
  }

  updated(props: PropertyValues) {
    if (props.has('currentTab')) {
      const mediaButtons = Array.from(this.mediaButtons ?? []);

      mediaButtons.map((button, index) => {
        const linkItem = button.shadowRoot?.querySelector('a.menu-item');
        if (linkItem) {
          if (linkItem.classList.contains(`${this.selectedMenuOption}`)) {
            linkItem.classList.remove('selected');
            (linkItem as HTMLElement).blur();

            const newFocusIndex =
              this.currentTab?.moveTo === 'next' ? index + 1 : index - 1;
            (
              mediaButtons[newFocusIndex]?.shadowRoot?.querySelector(
                'a.menu-item',
              ) as HTMLElement
            ).focus();
          }
        }
      });
    }
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(
      ({ icon, menu, label, href, followable }) => {
        const selected = this.selectedMenuOption === menu;
        return html`
          <media-button
            .config=${this.config}
            .icon=${icon}
            .href=${formatUrl(href as string & Location, this.baseHost)}
            ?followable=${followable}
            .label=${label}
            .mediatype=${menu}
            .openMenu=${this.openMenu}
            .selected=${selected}
            .selectedMenuOption=${this.selectedMenuOption}
            data-mediatype="${menu}"
          ></media-button>
        `;
      },
    );
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
          <nav class="media-menu-inner" aria-expanded="${this.menuOpened}">
            <div class="menu-group">${this.mediaMenuOptionsTemplate}</div>
          </nav>
        </div>
      </div>
    `;
  }
}
