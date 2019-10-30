import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
} from 'lit-element';

import magnifyingGlassIcon from './assets/img/magnifying-glass';
import disclosureTriangleIcon from './assets/img/disclosure';
import clearResultsIcon from './assets/img/clear-results';

import QuickSearchEntry from './models/quick-search-entry';

import './quick-search';

@customElement('expandable-search-bar')
export default class ExpandableSearchBar extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  @property({ type: Boolean }) showsDisclosure = false;

  @property({ type: String }) searchTerm = '';

  @property({ type: Array }) quickSearches: QuickSearchEntry[] = [];

  render(): TemplateResult {
    return html`
      <div
        class="
          container
          ${this.isOpen ? 'is-open' : ''}
          ${this.showsDisclosure ? 'shows-disclosure' : ''}"
      >
        <div class="search-bar ${this.searchTerm === '' ? '' : 'is-searching'}">
          <div class="magnifier-container endcap">
            ${magnifyingGlassIcon}
          </div>
          <input
            type="text"
            class="search-input"
            placeholder="Search"
            value=${this.searchTerm}
            @keyup=${this.inputChanged}
          />
          <div class="clear-search-container endcap">
            <button @click=${this.clearSearch}>
              ${clearResultsIcon}
            </button>
          </div>
          <div class="disclosure-container endcap">
            <button @click=${this.toggleDisclosure}>
              ${disclosureTriangleIcon}
            </button>
          </div>
        </div>
        <div class="quick-search">
          <quick-search
            .quickSearches=${this.quickSearches}
            @searchTermSelected=${this.quickSearchSelected}
          >
          </quick-search>
        </div>
      </div>
    `;
  }

  private clearSearch(): void {
    this.searchTerm = '';
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
    this.emitSearchClearedEvent();
  }

  private inputChanged(e: KeyboardEvent): void {
    if (this.searchInput) {
      this.searchTerm = this.searchInput.value;
    }
    this.emitInputChangeEvent();
    if (e.key === 'Enter') {
      this.emitEnterKeyPressedEvent();
    }
  }

  private emitInputChangeEvent(): void {
    const event = new CustomEvent('inputchange', {
      detail: { value: this.searchTerm },
    });
    this.dispatchEvent(event);
  }

  private emitEnterKeyPressedEvent(): void {
    const event = new CustomEvent('enterKeyPressed', {
      detail: { value: this.searchTerm },
    });
    this.dispatchEvent(event);
  }

  private emitSearchClearedEvent(): void {
    const event = new Event('searchCleared');
    this.dispatchEvent(event);
  }

  private quickSearchSelected(e: CustomEvent): void {
    const event = new CustomEvent('quickSearchSelected', {
      detail: { quickSearchEntry: e.detail.searchEntry },
    });
    this.dispatchEvent(event);
    this.isOpen = false;
  }

  private toggleDisclosure(): void {
    this.isOpen = !this.isOpen;
  }

  private get searchInput(): HTMLInputElement | null {
    return this.shadowRoot && (this.shadowRoot.querySelector('.search-input') as HTMLInputElement);
  }

  static get styles(): CSSResult {
    const expandableSearchBarBackgroundColorCss = css`var(--expandableSearchBarBackgroundColor, black)`;
    const expandableSearchBarTextColorCss = css`var(--expandableSearchBarTextColor, white)`;
    const expandableSearchBarFontSizeCss = css`var(--expandableSearchBarFontSize, 1em)`;
    const expandableSearchBarBorderCss = css`var(--expandableSearchBarBorderColor, 1px solid white)`;

    return css`
      .container {
        position: relative;
      }

      .search-bar {
        display: flex;
        justify-content: flex-start;
      }
      .endcap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2em;
        border: ${expandableSearchBarBorderCss};
        padding: 0 0.5em;
      }
      .endcap svg {
        height: 1.5em;
      }

      .clear-search-container {
        border-left: 0;
        border-radius: 0 1em 1em 0;
      }

      .search-bar.is-searching .clear-search-container {
        padding: 0 0.5em 0 0;
      }

      .search-bar.is-searching .clear-search-container button {
        display: block;
      }

      .clear-search-container button {
        display: none;
      }

      .magnifier-container {
        border-radius: 1em 0 0 1em;
        border-right: 0;
      }
      .container.is-open.shows-disclosure .clear-search-container {
        border-radius: 1em 0 0 0;
      }
      .disclosure-container {
        border-radius: 0 1em 1em 0;
        display: none;
      }
      .container.shows-disclosure .disclosure-container {
        display: flex;
      }
      .container.is-open .disclosure-container {
        border-radius: 0 1em 0 0;
      }
      .disclosure-container button {
        border: 0;
        background: none;
      }

      .search-input {
        height: 2em;
        border-top: ${expandableSearchBarBorderCss};
        border-bottom: ${expandableSearchBarBorderCss};
        border-left: 0;
        border-right: 0;
        background-color: ${expandableSearchBarBackgroundColorCss};
        color: ${expandableSearchBarTextColorCss};
        padding: 0;
        margin: 0;
        font-size: ${expandableSearchBarFontSizeCss};
        flex: 1 1 auto;
        min-width: 5em;
      }

      .search-input:focus {
        outline: none;
      }

      .quick-search {
        color: white;
        border-radius: 0 0 1em 1em;
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        background-color: black;
        z-index: 1;
        max-height: 150px;
        overflow-y: scroll;
        scrollbar-width: none;
        padding: 0 0.5em;
      }

      .quick-search::-webkit-scrollbar {
        display: none;
      }

      .container.is-open.shows-disclosure .quick-search {
        border: 1px solid white;
        border-top: 0;
        display: block;
      }

      button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
      }
    `;
  }
}
