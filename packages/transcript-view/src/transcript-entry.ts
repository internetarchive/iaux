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
  @property({ type: Object }) entry: TranscriptEntryConfig | undefined = undefined;

  @property({ type: Boolean }) isActive = false;

  @property({ type: Boolean }) isSelected = false;

  @property({ type: Boolean }) isClickable = false;

  render(): TemplateResult {
    return html`
      <span
        class="
          ${this.activeClass}
          ${this.selectedClass}
          ${this.searchResultClass}
          ${this.isMusicEntryClass}
          ${this.isClickableClass}"
        @click=${this.userSelected}
      >
        ${this.entry ? this.entry.displayText : ''}
      </span>
    `;
  }

  private userSelected(): void {
    if (!this.isClickable) {
      return;
    }
    const event = new CustomEvent('userSelected', {
      detail: { entry: this.entry },
    });
    this.dispatchEvent(event);
  }

  private get isSearchResultMatch(): boolean {
    return this.entry ? this.entry.searchMatchIndex !== undefined : false;
  }

  private get activeClass(): string {
    return this.isActive ? 'active' : '';
  }

  private get selectedClass(): string {
    return this.isSelected ? 'selected' : '';
  }

  private get isMusicEntryClass(): string {
    return this.entry && this.entry.isMusic === true ? 'is-music' : '';
  }

  private get isClickableClass(): string {
    return this.isClickable === true ? 'is-clickable' : '';
  }

  private get searchResultClass(): string {
    return this.entry && this.entry.searchMatchIndex !== undefined ? 'search-result' : '';
  }

  static get styles(): CSSResult {
    const normalTextColor = css`var(--normalTextColor, gray)`;
    const activeTextColor = css`var(--activeTextColor, white)`;

    const musicTextColor = css`var(--musicTextColor, initial)`;

    const searchResultInactiveBorderColor = css`var(--searchResultInactiveBorderColor, gray)`;
    const searchResultActiveBorderColor = css`var(--searchResultActiveBorderColor, green)`;

    return css`
      :host {
        color: ${normalTextColor};
      }

      .active {
        color: ${activeTextColor};
      }

      .is-music {
        display: block;
        color: ${musicTextColor};
        font-style: italic;
      }

      .is-music.active {
        color: ${activeTextColor};
      }

      .is-clickable {
        cursor: pointer;
      }

      .search-result {
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
        border: 2px solid ${searchResultInactiveBorderColor};
        border-radius: 5px;
      }

      .search-result.selected:after {
        border: 2px solid ${searchResultActiveBorderColor};
      }
    `;
  }
}
