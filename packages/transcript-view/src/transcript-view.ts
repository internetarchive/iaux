import {
  LitElement,
  html,
  css,
  customElement,
  property,
  PropertyValues,
  TemplateResult,
  CSSResult,
} from 'lit-element';
import './transcript-entry';
import './duration-formatter';
import TranscriptEntryConfig from './models/transcript-entry-config';

@customElement('transcript-view')
export default class TranscriptView extends LitElement {
  @property({ type: [TranscriptEntryConfig] }) entries: TranscriptEntryConfig[] = [];

  @property({ type: Number }) currentTime = 0;

  @property({ type: Number }) topContextHeight = 50;

  @property({ type: Number }) bottomContextHeight = 50;

  @property({ type: Number }) timeScrollTop = 0;

  @property({ type: Boolean, reflect: true }) autoScroll = true;

  @property({ type: Number }) selectedSearchResultIndex = 0;

  @property({ type: Number }) scrollResumeTimerId = -1;

  @property({ type: Boolean }) showContextZones = false;

  @property({ type: TranscriptEntryConfig }) private currentEntry:
    | TranscriptEntryConfig
    | undefined;

  scrollTimerDelay = 15000;

  render(): TemplateResult {
    return html`
      <div class="container">
        ${this.showContextZones ? this.contextZoneDevTemplates : ''}

        <div class="scroll-container" id="scroll-container" @wheel=${this.didScroll}>
          <div class="col time">
            ${this.timeDisplayTemplate}
          </div>

          <div class="col">
            ${this.autoScrollButtonTemplate}
            ${(this.entries ? this.entries : []).map((entry: TranscriptEntryConfig) =>
              this.transcriptEntryTemplate(entry),
            )}
          </div>
        </div>
      </div>
    `;
  }

  private get autoScrollButtonTemplate(): TemplateResult {
    return html`
      <button
        @click=${this.enableAutoScroll}
        class="auto-scroll-button"
        style="display: ${this.autoScroll ? 'none' : 'inline-block'}"
      >
        Scroll text with audio
      </button>
    `;
  }

  private get timeDisplayTemplate(): TemplateResult {
    return html`
      <div class="time-display" style="top: ${this.timeScrollTop}px; display: ${this.timeDisplay}">
        <duration-formatter .seconds=${this.currentEntryStartTime}> </duration-formatter>
      </div>
    `;
  }

  private transcriptEntryTemplate(entry: TranscriptEntryConfig): TemplateResult {
    const currentEntryId = this.currentEntry ? this.currentEntry.id : -1;
    const active = entry.id === currentEntryId;
    const selected = entry.searchMatchIndex === this.selectedSearchResultIndex;
    return html`
      <transcript-entry
        .entry=${entry}
        ?isSelected=${selected}
        ?isActive=${active}
        data-search-result-index=${entry.searchMatchIndex}
        @userSelected=${this.transcriptEntrySelected}
      >
      </transcript-entry>
    `;
  }

  private get contextZoneDevTemplates(): TemplateResult {
    return html`
      ${this.topContextZoneDevTemplate} ${this.bottomContextZoneDevTemplate}
    `;
  }

  private get topContextZoneDevTemplate(): TemplateResult {
    return html`
      <div class="top context-overlay" style="height: ${this.topContextHeight}px"></div>
    `;
  }

  private get bottomContextZoneDevTemplate(): TemplateResult {
    return html`
      <div class="bottom context-overlay" style="height: ${this.bottomContextHeight}px"></div>
    `;
  }

  get currentEntryStartTime(): number {
    return this.currentEntry ? this.currentEntry.start : 0;
  }

  static get styles(): CSSResult {
    const transcriptHeightCss = css`var(--transcriptHeight, 200px)`;

    return css`
      .container {
        position: relative;
      }

      .auto-scroll-button {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 8rem;
        bottom: 1rem;
        border-radius: 1rem;
        border: 0;
      }

      .context-overlay {
        position: absolute;
        left: 0;
        width: 100%;
        height: 0;
        z-index: -1;
        display: block;
      }

      .context-overlay.top {
        top: 0;
        border-bottom: 1px solid green;
      }

      .context-overlay.bottom {
        bottom: 0;
        border-top: 1px solid green;
      }

      .time {
        flex: 0 0 5rem;
        color: white;
        position: relative;
      }

      .time-display {
        position: absolute;
        top: 0;
      }

      .scroll-container {
        display: flex;
        overflow-y: auto;
        font-size: 16px;
        line-height: 24px;
        -ms-overflow-style: none;
        scrollbar-width: none;
        height: ${transcriptHeightCss};
      }

      .scroll-container::-webkit-scrollbar {
        display: none;
      }
    `;
  }

  private transcriptEntrySelected(e: CustomEvent): void {
    const { entry } = e.detail;
    const event = new CustomEvent('transcriptEntrySelected', {
      detail: { entry },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.selectedSearchResultIndex = entry.searchMatchIndex;
    this.autoScroll = false;
  }

  private handleCurrentTimeChange(): void {
    const entries = this.entries ? this.entries : [];
    const activeEntry = entries.find(
      // eslint-disable-next-line max-len
      (entry: TranscriptEntryConfig) =>
        this.currentTime >= entry.start && this.currentTime <= entry.end,
    );

    if (!activeEntry) {
      this.currentEntry = undefined;
      return;
    }

    if (this.currentEntry && this.currentEntry.id === activeEntry.id) {
      return;
    }

    this.currentEntry = activeEntry;
  }

  private didScroll(): void {
    this.autoScroll = false;
    window.clearTimeout(this.scrollResumeTimerId);
    this.scrollResumeTimerId = window.setTimeout(() => {
      this.autoScroll = true;
    }, this.scrollTimerDelay);
  }

  private enableAutoScroll(): void {
    this.autoScroll = true;
    this.scrollToActiveEntry();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentTime')) {
      this.handleCurrentTimeChange();
    }
    if (changedProperties.has('selectedSearchResultIndex')) {
      this.scrollToSelectedSearchResult();
    }
    if (changedProperties.has('currentEntry')) {
      this.scrollToActiveEntry();
      this.updateTimePosition();
    }
    if (changedProperties.has('autoScroll')) {
      this.handleAutoScrollChange();
    }
  }

  get scrollView(): HTMLElement | null {
    return this.shadowRoot && (this.shadowRoot.getElementById('scroll-container') as HTMLElement);
  }

  get activeTranscriptEntry(): HTMLElement | null {
    return (
      this.shadowRoot &&
      (this.shadowRoot.querySelector('transcript-entry[isActive]') as HTMLElement)
    );
  }

  get selectedSearchResult(): HTMLElement | null {
    const selectedResult =
      this.shadowRoot &&
      this.shadowRoot.querySelector(
        `transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`,
      );
    return selectedResult as HTMLElement;
  }

  get timeDisplay(): string {
    return this.activeTranscriptEntry ? 'block' : 'none';
  }

  private handleAutoScrollChange(): void {
    const autoScrollChangedEvent = new CustomEvent('autoScrollChanged', {
      detail: { autoScroll: this.autoScroll },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(autoScrollChangedEvent);
  }

  private scrollToActiveEntry(): void {
    if (!this.autoScroll) {
      return;
    }
    const { activeTranscriptEntry } = this;
    if (!activeTranscriptEntry) {
      return;
    }
    this.scrollToElement(activeTranscriptEntry);
  }

  private scrollToSelectedSearchResult(): void {
    const { selectedSearchResult } = this;
    if (!selectedSearchResult) {
      return;
    }
    this.autoScroll = false;
    this.scrollToElement(selectedSearchResult);
  }

  private scrollToElement(element: HTMLElement): void {
    const { scrollView } = this;
    if (!scrollView) {
      return;
    }

    const scrollContainerRect = scrollView.getBoundingClientRect();
    const activeEntryRect = element.getBoundingClientRect();
    const scrollContainerHeight = scrollContainerRect.height;
    const { topContextHeight } = this;
    const { bottomContextHeight } = this;
    const focusBottom = scrollContainerHeight - bottomContextHeight;

    // if the active entry is above the top context area or below the bottom of the focus area,
    // scroll it to the top of the focus area
    if (
      activeEntryRect.bottom > scrollContainerRect.top + focusBottom ||
      activeEntryRect.top < scrollContainerRect.top
    ) {
      // eslint-disable-next-line max-len
      const newTargetScrollPos =
        activeEntryRect.top - scrollContainerRect.top + scrollView.scrollTop - topContextHeight;
      this.scrollToOffsetWithDuration(newTargetScrollPos, 1);
    }
  }

  private updateTimePosition(): void {
    const activeEntry = this.activeTranscriptEntry;
    if (!activeEntry) {
      return;
    }

    const parentNode = activeEntry.parentNode as HTMLElement;
    const parentOffset = parentNode.getBoundingClientRect();
    const offset = activeEntry.getBoundingClientRect().top - parentOffset.top;

    this.timeScrollTop = offset;
  }

  private scrollToOffsetWithDuration(offset: number, duration: number, onDone?: () => void): void {
    const { scrollView } = this;
    if (!scrollView) {
      return;
    }

    const start = scrollView.scrollTop;
    const change = offset - start;
    const startTime = performance.now();
    let now;
    let elapsed;
    let t;

    function easeInOutQuad(time: number): number {
      return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    }

    function animateScroll(): void {
      if (!scrollView) {
        return;
      }

      now = performance.now();
      elapsed = (now - startTime) / 1000;
      t = elapsed / duration;

      scrollView.scrollTop = start + change * easeInOutQuad(t);

      if (t < 1) {
        window.requestAnimationFrame(animateScroll);
      } else if (onDone) {
        onDone();
      }
    }

    animateScroll();
  }
}
