import { nothing, html } from 'lit';

import TrackedElement from './tracked-element';
import navSearchCSS from './styles/nav-search';
import icons from './assets/img/icons';
import formatUrl from './lib/format-url';
import { customElement, property, query } from 'lit/decorators.js';
import { defaultTopNavConfig } from './data/menus';
import { IATopNavConfig } from './models';
import { iaSronlyStyles } from '@internetarchive/ia-styles';

@customElement('nav-search')
export class NavSearch extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @property({ type: Object }) locationHandler = (url: string) => {};
  @property({ type: Boolean }) open = false;
  @property({ type: String }) openMenu = '';
  @property({ type: String }) searchIn = '';
  @property({ type: String }) searchQuery = '';

  @query('[name=query]') private queryInput?: HTMLInputElement;

  static get styles() {
    return [navSearchCSS, iaSronlyStyles];
  }

  search(e: CustomEvent) {
    const query = this.queryInput?.value;

    if (!query) {
      e.preventDefault();
      return false;
    }

    // TV search points to a detail page with a q param instead
    if (this.searchIn === 'TV') {
      this.locationHandler(
        formatUrl(`/details/tv?q=${query}` as string & Location, this.baseHost),
      );
      e.preventDefault();
      return false;
    }

    this.trackSubmit(e);
    return true;
  }

  toggleSearchMenu() {
    if (this.openMenu === 'search') {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'search',
        },
        composed: true,
        bubbles: true,
      }),
    );
  }

  get searchInsideInput() {
    return this.searchIn
      ? html`<input type="hidden" name="sin" value="${this.searchIn}" />`
      : nothing;
  }

  get searchEndpoint() {
    return '/search';
  }

  render() {
    const searchMenuClass = this.open ? 'flex' : 'search-inactive';

    return html`
      <div class="search-activated fade-in ${searchMenuClass}">
        <form
          id="nav-search"
          class="highlight"
          .action=${formatUrl(
            this.searchEndpoint as string & Location,
            this.baseHost,
          )}
          method="get"
          @submit=${this.search}
          data-event-submit-tracking="${this.config
            ?.eventCategory}|NavSearchSubmit"
        >
          <label for="query" class="sr-only">Search the Archive</label>
          <input
            type="text"
            name="query"
            class="search-field"
            placeholder="Search"
            autocomplete="off"
            value=${this.searchQuery || ''}
            @focus=${this.toggleSearchMenu}
          />
          ${this.searchInsideInput}
          <button
            type="submit"
            class="search"
            tabindex="-1"
            data-event-click-tracking="${this.config
              ?.eventCategory}|NavSearchClose"
          >
            ${icons.search}
          </button>
        </form>
      </div>
    `;
  }
}
