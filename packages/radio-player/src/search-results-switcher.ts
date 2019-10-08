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

@customElement('search-results-switcher')
export default class SearchResultsSwitcher extends LitElement {
  @property({ type: Number }) numberOfResults = 0;

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
        text-align: center;
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

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('numberOfResults')) {
      this.currentResultIndex = 0;
    }
  }

  goToPreviousResult(): void {
    if (this.currentResultIndex < 1) {
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
