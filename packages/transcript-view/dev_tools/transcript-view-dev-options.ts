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

  @property({ type: Number }) totalTime = 0;

  @property({ type: Boolean }) topContextVisible = true;

  @property({ type: Boolean }) bottomContextVisible = true;

  @property({ type: Boolean }) autoScroll = true;

  @property({ type: Boolean }) showContextZones = true;

  @property({ type: Boolean }) timerRunning = false;

  private timer = -1;

  private timerDelay = 1000;

  render(): TemplateResult {
    return html`
      <div class="container">
        <h3>Dev Options</h3>

        <ul class="dev-options">
          <li>
            ${this.searchResultTemplate}
          </li>

          <li>
            ${this.autoScrollTemplate}
          </li>

          <li>
            ${this.transcriptHeightTemplate}
          </li>

          <li>
            ${this.showContextBoxesTemplate}
          </li>

          <li>
            ${this.topContextHeightTemplate}
          </li>

          <li>
            ${this.bottomContextHeightTemplate}
          </li>

          <li>
            ${this.currentTimeTemplate}
          </li>
        </ul>
      </div>
    `;
  }

  get searchResultTemplate(): TemplateResult {
    return html`
      Search Result:
      <search-results-switcher
        @searchResultIndexChanged=${this.searchResultIndexChanged}
      ></search-results-switcher>
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
      <label
        >Current Time:
        <input
          type="range"
          min="0"
          max=${this.totalTime}
          .value=${this.currentTime}
          @input=${this.handleCurrentTimeSlide}
          @change=${this.handleCurrentTimeSlide}
        />
      </label>
      ${this.currentTime}s
      <button @click=${this.setNormalTimerDelay}>1x</button>
      <button @click=${this.setFastTimerDelay}>2x</button>
      <button @click=${this.setFasterTimerDelay}>3x</button>
      <button @click=${this.stopTimer}>Stop Timer</button>
    `;
  }

  get transcriptHeightTemplate(): TemplateResult {
    return html`
      <label
        >Transcript Height:
        <input
          type="range"
          min="100"
          max="400"
          .value=${this.transcriptHeight}
          @input=${this.handleTranscriptSizeSlide}
          @change=${this.handleTranscriptSizeSlide}
        />
      </label>
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
      <label
        >Top Context Size:
        <input
          type="range"
          min="10"
          max="100"
          .value=${this.topContextHeight}
          @input=${this.handleTopContextSlide}
          @change=${this.handleTopContextSlide}
        />
      </label>
      ${this.topContextHeight}px
    `;
  }

  get bottomContextHeightTemplate(): TemplateResult {
    return html`
      <label>
        Bottom Context Size:
        <input
          type="range"
          min="10"
          max="100"
          .value=${this.bottomContextHeight}
          @input=${this.handleBottomContextSlide}
          @change=${this.handleBottomContextSlide}
        />
      </label>
      ${this.bottomContextHeight}px
    `;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        background-color: white;
      }

      search-results-switcher {
        display: inline-block;
      }

      .dev-options {
        list-style: none;
        padding-left: 0.5rem;
      }

      .dev-options li {
        border-bottom: 1px solid lightgrey;
        line-height: 1.5rem;
      }

      .dev-options li:last-child {
        border-bottom: 0;
      }
    `;
  }

  private searchResultIndexChanged(e: CustomEvent): void {
    const event = new CustomEvent('searchResultIndexChanged', {
      detail: { searchResultIndex: e.detail.searchResultIndex },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  private changeAutoScroll(e: Event): void {
    const target = e.target as HTMLFormElement;
    this.autoScroll = target.checked;
    const event = new CustomEvent('shouldAutoScroll', {
      detail: { autoScroll: this.autoScroll },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  private changeShowContextZones(e: Event): void {
    const target = e.target as HTMLFormElement;
    this.showContextZones = target.checked;
    const event = new CustomEvent('showContextZonesChanged', {
      detail: { showContextZones: this.showContextZones },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  private setNormalTimerDelay(): void {
    this.changeTimerDelay(1000);
  }

  private setFastTimerDelay(): void {
    this.changeTimerDelay(500);
  }

  private setFasterTimerDelay(): void {
    this.changeTimerDelay(250);
  }

  private changeTimerDelay(delay: number): void {
    this.timerDelay = delay;
    this.startTimer();
  }

  private startStopTimer(): void {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerRunning = true;
    this.timer = window.setInterval(() => {
      if (this.currentTime >= this.totalTime) {
        this.stopTimer();
        return;
      }
      this.currentTime += 1;
      this.emitCurrentTimeChangedEvent();
    }, this.timerDelay);
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
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  handleTopContextSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.topContextHeight = height;
    const event = new CustomEvent('topContextHeightChanged', {
      detail: { height },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  handleBottomContextSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.bottomContextHeight = height;
    const event = new CustomEvent('bottomContextHeightChanged', {
      detail: { height },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  handleTranscriptSizeSlide(e: Event): void {
    const target = e.target as HTMLFormElement;
    const height = target.value;
    this.transcriptHeight = height;
    const event = new CustomEvent('transcriptHeightChanged', {
      detail: { height },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  showHideBottomContext(e: Event): void {
    const target = e.target as HTMLFormElement;
    const event = new CustomEvent('showHideBottomContext', {
      detail: { visible: target.checked },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  showHideTopContext(e: Event): void {
    const target = e.target as HTMLFormElement;
    const event = new CustomEvent('showHideTopContext', {
      detail: { visible: target.checked },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }
}
