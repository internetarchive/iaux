import { LitElement, html, css, customElement, property, TemplateResult } from 'lit-element';
import { PlaybackMode } from './playback-mode';

import nextSectionImage from './assets/img/next-section';
import prevSectionImage from './assets/img/previous-section';

import replayImage from './assets/img/replay';
import skipAheadImage from './assets/img/skip-ahead';
import playImage from './assets/img/play';
import pauseImage from './assets/img/pause';
import playbackSpeedImage from './assets/img/playback-speed';

import volumeFullImage from './assets/img/volume/volume-full';
import volumeMediumImage from './assets/img/volume/volume-medium';
import volumeMuteImage from './assets/img/volume/volume-mute';

@customElement('playback-controls')
export default class PlaybackControls extends LitElement {
  @property({ type: PlaybackMode }) playbackMode = PlaybackMode.paused;

  @property({ type: Number }) playbackRate = 1;

  @property({ type: Number }) volume = 1;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="vertical-button-stack playback-speed">
          <div class="vertical-button-container">
            <button id="playback-rate-btn" class="unstyled-button" @click="${this.handlePlaybackRateChange}">
              ${playbackSpeedImage}
            </button>
          </div>
          <div class="vertical-button-value">
            ${this.playbackRate}x
          </div>
        </div>
        <button id="prev-section-btn" class="jump-btn unstyled-button" @click="${this.handlePrevSectionButton}">
          ${prevSectionImage}
        </button>
        <button id="back-btn" class="jump-btn unstyled-button" @click="${this.handleBackButton}">
          ${replayImage}
        </button>
        <button id="play-pause-btn" @click="${this.handlePlayPauseButton}">
          ${this.playPauseButtonImage}
        </button>
        <button id="forward-btn" class="jump-btn unstyled-button" @click="${this.handleForwardButton}">
          ${skipAheadImage}
        </button>
        <button id="next-section-btn" class="jump-btn unstyled-button" @click="${this.handleNextSectionButton}">
          ${nextSectionImage}
        </button>
        <div class="vertical-button-stack volume">
          <div class="vertical-button-container">
            <button id="volume-control-btn" class="unstyled-button" @click="${this.handleVolumeChange}">
              ${this.volumeButtonImage}
            </button>
          </div>
          <div class="vertical-button-value">
            ${this.volume * 100}%
          </div>
        </div>
      </div>
    `;
  }

  get playPauseButtonImage() {
    var image = playImage;
    switch (this.playbackMode) {
      case PlaybackMode.playing:
        image = pauseImage;
        break;
      case PlaybackMode.paused:
        image = playImage;
        break;
    }
    return image;
  }

  get volumeButtonImage(): TemplateResult {
    var image = volumeMediumImage;
    if (this.volume === 0) {
      image = volumeMuteImage;
    }
    if (this.volume === 1) {
      image = volumeFullImage;
    }
    return image
  }

  handlePlaybackRateChange() {
    if (this.playbackRate === 2.0) {
      this.playbackRate = 0.5;
    } else {
      this.playbackRate += 0.25;
    }

    const event = new CustomEvent('playbackRateChange', {
      detail: { playbackRate: this.playbackRate },
    });
    this.dispatchEvent(event);
  }

  handleVolumeChange() {
    if (this.volume === 1) {
      this.volume = 0;
    } else {
      this.volume += 0.25;
    }

    const event = new CustomEvent('volumeChange', {
      detail: { volume: this.volume },
    });
    this.dispatchEvent(event);
  }

  handleBackButton() {
    const event = new Event('back-button-pressed');
    this.dispatchEvent(event);
  }

  handlePrevSectionButton() {
    const event = new Event('prev-section-button-pressed');
    this.dispatchEvent(event);
  }

  handleNextSectionButton() {
    const event = new Event('next-section-button-pressed');
    this.dispatchEvent(event);
  }

  handlePlayPauseButton() {
    this.playbackMode = this.playbackMode === PlaybackMode.playing ? PlaybackMode.paused : PlaybackMode.playing;
    const event = new Event('play-pause-button-pressed');
    this.dispatchEvent(event);
  }

  handleForwardButton() {
    const event = new Event('forward-button-pressed');
    this.dispatchEvent(event);
  }

  static get styles() {
    const playPauseDiameterCss = css`var(--playPauseDiameter, 4rem)`;

    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }

      .container {
        display: flex;
        justify-content: space-between;
        color: white;
        width: 100%;
      }

      .vertical-button-stack {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .vertical-button-container {
        text-align: center;
      }

      .vertical-button-container button {
        vertical-align: bottom;
      }

      .vertical-button-container svg {
        vertical-align: bottom;
      }

      .vertical-button-value {
        font-size: 0.7em;
        line-height: 1.4em;
        text-align: center;
      }

      #play-pause-btn {
        border-radius: 50%;
        height: ${playPauseDiameterCss};
        width: ${playPauseDiameterCss};
        border: none;
        background-color: white;
        vertical-align: middle;
      }

      #play-pause-btn:active {
        background-color: rgba(255, 255, 255, 0.75);
      }

      #play-pause-btn svg {
        width: 100%;
        height: 100%;
      }

      .unstyled-button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
      }

      button {
        cursor: pointer;
      }

      .jump-btn:active img {
        opacity: 0.75;
      }
    `;
  }
}
