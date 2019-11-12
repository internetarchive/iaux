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

import leftImage from './assets/img/left';
import rightImage from './assets/img/right';

/**
 * A widget to switch between search results that looks like this:
 * < 3 / 7 >
 *
 * @export
 * @class SearchResultsSwitcher
 * @extends {LitElement}
 */
@customElement('search-results-switcher')
export default class SearchResultsSwitcher extends LitElement {
  @property({ type: Number }) numberOfResults = 0;

  @property({ type: Number }) currentResultIndex = 0;

  /**
   * LitElement life cycle render method. Entrypoint for rendering the element.
   *
   * @returns {TemplateResult}
   * @memberof SearchResultsSwitcher
   */
  render(): TemplateResult {
    return html`
      <div class="container">
        <button @click=${this.goToPreviousResult} id="previous-button">
          ${leftImage}
        </button>
        <span class="results-range">
          <span id="current-result">${this.currentResultIndex + 1}</span> /
          <span id="number-of-results">${this.numberOfResults}</span>
        </span>
        <button @click=${this.goToNextResult} id="next-button">
          ${rightImage}
        </button>
      </div>
    `;
  }

  /**
   * LitElement life cycle CSS for this element
   *
   * @readonly
   * @static
   * @type {CSSResult}
   * @memberof SearchResultsSwitcher
   */
  static get styles(): CSSResult {
    return css`
      .container {
        text-align: center;
      }

      button {
        background: none;
        border: 0;
        cursor: pointer;
      }
    `;
  }

  /**
   * LitElement lifecycle updated method
   *
   * @param {PropertyValues} changedProperties
   * @memberof SearchResultsSwitcher
   */
  updated(changedProperties: PropertyValues): void {
    // reset the index if we change the number of results
    if (changedProperties.has('numberOfResults')) {
      this.currentResultIndex = 0;
    }
  }

  /**
   * Called when user clicks on the previous result button.
   * Loops around to the last result when we reach the first.
   *
   * @memberof SearchResultsSwitcher
   */
  goToPreviousResult(): void {
    if (this.currentResultIndex < 1) {
      this.currentResultIndex = this.numberOfResults - 1;
    } else {
      this.currentResultIndex -= 1;
    }
    this.emitSearchResultIndexChangedEvent();
  }

  /**
   * Called when user clicks on the next result button.
   * Loops around to the first result when we reach the last.
   *
   * @memberof SearchResultsSwitcher
   */
  goToNextResult(): void {
    if (this.currentResultIndex === this.numberOfResults - 1) {
      this.currentResultIndex = 0;
    } else {
      this.currentResultIndex += 1;
    }
    this.emitSearchResultIndexChangedEvent();
  }

  /**
   * Emit an searchResultIndexChanged event that the index has been changed
   *
   * ie: `e.detail.searchResultIndex = 2`
   *
   * @memberof SearchResultsSwitcher
   */
  emitSearchResultIndexChangedEvent(): void {
    const event = new CustomEvent('searchResultIndexChanged', {
      detail: { searchResultIndex: this.currentResultIndex },
    });
    this.dispatchEvent(event);
  }
}
