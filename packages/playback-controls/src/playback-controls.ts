import { LitElement, html, css, customElement, property } from 'lit-element';
import { PlaybackMode } from './playback-mode';
import replayImage from './assets/img/replay';
import skipAheadImage from './assets/img/skip-ahead';
import playImage from './assets/img/play';
import pauseImage from './assets/img/pause';

@customElement('playback-controls')
export default class PlaybackControls extends LitElement {
  @property({ type: PlaybackMode }) playbackMode = PlaybackMode.paused;

  render() {
    return html`
      <div class="container">
        <button id="back-btn" class="jump-btn" @click="${this.handleBackButton}">
          ${replayImage}
        </button>
        <button id="play-pause-btn" @click="${this.handlePlayPauseButton}">
          ${this.playPauseButtonImage}
        </button>
        <button id="forward-btn" class="jump-btn" @click="${this.handleForwardButton}">
          ${skipAheadImage}
        </button>
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

  handleBackButton() {
    const event = new Event('back-button-pressed');
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
    return css`
      .container {
        display: flex;
        justify-content: space-between;
      }

      #play-pause-btn {
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
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

      .jump-btn {
        background: none;
        border: none;
      }

      .jump-btn:active img {
        opacity: 0.75;
      }
    `;
  }
}
