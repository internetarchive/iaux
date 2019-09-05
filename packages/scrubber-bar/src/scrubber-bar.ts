import { LitElement, html, css, unsafeCSS, customElement, property, PropertyValues } from 'lit-element';

@customElement('scrubber-bar')
export class ScrubberBar extends LitElement {
  @property({ type: Number }) percentComplete = 0;
  @property({ type: String }) trackOutlineColor = '#6e6d6d';
  @property({ type: String }) trackColor = 'black';
  @property({ type: String }) fillColor = '#3272b6';
  @property({ type: String }) bufferColor = '#cccccc';
  @property({ type: Number }) bufferedPercentage = 0;
  @property({ type: String }) thumbColor = 'red';
  @property({ type: Boolean }) userInteracting = false;

  render() {
    return html`
      <div class="container">
        <input
          id="slider"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value=${this.percentComplete}
          @mousedown=${this.interactionStarted}
          @mouseup=${this.interactionEnded}
          @touchstart=${this.interactionStarted}
          @touchend=${this.interactionEnded}
          @input=${this.handleSlide}
          @change=${this.handleSlide} />
        <div id="webkit-range-input-style"></style>
      </div>
    `;
  }

  updated(changedProperties: PropertyValues) {
    if (!this.userInteracting && changedProperties.has('percentComplete')) {
      this.rangeSlider.value = `${this.percentComplete}`;
      this.updateSliderProgress();
    }
  }

  firstUpdated() {
    this.updateSliderProgress();
  }

  handleSlide() {
    this.updateSliderProgress();
    this.emitChangeEvent();
  }

  interactionStarted() {
    this.userInteracting = true;
  }

  interactionEnded() {
    this.userInteracting = false;
  }

  get rangeSlider(): HTMLInputElement {
    return this.shadowRoot.getElementById('slider') as HTMLInputElement;
  }

  get webkitStyle(): HTMLElement {
    return this.shadowRoot.getElementById('webkit-range-input-style');
  }

  updateSliderProgress() {
    const sliderValue = this.rangeSlider.value;
    this.webkitStyle.innerHTML = `
      <style>
        input[type=range]::-webkit-slider-runnable-track {
          background: linear-gradient(to right,
                                      ${this.fillColor} 0%, ${this.fillColor} ${sliderValue}%,
                                      ${this.trackColor} ${sliderValue}%, ${this.trackColor} 100%);
        }
      </style>
    `;
  }

  emitChangeEvent() {
    const event = new CustomEvent('valuechange', {
      detail: { value: this.rangeSlider.value },
      bubbles: true,
      composed: true });
    this.dispatchEvent(event);
  }

  static get styles() {
    const thumbColor = 'white';
    const thumbDiameter = 20;
    const trackHeight = 10;

    const measurementUnit = css`px`;

    const trackBorder = css`1px solid #ffffff`;

    const fillColor = css`#3272b6`;

    const thumbDiameterCss = css`${thumbDiameter}`;
    const thumbBackgroundColor = css`white`;
    const thumbBorder = css`0px solid #ffffff`;

    const commonThumbDefinitions = css`
      height: ${thumbDiameterCss}${measurementUnit};
      width: ${thumbDiameterCss}${measurementUnit};
      border-radius: ${unsafeCSS(thumbDiameter / 2)}${measurementUnit};
      border: 0;
      cursor: pointer;
    `;

    const trackSizeDefinitions = css`
      height: ${trackHeight}${measurementUnit};
      border-radius: ${unsafeCSS(trackHeight / 2)}${measurementUnit};
    `;

    const commonTrackDefinitions = css`
      background-color: black;
      border: ${trackBorder};
      ${trackSizeDefinitions};
    `;

    return css`
      input[type=range] {
        -webkit-appearance: none;
        height: 20px;
        padding: 0;
        width: 100%;
        background: none;
        outline: none;
      }

      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        box-sizing: content-box;
        margin-top: ${unsafeCSS((thumbDiameter - trackHeight) / -2)}px;
        ${commonThumbDefinitions}
      }

      input[type=range]::-moz-range-thumb {
        ${commonThumbDefinitions}
      }

      input[type=range]::-ms-thumb { /* should come after -webkit- */
        ${commonThumbDefinitions}
        margin-top: 0;
      }

      input[type=range]::-webkit-slider-runnable-track {
        ${commonTrackDefinitions}
      }

      input[type=range]::-moz-range-track {
        ${commonTrackDefinitions}
      }

      input[type=range]::-moz-range-progress {
        background-color: ${fillColor};
        ${trackSizeDefinitions};
      }

      input[type=range]::-ms-track { /* should come after -webkit- */
        border-color: transparent;
        color: transparent;
        ${commonTrackDefinitions}
      }

      input[type=range]::-ms-fill-lower {
        background-color: ${fillColor};
        ${trackSizeDefinitions};
      }

      input[type=range]::-ms-tooltip {
        display: none;
      }
    `;
  }
}
