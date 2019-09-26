import {
  LitElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
} from 'lit-element';

import './search-results-switcher';

// these are dev tools so I don't think we need coverage for them
/* istanbul ignore */

@customElement('transcript-view-dev-options')
export default class TranscriptViewDevOptions extends LitElement {
  @property({ type: Number }) transcriptHeight = 200;

  @property({ type: Number }) topContextHeight = 50;

  @property({ type: Number }) bottomContextHeight = 50;

  @property({ type: Number }) currentTime = 0;

  @property({ type: Boolean }) topContextVisible = true;

  @property({ type: Boolean }) bottomContextVisible = true;

  @property({ type: Boolean }) autoScroll = true;

  @property({ type: Boolean }) showContextZones = true;

  @property({ type: Boolean }) timerRunning = false;

  private timer = -1;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div>
          <search-results-switcher
            @searchResultIndexChanged=${this.searchResultIndexChanged}
          ></search-results-switcher>
        </div>

        <div>
          ${this.autoScrollTemplate}
        </div>

        <div>
          ${this.transcriptHeightTemplate}
        </div>

        <div>
          ${this.showContextBoxesTemplate}
        </div>

        <div>
          ${this.topContextHeightTemplate}
        </div>

        <div>
          ${this.bottomContextHeightTemplate}
        </div>

        <div>
          ${this.currentTimeTemplate}
        </div>
      </div>
    `;
  }

  get autoScrollTemplate(): TemplateResult {
    return html`
      <label>
        <input type="checkbox" .checked=${this.autoScroll} @change=${this.changeAutoScroll} />
        Auto Scroll
      </label>
    `;
  }

  get currentTimeTemplate(): TemplateResult {
    return html`
      <label>Current Time:</label>
      <input
        type="range"
        min="0"
        max="445"
        .value=${this.currentTime}
        @input=${this.handleCurrentTimeSlide}
        @change=${this.handleCurrentTimeSlide}
      />
      ${this.currentTime}s
      <button @click=${this.startStopTimer}>${this.timerRunning ? 'Stop' : 'Start'} Timer</button>
    `;
  }

  get transcriptHeightTemplate(): TemplateResult {
    return html`
      <label>Transcript Height:</label>
      <input
        type="range"
        min="100"
        max="400"
        .value=${this.transcriptHeight}
        @input=${this.handleTranscriptSizeSlide}
        @change=${this.handleTranscriptSizeSlide}
      />
      ${this.transcriptHeight}px
    `;
  }

  get showContextBoxesTemplate(): TemplateResult {
    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.showContextZones}
          @change=${this.changeShowContextZones}
        />
        Show Context Zones
      </label>
    `;
  }

  get topContextHeightTemplate(): TemplateResult {
    return html`
      <label>Top Context Size:</label>
      <input
        type="range"
        min="10"
        max="100"
        .value=${this.topContextHeight}
        @input=${this.handleTopContextSlide}
        @change=${this.handleTopContextSlide}
      />
      ${this.topContextHeight}px
    `;
  }

  get bottomContextHeightTemplate(): TemplateResult {
    return html`
      <label> Bottom Context Size:</label>
      <input
        type="range"
        min="10"
        max="100"
        .value=${this.bottomContextHeight}
        @input=${this.handleBottomContextSlide}
        @change=${this.handleBottomContextSlide}
      />
      ${this.bottomContextHeight}px
    `;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        background-color: white;
      }
    `;
  }

  private searchResultIndexChanged(e: CustomEvent): void {
    const event = new CustomEvent('searchResultIndexChanged', {
      detail: { searchResultIndex: e.detail.searchResultIndex },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private changeAutoScroll(e: Event): void {
    const target = e.target as HTMLFormElement;
    this.autoScroll = target.checked;
    // if (this.autoScroll) {
    //   this.scrollToActiveEntry();
    // }
  }

  private changeShowContextZones(e: Event): void {
    const target = e.target as HTMLFormElement;
    this.showContextZones = target.checked;
    const event = new CustomEvent('showContextZonesChanged', {
      detail: { showContextZones: this.showContextZones },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private startStopTimer(): void {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.timerRunning = true;
    this.timer = window.setInterval(() => {
      if (this.currentTime >= 445) {
        this.stopTimer();
        return;
      }
      this.currentTime += 1;
      this.emitCurrentTimeChangedEvent();
    }, 250);
  }

  private stopTimer(): void {
    this.timerRunning = false;
    window.clearInterval(this.timer);
  }

  handleCurrentTimeSlide(e: Event): void {
    this.stopTimer();
    const target = e.target as HTMLFormElement;
    const seconds = parseFloat(target.value);
    this.currentTime = seconds;
    this.emitCurrentTimeChangedEvent();
  }

  emitCurrentTimeChangedEvent(): void {
    const event = new CustomEvent('currentTimeChanged', {
      detail: { currentTime: this.currentTime },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleTopContextSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.topContextHeight = height;
    const event = new CustomEvent('topContextHeightChanged', {
      detail: { height },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleBottomContextSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.bottomContextHeight = height;
    const event = new CustomEvent('bottomContextHeightChanged', {
      detail: { height },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleTranscriptSizeSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.transcriptHeight = height;
    const event = new CustomEvent('transcriptHeightChanged', {
      detail: { height },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  showHideBottomContext(e: Event): void {
    const target = e.target as HTMLFormElement;
    const event = new CustomEvent('showHideBottomContext', {
      detail: { visible: target.checked },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  showHideTopContext(e: Event): void {
    const target = e.target as HTMLFormElement;
    const event = new CustomEvent('showHideTopContext', {
      detail: { visible: target.checked },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
