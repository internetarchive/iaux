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

@customElement('scrubber-bar')
export default class ScrubberBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 0.1;

  userInteracting = false;

  render(): TemplateResult {
    return html`
      <div class="container">
        <input
          id="slider"
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.value}
          @mousedown=${this.interactionStarted}
          @mouseup=${this.interactionEnded}
          @touchstart=${this.interactionStarted}
          @touchend=${this.interactionEnded}
          @input=${this.handleSlide}
          @change=${this.handleSlide} />
        <div id="webkit-range-input-style"></div>
      </div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (!this.userInteracting && changedProperties.has('percentComplete')) {
      if (this.rangeSlider) {
        this.rangeSlider.value = `${this.value}`;
      }
      this.updateSliderProgress();
    }
  }

  firstUpdated(): void {
    this.updateSliderProgress();
  }

  handleSlide(): void {
    this.updateSliderProgress();
    this.emitChangeEvent();
  }

  interactionStarted(): void {
    this.userInteracting = true;
  }

  interactionEnded(): void {
    this.userInteracting = false;
  }

  get rangeSlider(): HTMLInputElement | null {
    return this.shadowRoot && (this.shadowRoot.getElementById('slider') as HTMLInputElement);
  }

  get webkitStyle(): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.getElementById('webkit-range-input-style');
  }

  updateSliderProgress(): void {
    const sliderValue = (this.rangeSlider && this.rangeSlider.value) || 0;
    if (this.webkitStyle) {
      this.webkitStyle.innerHTML = `
        <style>
          input[type=range]::-webkit-slider-runnable-track {
            background: linear-gradient(to right,
              var(--trackFillColor, #3272b6) 0%, var(--trackFillColor, #3272b6) ${sliderValue}%,
              var(--trackColor, purple) ${sliderValue}%, var(--trackColor, purple) 100%);
          }
        </style>
      `;
    }
  }

  emitChangeEvent(): void {
    const event = new CustomEvent('valuechange', {
      detail: { value: (this.rangeSlider && this.rangeSlider.value) || 0 },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResult {
    const scrubberBarHeight = css`var(--scrubberBarHeight, 20px)`;

    const thumbDiameter = css`var(--thumbDiameter, 20px)`;
    const thumbBorderRadius = css`var(--thumbBorderRadius, 50%)`;

    const trackHeight = css`var(--trackHeight, 10px)`;
    const trackBorderRadius = css`var(--trackBorderRadius, 5px)`;
    const trackBorder = css`var(--trackBorder, 1px solid black)`;
    const trackFillColor = css`var(--trackFillColor, #3272b6)`;

    const commonThumbDefinitions = css`
      background-color: var(--thumbColor, white);
      height: ${thumbDiameter};
      width: ${thumbDiameter};
      border-radius: ${thumbBorderRadius};
      border: var(--thumbBorder, 1px solid black);
      cursor: pointer;
    `;

    const trackSizeDefinitions = css`
      height: ${trackHeight};
      border-radius: ${trackBorderRadius};
    `;

    const commonTrackDefinitions = css`
      background-color: var(--trackColor, black);
      border: ${trackBorder};
      ${trackSizeDefinitions};
    `;

    return css`
      input[type='range'] {
        -webkit-appearance: none;
        height: ${scrubberBarHeight};
        padding: 0;
        width: 100%;
        background: none;
        outline: none;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        box-sizing: content-box;
        margin-top: var(--webkitThumbTopMargin, -6px);
        ${commonThumbDefinitions}
      }

      input[type='range']::-moz-range-thumb {
        ${commonThumbDefinitions}
      }

      input[type='range']::-ms-thumb {
        /* should come after -webkit- */
        ${commonThumbDefinitions}
        margin-top: 0;
      }

      input[type='range']::-webkit-slider-runnable-track {
        ${commonTrackDefinitions}
      }

      input[type='range']::-moz-range-track {
        ${commonTrackDefinitions}
      }

      input[type='range']::-moz-range-progress {
        background-color: ${trackFillColor};
        ${trackSizeDefinitions};
      }

      input[type='range']::-ms-track {
        /* should come after -webkit- */
        border-color: transparent;
        color: transparent;
        ${commonTrackDefinitions}
      }

      input[type='range']::-ms-fill-lower {
        background-color: ${trackFillColor};
        ${trackSizeDefinitions};
      }

      input[type='range']::-ms-tooltip {
        display: none;
      }
    `;
  }
}
