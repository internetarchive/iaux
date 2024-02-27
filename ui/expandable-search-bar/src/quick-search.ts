/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css, CSSResult, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import QuickSearchEntry from './models/quick-search-entry';

/**
 * An element used to render a list of QuickSearchEntry entries
 *
 * @export
 * @class QuickSearch
 * @extends {LitElement}
 */
@customElement('quick-search')
export default class QuickSearch extends LitElement {
  @property({ type: Array }) quickSearches: QuickSearchEntry[] = [];

  /**
   * LitElement lifecycle render method
   *
   * @returns {TemplateResult}
   * @memberof QuickSearch
   */
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

  /**
   * Triggered when the user selects one of the quick search entries.
   * It emits a `searchTermSelected` event.
   *
   * @private
   * @param {Event} e
   * @returns {void}
   * @memberof QuickSearch
   */
  private doQuickSearch(e: Event): void {
    const { quickSearchIndex } = (e.target as HTMLElement).dataset;
    /* istanbul ignore if */
    if (!quickSearchIndex) {
      return;
    }

    const index = parseInt(quickSearchIndex, 10);
    const entry = this.quickSearches[index];
    const event = new CustomEvent('searchTermSelected', {
      detail: { searchEntry: entry },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * LitElement lifecycle styles method
   *
   * @readonly
   * @static
   * @type {CSSResult}
   * @memberof QuickSearch
   */
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
