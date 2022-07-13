import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import TranscriptEntryConfig from './models/transcript-entry-config';

@customElement('transcript-entry')
export default class TranscriptEntry extends LitElement {
  @property({ type: Object }) entry: TranscriptEntryConfig | undefined = undefined;

  @property({ type: Boolean, reflect: true }) isActive = false;

  @property({ type: Boolean, reflect: true }) isSelected = false;

  @property({ type: Boolean, reflect: true }) isClickable = false;

  @property({ type: Boolean, reflect: true }) isSearchResult = false;

  @property({ type: Boolean, reflect: true }) isMusicEntry = false;

  render(): TemplateResult {
    return html`
      ${this.entry ? this.entry.displayText : ''}
    `;
  }
}
