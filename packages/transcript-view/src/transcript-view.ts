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
import TranscriptConfig from './models/transcript-config';

@customElement('transcript-view')
export default class TranscriptView extends LitElement {
  @property({ type: TranscriptConfig }) config: TranscriptConfig | undefined = undefined;

  @property({ type: Number }) currentTime = 0;

  @property({ type: Number }) topContextHeight = 50;

  @property({ type: Number }) bottomContextHeight = 50;

  @property({ type: Boolean }) autoScroll = true;

  @property({ type: Number }) selectedSearchResultIndex = 0;

  @property({ type: Boolean }) showContextZones = false;

  @property({ type: Number }) private timeScrollTop = 0;

  @property({ type: TranscriptEntryConfig }) private currentEntry:
    | TranscriptEntryConfig
    | undefined;

  private scrollTimerDelay: number = 15000;

  private scrollResumeTimerId: number = -1;

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
            ${(this.transcriptEntries).map((entry: TranscriptEntryConfig) =>
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
        class="auto-scroll-button ${this.autoScroll ? 'hidden' : ''}"
      >
        Scroll text with audio
      </button>
    `;
  }

  private get timeDisplayTemplate(): TemplateResult {
    return html`
      <div class="time-display" style="top: ${this.timeScrollTop}px">
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
        data-identifier=${entry.id}
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

  private get transcriptEntries(): TranscriptEntryConfig[] {
    return this.config ? this.config.entries : [];
  }

  private get currentEntryStartTime(): number {
    return this.currentEntry ? this.currentEntry.start : this.currentTime;
  }

  static get styles(): CSSResult {
    const transcriptHeightCss = css`var(--transcriptHeight, 200px)`;

    const timeColorCss = css`var(--timeColor, white)`;
    const timeColumnWidthCss = css`var(--timeColumnWidth, 3rem)`;
    const timeDisplayCss = css`var(--timeDisplay, block)`;

    const autoScrollButtonFontColorCss = css`var(--autoScrollButtonFontColor, black)`;
    const autoScrollButtonBackgroundColorCss = css`var(--autoScrollButtonBackgroundColor, white)`;

    return css`
      .container {
        position: relative;
      }

      .auto-scroll-button.hidden {
        display: none;
      }

      .auto-scroll-button {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1rem;
        margin: auto;
        width: 8rem;
        border-radius: 1rem;
        border: 0;
        display: inline-block;
        color: ${autoScrollButtonFontColorCss};
        background-color: ${autoScrollButtonBackgroundColorCss};
        z-index: 10;
      }

      .context-overlay {
        position: absolute;
        left: 0;
        width: 100%;
        height: 0;
        z-index: -1;
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
        display: ${timeDisplayCss};
        flex: 0 0 ${timeColumnWidthCss};
        color: ${timeColorCss};
        position: relative;
      }

      .time-display {
        position: absolute;
        top: 0;
        line-height: 1rem;
        transition: top 1s;
      }

      .scroll-container {
        display: flex;
        overflow-y: auto;
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
    const entries = this.transcriptEntries;
    if (entries.length === 0) {
      return;
    }

    const activeEntry = entries.find(
      // eslint-disable-next-line max-len
      (entry: TranscriptEntryConfig) =>
        this.currentTime >= entry.start && this.currentTime <= entry.end,
    );

    if (!activeEntry) {
      this.currentEntry = undefined;
      return;
    }

    // this method gets called for every time update, which happens several times per second, but
    // we only want to update the UI if the `currentEntry` has actually changed
    // (ie, their ids don't match)
    if (this.currentEntry && this.currentEntry.id === activeEntry.id) {
      return;
    }

    this.currentEntry = activeEntry;
  }

  // This finds the transcript entry that is closest to a given time.
  //
  // If we don't have a currentEntry to work with, ie. we're in-between transcript entries or we're before the
  // transcript starts or after it ends, we want to find the element closest to the time. This allows
  // us to scroll to the proper location and set the current time's position.
  //
  // This is a somewhat heavy method since it has to check all of the entries so it's faster
  // to rely on accessing the `currentEntry` element if you can, but this should work for any given time.
  private entryIdentifierClosestToTime(time: number): number | null {
    if (this.transcriptEntries.length === 0) { return null; }

    const firstEntry: TranscriptEntryConfig = this.transcriptEntries[0];
    var delta: number = Math.abs(time - firstEntry.start);
    var closestIdentifier: number = firstEntry.id;

    this.transcriptEntries.forEach((entry: TranscriptEntryConfig) => {
      const entryDelta: number = Math.abs(time - entry.start);

      // if the entryDelta is less than the previous delta, we're moving closer to `time`;
      // once the delta starts increasing, we're moving away from it so we've just passed the closest
      if (entryDelta < delta) {
        delta = entryDelta;
        closestIdentifier = entry.id;
      } else {
        return;
      }
    });

    return closestIdentifier;
  }

  private elementClosestToTime(time: number): HTMLElement | null {
    const closestIdentifier = this.entryIdentifierClosestToTime(time);
    if (!closestIdentifier) {
      return null;
    }
    return this.elementForIdentifier(closestIdentifier);
  }

  private elementForIdentifier(identifier: number): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.querySelector(
      `transcript-entry[data-identifier="${identifier}"]`
    );
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
    this.scrollToClosestEntry();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentTime')) {
      this.handleCurrentTimeChange();
    }
    if (changedProperties.has('selectedSearchResultIndex')) {
      this.scrollToSelectedSearchResult();
    }
    if (changedProperties.has('currentEntry')) {
      this.scrollToClosestEntry();
      this.updateTimePosition();
    }
    if (changedProperties.has('autoScroll')) {
      this.handleAutoScrollChange();
    }
    if (changedProperties.has('config')) {
      this.selectedSearchResultIndex = 0;
      this.scrollToSelectedSearchResult();
    }
  }

  private get scrollView(): HTMLElement | null {
    return this.shadowRoot && (this.shadowRoot.getElementById('scroll-container') as HTMLElement);
  }

  private get activeTranscriptEntry(): HTMLElement | null {
    return (
      this.shadowRoot &&
      (this.shadowRoot.querySelector('transcript-entry[isActive]') as HTMLElement)
    );
  }

  private get selectedSearchResult(): HTMLElement | null {
    const selectedResult =
      this.shadowRoot &&
      this.shadowRoot.querySelector(
        `transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`,
      );
    return selectedResult as HTMLElement;
  }

  private get closestEntryToCurrentTime(): HTMLElement | null {
    return this.activeTranscriptEntry || this.elementClosestToTime(this.currentTime);
  }

  private handleAutoScrollChange(): void {
    const autoScrollChangedEvent = new CustomEvent('autoScrollChanged', {
      detail: { autoScroll: this.autoScroll },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(autoScrollChangedEvent);
  }

  private scrollToClosestEntry(): void {
    if (!this.autoScroll) {
      return;
    }
    const closestEntry: HTMLElement | null = this.closestEntryToCurrentTime;
    if (!closestEntry) {
      return;
    }
    this.scrollToElement(closestEntry);
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
    const scrollToEntry = this.closestEntryToCurrentTime;
    if (!scrollToEntry) {
      return;
    }

    const parentNode = scrollToEntry.parentNode as HTMLElement;
    const parentOffset = parentNode.getBoundingClientRect();
    const offset = scrollToEntry.getBoundingClientRect().top - parentOffset.top;

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
    let percentComplete;

    function easeInOutQuad(time: number): number {
      return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    }

    function animateScroll(): void {
      if (!scrollView) {
        return;
      }

      now = performance.now();
      elapsed = (now - startTime) / 1000;
      percentComplete = elapsed / duration;

      scrollView.scrollTop = start + change * easeInOutQuad(percentComplete);

      if (percentComplete < 1) {
        window.requestAnimationFrame(animateScroll);
      } else if (onDone) {
        onDone();
      }
    }

    animateScroll();
  }
}
