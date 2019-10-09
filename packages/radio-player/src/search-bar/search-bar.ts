import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues,
} from 'lit-element';

import MagnifyingGlass from './assets/img/magnifying-glass';
import DisclosureTriangle from './assets/img/disclosure';
import ClearResultsIcon from './assets/img/clear-results';

@customElement('search-bar')
export default class SearchBar extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  @property({ type: Boolean }) showsDisclosure = false;

  @property({ type: String }) searchTerm = '';

  @property({ type: Array }) quickSearches: string[] = [];

  render(): TemplateResult {
    return html`
      <div
        class="
          container
          ${this.isOpen ? 'is-open' : ''}
          ${this.showsDisclosure ? 'shows-disclosure' : ''}"
      >
        <div class="search-bar">
          <div class="magnifier-container endcap">
            ${MagnifyingGlass}
          </div>
          <input
            type="text"
            class="search-input"
            placeholder="Search"
            value=${this.searchTerm}
            @keyup=${this.inputChanged}
          />
          <div
            class="clear-search-container endcap ${this.searchTerm === '' ? '' : 'is-searching'}"
          >
            <button @click=${this.clearSearch}>
              ${ClearResultsIcon}
            </button>
          </div>
          <div class="disclosure-container endcap">
            <button @click=${this.toggleDisclosure}>
              ${DisclosureTriangle}
            </button>
          </div>
        </div>
        <div class="quick-search">
          <quick-search
            .quickSearches=${this.quickSearches}
            @searchTermSelected=${this.doQuickSearch}
          >
          </quick-search>
        </div>
      </div>
    `;
  }

  private clearSearch(): void {
    this.searchTerm = '';
    this.emitSearchClearedEvent();
  }

  private inputChanged(e: KeyboardEvent): void {
    this.emitInputChangeEvent();
    if (e.key === 'Enter') {
      this.emitEnterKeyPressedEvent();
    }
  }

  private emitInputChangeEvent(): void {
    const value = this.searchInput && this.searchInput.value;
    const event = new CustomEvent('inputchange', {
      detail: { value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private emitEnterKeyPressedEvent(): void {
    const value = this.searchInput && this.searchInput.value;
    const event = new CustomEvent('enterKeyPressed', {
      detail: { value: value || '' },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private emitSearchClearedEvent(): void {
    const event = new Event('searchCleared');
    this.dispatchEvent(event);
  }

  private doQuickSearch(e: CustomEvent): void {
    this.searchTerm = e.detail.searchTerm;
    this.isOpen = false;
  }

  private toggleDisclosure(): void {
    this.isOpen = !this.isOpen;
  }

  private get searchInput(): HTMLInputElement | null {
    return this.shadowRoot && (this.shadowRoot.querySelector('.search-input') as HTMLInputElement);
  }

  private updateSearchChange(): void {
    if (!this.searchInput) {
      return;
    }
    this.searchInput.value = this.searchTerm;
    this.emitInputChangeEvent();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('searchTerm')) {
      // for some reason, the input will not update automatically if the user has interacted with it
      // so this just sets it manually
      this.updateSearchChange();
    }
  }

  static get styles(): CSSResult {
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
        border: 1px solid white;
        padding: 0 0.5em;
      }
      .endcap svg {
        height: 1.5em;
      }

      .clear-search-container {
        border-left: 0;
        border-radius: 0 1em 1em 0;
      }

      .clear-search-container.is-searching {
        padding: 0 0.5em 0 0;
      }

      .clear-search-container button {
        display: none;
      }

      .clear-search-container.is-searching button {
        display: block;
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
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        border-left: 0;
        border-right: 0;
        background-color: black;
        color: white;
        padding: 5px 0;
        margin: 0;
        flex: 1 1 auto;
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
