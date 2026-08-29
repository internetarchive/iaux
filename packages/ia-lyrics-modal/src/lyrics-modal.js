import { html, css, LitElement } from 'lit-element';

class LyricsModal extends LitElement {
  static get styles() {
    return css`
      .modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, .5);
      }

      .visible {
        display: block;
      }

      .block {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 10001;
        min-width: 320px;
        max-width: calc(100vw - 4rem);
        max-height: calc(100vh - 4rem);
        padding: 20px;
        overflow: auto;
        box-sizing: border-box;
        transform: translate(-50%, -50%);
        background: #fff;
      }
    `;
  }

  static get properties() {
    return {
      artist: { type: String },
      lyrics: { type: String },
      song: { type: String },
      visible: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.loadingMessage = 'Loading lyrics';
    this.lyrics = this.loadingMessage;
    this.visible = false;
  }

  load(changedProperties = {}) {
    Object.assign(this, {
      lyrics: this.loadingMessage,
      artist: changedProperties.artist || this.artist,
      song: changedProperties.song || this.song,
      visible: true,
    });
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  updated() {
    if (!this.artist || !this.song) { return; }

    this.fetchLyrics();
  }

  /* istanbul ignore next:stubbed in test */
  fetchLyrics() {
    fetch(`https://api.lyrics.ovh/v1/${this.artist}/${this.song}`)
      .then(data => data.json())
      .then((json) => { this.lyrics = json.lyrics; });
  }

  render() {
    return html`
      <div class="modal${this.visible ? ' visible' : ''}" @click=${this.hide}>
        <div class="block">
          <pre>${this.lyrics}</pre>
        </div>
      </div>
    `;
  }
}

customElements.define('lyrics-modal', LyricsModal);

export default LyricsModal;
