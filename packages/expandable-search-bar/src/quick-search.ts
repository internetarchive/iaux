import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
} from 'lit-element';

import QuickSearchEntry from './models/quick-search-entry';

@customElement('quick-search')
export default class QuickSearch extends LitElement {
  @property({ type: Array }) quickSearches: QuickSearchEntry[] = [];

  render(): TemplateResult {
    return html`
      <ul>
        ${this.quickSearches.map(
          (quickSearch: QuickSearchEntry, index: number) => html`
            <li>
              <a @click=${this.doQuickSearch} data-quick-search-index=${index}>
                ${quickSearch.displayText}
              </a>
            </li>
          `,
        )}
      </ul>
    `;
  }

  private doQuickSearch(e: Event): void {
    const { quickSearchIndex } = (e.target as HTMLElement).dataset;
    if (quickSearchIndex) {
      const index = parseInt(quickSearchIndex, 10);
      const entry = this.quickSearches[index];
      const event = new CustomEvent('searchTermSelected', {
        detail: { searchEntry: entry },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  static get styles(): CSSResult {
    const quickSearchListPaddingCss = css`var(--quickSearchListPadding, 0 0 0.5em 0)`;
    const quickSearchListItemPaddingCss = css`var(--quickSearchListItemPadding, 0.5em 0 0 0)`;

    const quickSearchLinkColorCss = css`var(--quickSearchLinkColor, rgb(68, 132, 202))`;
    const quickSearchLinkDecorationCss = css`var(--quickSearchLinkDecoration, none)`;

    return css`
      ul {
        padding: ${quickSearchListPaddingCss};
        margin: 0;
        list-style: none;
      }

      ul li {
        padding: ${quickSearchListItemPaddingCss};
        margin: 0;
        display: block;
      }

      ul li a {
        color: ${quickSearchLinkColorCss};
        text-decoration: ${quickSearchLinkDecorationCss};
        cursor: pointer;
      }
    `;
  }
}
