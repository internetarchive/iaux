import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
} from 'lit-element';

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
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
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
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
