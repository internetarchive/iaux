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
import './transcript-view-dev-options';
import TranscriptEntryConfig from './models/transcript-entry-config';

@customElement('transcript-view')
export default class TranscriptView extends LitElement {
  @property({ type: [TranscriptEntryConfig] }) entries: TranscriptEntryConfig[] = [];

  @property({ type: TranscriptEntryConfig }) currentEntry: TranscriptEntryConfig | undefined;

  @property({ type: Number }) topContextHeight = 50;

  @property({ type: Number }) bottomContextHeight = 50;

  @property({ type: Number }) transcriptHeight = 200;

  @property({ type: Number }) timeScrollTop = 0;

  @property({ type: Boolean }) topContextVisible = true;

  @property({ type: Boolean }) bottomContextVisible = true;

  @property({ type: Boolean }) autoScroll = true;

  @property({ type: Number }) selectedSearchResultIndex = 0;

  @property({ type: Boolean }) devMode = true;

  @property({ type: Number }) scrollResumeTimerId = -1;

  render(): TemplateResult {
    return html`
      ${this.devMode ? this.transcriptDevOptionsTemplate : ''}

      <div class="auto-scroll-option">
        <label>
          <input type="checkbox" .checked=${this.autoScroll} @change=${this.changeAutoScroll} />
          Auto Scroll
        </label>
      </div>

      <div class="container">
        ${this.devMode ? this.contextTemplates : ''}

        <div
          class="scroll-container"
          id="scroll-container"
          @wheel=${this.didScroll}
          style="height: ${this.transcriptHeight}px"
        >
          <div class="col time">
            <div
              class="time-display"
              style="top: ${this.timeScrollTop}px; display: ${this.timeDisplay}"
            >
              <duration-formatter .seconds=${this.currentEntryStartTime}> </duration-formatter>
            </div>
          </div>

          <div class="col">
            ${(this.entries ? this.entries : []).map((entry: TranscriptEntryConfig) => {
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
            })}
          </div>
        </div>
      </div>
    `;
  }

  get transcriptDevOptionsTemplate(): TemplateResult {
    return html`
      <transcript-view-dev-options
        .transcriptHeight=${this.transcriptHeight}
        .topContextHeight=${this.topContextHeight}
        .bottomContextHeight=${this.bottomContextHeight}
        ?topContextVisible=${this.topContextVisible}
        ?bottomContextVisible=${this.bottomContextVisible}
        @topContextHeightChanged=${this.topContextHeightChanged}
        @bottomContextHeightChanged=${this.bottomContextHeightChanged}
        @transcriptHeightChanged=${this.transcriptHeightChanged}
        @showHideTopContext=${this.showHideTopContext}
        @showHideBottomContext=${this.showHideBottomContext}
      >
      </transcript-view-dev-options>
    `;
  }

  get contextTemplates(): TemplateResult {
    return html`
      ${this.topContextTemplate} ${this.bottomContextTemplate}
    `;
  }

  get topContextTemplate(): TemplateResult {
    return html`
      <div
        class="top context-overlay"
        style="height: ${this.topContextHeight}px; display: ${this.topContextDisplayState}"
      ></div>
    `;
  }

  get bottomContextTemplate(): TemplateResult {
    return html`
      <div
        class="bottom context-overlay"
        style="height: ${this.bottomContextHeight}px; display: ${this.bottomContextDisplayState}"
      ></div>
    `;
  }

  get currentEntryStartTime(): number {
    return this.currentEntry ? this.currentEntry.startTime : 0;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        position: relative;
      }

      .auto-scroll-option {
        background-color: white;
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
      }

      .scroll-container::-webkit-scrollbar {
        display: none;
      }
    `;
  }

  transcriptEntrySelected(e: CustomEvent): void {
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

  searchResultIndexChanged(e: CustomEvent): void {
    this.selectedSearchResultIndex = e.detail.searchResultIndex;
    this.autoScroll = false;
    if (!this.selectedSearchResult) {
      return;
    }
    this.scrollToElement(this.selectedSearchResult);
  }

  didScroll(): void {
    this.autoScroll = false;
    window.clearTimeout(this.scrollResumeTimerId);
    this.scrollResumeTimerId = window.setTimeout(() => {
      this.autoScroll = true;
    }, 15000);
  }

  changeAutoScroll(e: Event): void {
    const target = e.target as HTMLFormElement;
    this.autoScroll = target.checked;
    if (this.autoScroll) {
      this.scrollToActiveEntry();
    }
  }

  topContextHeightChanged(e: CustomEvent): void {
    this.topContextHeight = e.detail.height;
  }

  bottomContextHeightChanged(e: CustomEvent): void {
    this.bottomContextHeight = e.detail.height;
  }

  transcriptHeightChanged(e: CustomEvent): void {
    this.transcriptHeight = e.detail.height;
  }

  showHideTopContext(e: CustomEvent): void {
    this.topContextVisible = e.detail.visible;
  }

  showHideBottomContext(e: CustomEvent): void {
    this.bottomContextVisible = e.detail.visible;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentEntry')) {
      this.scrollToActiveEntry();
      this.updateTimePosition();
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

  get topContextDisplayState(): string {
    return this.topContextVisible ? 'block' : 'none';
  }

  get bottomContextDisplayState(): string {
    return this.bottomContextVisible ? 'block' : 'none';
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
