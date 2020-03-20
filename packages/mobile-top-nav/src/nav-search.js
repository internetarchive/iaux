import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';

class NavSearch extends TrackedElement {
  static get styles() {
    return css`
      input:focus {
        outline: none;
      }
      button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
      }
      button:focus {
        outline: none;
      }
      .search {
        padding-top: 0;
        margin-right: .5rem;
      }
      .search search-image {
        position: relative;
        top: -5px;
        right: -3px;
      }
      .search-activated {
        display: flex;
        position: absolute;
        top: 0;
        right: 5rem;
        bottom: 0;
        left: 5rem;
        z-index: 3;
        padding: 0.5rem 0.2rem;
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      .search-inactive {
        display: none;
      }
      .search-activated .highlight,
      .search-activated .search {
        background: var(--white);
        border-radius: 0.5rem;
      }
      .search-activated .highlight {
        display: flex;
        width: 100%;
        margin: 0 .5rem;
      }
      .search-activated .search {
        height: 100%;
        padding: 0;
        margin-right: 0;
        align-self: center;
      }
      .search-activated .search-field {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 1rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1.6rem;
        text-align: center;
      }
      .search-activated .search-field:focus {
        outline: none;
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .fade-in {
        animation: fade-in .2s forwards;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.open = false;
  }

  search(e) {
    this.trackSubmit(e);
    this.dispatchEvent(new CustomEvent('navSearch', {
      detail: {
        originalEvent: e,
        formEl: this.shadowRoot.querySelector('form'),
      },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const searchMenuClass = this.open ? 'flex' : 'search-inactive';

    return html`<div class="search-activated fade-in ${searchMenuClass}">
      <form id="nav-search" class="highlight" action="https://${this.config.baseUrl}/search.php" method="get" @submit=${this.search} data-event-submit-tracking="${this.config.eventCategory}|NavSearchSubmit">
        <input
          type="text"
          name="query"
          class="search-field"
          placeholder="Search"
        />
        <input type='hidden' name='sin' value='' />
        <button type="submit" class="search" data-event-click-tracking="${this.config.eventCategory}|NavSearchClose">
          <search-image ?active=${this.open}></search-image>
        </button>
      </form>
    </div>`;
  }
}

customElements.define('nav-search', NavSearch);
