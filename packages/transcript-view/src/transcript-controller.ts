import { LitElement, customElement, property, PropertyValues } from 'lit-element';
import TranscriptConfig from './models/transcript-config';
import TranscriptEntryConfig from './models/transcript-entry-config';

@customElement('transcript-controller')
export default class TranscriptController extends LitElement {
  @property({ type: TranscriptConfig }) config: TranscriptConfig | undefined;

  @property({ type: TranscriptEntryConfig }) activeEntry: TranscriptEntryConfig | undefined;

  @property({ type: Number }) currentTime = 0;

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentTime')) {
      this.handleCurrentTimeChange();
    }
  }

  handleCurrentTimeChange(): void {
    const entries = this.config ? this.config.entries : [];
    const activeEntry = entries.find(
      (entry: TranscriptEntryConfig) =>
        this.currentTime >= entry.startTime && this.currentTime <= entry.endTime,
    );

    if (!activeEntry) {
      return;
    }
    if (this.activeEntry && this.activeEntry.id === activeEntry.id) {
      return;
    }

    this.activeEntry = activeEntry;

    const event = new CustomEvent('transcriptEntryChanged', {
      detail: { entry: this.activeEntry },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
