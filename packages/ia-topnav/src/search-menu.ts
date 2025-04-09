import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TrackedElement from './tracked-element';
import searchMenuCSS from './styles/search-menu';
import formatUrl from './lib/formatUrl';
import { IATopNavConfig } from './models';
import { makeBooleanString } from './lib/makeBooleanString';
import { defaultTopNavConfig } from './data/menus';

@customElement('search-menu')
export class SearchMenu extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: String }) openMenu = '';
  @property({ type: Boolean }) searchMenuOpen = false;
  @property({ type: Boolean }) searchMenuAnimate = false;
  @property({ type: String }) selectedSearchType = '';

  static get styles() {
    return searchMenuCSS;
  }

  firstUpdated() {
    this.shadowRoot?.addEventListener('keydown', (e) =>
      this.handleKeyDownEvent(e as KeyboardEvent),
    );
  }

  disconnectedCallback() {
    // Clean up event listener when the element is removed
    this.shadowRoot?.removeEventListener('keydown', (e) =>
      this.handleKeyDownEvent(e as KeyboardEvent),
    );
  }

  private handleKeyDownEvent(e: KeyboardEvent) {
    if (!this.shadowRoot) return;

    const searchTypes = this.shadowRoot.querySelectorAll(
      '.search-menu-inner label input[type=radio]',
    ) as NodeListOf<HTMLInputElement>;

    const length = searchTypes.length - 1;
    if (!length) return;

    const searchTypeHandler = (index: number) => {
      e.preventDefault();
      const searchType = searchTypes[index];
      searchType.checked = true;
      searchType.dispatchEvent(new Event('change'));
      searchType.focus();
    };

    if (e.key === 'Home') {
      searchTypeHandler(0);
    } else if (e.key === 'End') {
      searchTypeHandler(length);
    }
  }

  selectSearchType(e: Event) {
    const target = e.target as HTMLInputElement;
    this.selectedSearchType = target.value;
  }

  searchInChanged(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('searchInChanged', {
        detail: {
          searchIn: target.value,
        },
      }),
    );
  }

  get searchTypesTemplate() {
    const searchTypes = [
      {
        label: 'metadata',
        value: '',
        isDefault: true,
      },
      {
        label: 'text contents',
        value: 'TXT',
      },
      {
        label: 'TV news captions',
        value: 'TV',
      },
      {
        label: 'radio transcripts',
        value: 'RADIO',
      },
      {
        label: 'archived web sites',
        value: 'WEB',
      },
    ].map(({ value, label, isDefault }) => {
      if (
        this.config.hiddenSearchOptions &&
        this.config.hiddenSearchOptions.includes(value)
      ) {
        return html``;
      }
      return html`
        <label @click="${this.selectSearchType}">
          <input
            form="nav-search"
            type="radio"
            name="sin"
            value="${value}"
            ?checked=${isDefault}
            @change=${this.searchInChanged}
          />
          Search ${label}
        </label>
      `;
    });

    return searchTypes;
  }

  get menuClass() {
    return this.openMenu === 'search' ? 'open' : 'closed';
  }

  render() {
    if (this.hideSearch) {
      return html``;
    }

    return html`
      <div class="menu-wrapper">
        <div
          class="search-menu-inner tx-slide ${this.menuClass}"
          aria-hidden="${makeBooleanString(!this.openMenu)}"
          aria-expanded="${makeBooleanString(this.searchMenuOpen)}"
        >
          ${this.searchTypesTemplate}
          <a
            class="advanced-search"
            href="${formatUrl('/advancedsearch.php', this.baseHost)}"
            @click=${this.trackClick}
            data-event-click-tracking="${this.config
              .eventCategory}|NavAdvancedSearch"
            >Advanced Search</a
          >
        </div>
      </div>
    `;
  }
}
