/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */

import { LitElement, html, css, CSSResult, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement('search-results-switcher')
export default class SearchResultsSwitcher extends LitElement {
  @property({ type: Number }) numberOfResults = 7;

  @property({ type: Number }) currentResultIndex = 0;

  render(): TemplateResult {
    return html`
      <div class="container">
        <a @click=${this.goToPreviousResult}>&lt;</a>
        ${this.currentResultIndex + 1} / ${this.numberOfResults}
        <a @click=${this.goToNextResult}>&gt;</a>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        background-color: white;
      }

      a {
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
  }

  goToPreviousResult(): void {
    if (this.currentResultIndex === 0) {
      this.currentResultIndex = this.numberOfResults - 1;
    } else {
      this.currentResultIndex -= 1;
    }
    this.emitSearchResultIndexChangedEvent();
  }

  goToNextResult(): void {
    if (this.currentResultIndex === this.numberOfResults - 1) {
      this.currentResultIndex = 0;
    } else {
      this.currentResultIndex += 1;
    }
    this.emitSearchResultIndexChangedEvent();
  }

  emitSearchResultIndexChangedEvent(): void {
    const event = new CustomEvent('searchResultIndexChanged', {
      detail: { searchResultIndex: this.currentResultIndex },
    });
    this.dispatchEvent(event);
  }
}
