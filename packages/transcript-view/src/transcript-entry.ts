import {
  LitElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
} from 'lit-element';
import TranscriptEntryConfig from './models/transcript-entry-config';

@customElement('transcript-entry')
export default class TranscriptEntry extends LitElement {
  @property({ type: TranscriptEntryConfig }) entry: TranscriptEntryConfig | undefined = undefined;

  @property({ type: Boolean }) isActive = false;

  @property({ type: Boolean }) isSelected = false;

  render(): TemplateResult {
    return html`
      <span
        class="${this.activeClass} ${this.selectedClass} ${this.searchResultClass}"
        @click=${this.userSelected}
      >
        ${this.entry ? this.entry.text : ''}
      </span>
    `;
  }

  userSelected(): void {
    // we only want to allow clicks on search matches
    if (!this.isSearchResultMatch) {
      return;
    }
    const event = new CustomEvent('userSelected', {
      detail: { entry: this.entry },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  get isSearchResultMatch(): boolean {
    return this.entry ? this.entry.searchMatchIndex !== undefined : false;
  }

  get activeClass(): string {
    return this.isActive ? 'active' : '';
  }

  get selectedClass(): string {
    return this.isSelected ? 'selected' : '';
  }

  get searchResultClass(): string {
    return this.entry && this.entry.searchMatchIndex !== undefined ? 'search-result' : '';
  }

  static get styles(): CSSResult {
    return css`
      :host {
        color: gray;
      }

      .active {
        color: white;
      }

      .search-result {
        cursor: pointer;
        display: inline-block; /* without this, the outline adds an extra space to the right of the text */
        padding: 0 5px;
        position: relative;
      }

      .search-result:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 2px solid gray;
        border-radius: 5px;
      }

      .search-result.selected:after {
        border: 2px solid green;
      }
    `;
  }
}
