import {
  LitElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
} from 'lit-element';

@customElement('transcript-view-dev-options')
export default class TranscriptViewDevOptions extends LitElement {
  @property({ type: Number }) transcriptHeight = 200;

  @property({ type: Number }) topContextHeight = 50;

  @property({ type: Number }) bottomContextHeight = 50;

  @property({ type: Boolean }) topContextVisible = true;

  @property({ type: Boolean }) bottomContextVisible = true;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div>
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
        </div>

        <div>
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
          <label>
            <input
              type="checkbox"
              ?checked=${this.topContextVisible}
              @change=${this.showHideTopContext}
            />
            Visible
          </label>
        </div>

        <div>
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
          <label>
            <input
              type="checkbox"
              ?checked=${this.bottomContextVisible}
              @change=${this.showHideBottomContext}
            />
            Visible
          </label>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .container {
        background-color: white;
      }
    `;
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
