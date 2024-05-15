import { __decorate } from "tslib";
/* eslint-disable operator-assignment */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let AudioElement = class AudioElement extends LitElement {
    showControls = false;
    playbackRate = 1;
    volume = 1;
    sources = [];
    get duration() {
        /* istanbul ignore next */
        if (!this.audioElement) {
            return 0;
        }
        return this.audioElement.duration;
    }
    get currentTime() {
        /* istanbul ignore next */
        if (!this.audioElement) {
            return 0;
        }
        return this.audioElement.currentTime;
    }
    load() {
        /* istanbul ignore else */
        if (this.audioElement) {
            this.audioElement.load();
            // you have to reset the playback rate after loading
            this.audioElement.playbackRate = this.playbackRate;
        }
    }
    play() {
        /* istanbul ignore else */
        if (this.audioElement)
            this.audioElement.play();
    }
    pause() {
        /* istanbul ignore else */
        if (this.audioElement)
            this.audioElement.pause();
    }
    seekTo(seconds) {
        /* istanbul ignore if */
        if (!this.audioElement)
            return;
        this.audioElement.currentTime = seconds;
    }
    seekBy(seconds) {
        /* istanbul ignore if */
        if (!this.audioElement)
            return;
        this.audioElement.currentTime = this.audioElement.currentTime + seconds;
    }
    render() {
        console.log('foo bar');
        return html `
      <audio
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @play=${this.playbackStarted}
        @pause=${this.playbackPaused}
        @canplay=${this.canplay}
      >
        ${this.sources.map((source) => html `
            <source src=${source.url} type=${source.mimetype} />
          `)}
      </audio>
    `;
    }
    get audioElement() {
        return this.shadowRoot && this.shadowRoot.querySelector('audio');
    }
    updated(changedProperties) {
        /* istanbul ignore if */
        if (!this.audioElement)
            return;
        if (changedProperties.has('playbackRate')) {
            this.audioElement.playbackRate = this.playbackRate;
        }
        if (changedProperties.has('volume')) {
            this.audioElement.volume = this.volume;
        }
        if (changedProperties.has('showControls')) {
            if (this.showControls) {
                this.audioElement.setAttribute('controls', 'true');
            }
            else {
                this.audioElement.removeAttribute('controls');
            }
        }
    }
    handleDurationChange(e) {
        const target = e.target;
        const event = new CustomEvent('durationchange', {
            detail: { duration: target.duration },
        });
        this.dispatchEvent(event);
    }
    handleTimeChange(e) {
        const target = e.target;
        const event = new CustomEvent('timeupdate', {
            detail: { currentTime: target.currentTime },
        });
        this.dispatchEvent(event);
    }
    playbackStarted() {
        const event = new Event('playbackStarted');
        this.dispatchEvent(event);
    }
    playbackPaused() {
        const event = new Event('playbackPaused');
        this.dispatchEvent(event);
    }
    canplay() {
        const event = new Event('canplay');
        this.dispatchEvent(event);
    }
};
__decorate([
    property({ type: Boolean })
], AudioElement.prototype, "showControls", void 0);
__decorate([
    property({ type: Number })
], AudioElement.prototype, "playbackRate", void 0);
__decorate([
    property({ type: Number })
], AudioElement.prototype, "volume", void 0);
__decorate([
    property({ type: Array })
], AudioElement.prototype, "sources", void 0);
AudioElement = __decorate([
    customElement('audio-element')
], AudioElement);
export default AudioElement;
//# sourceMappingURL=audio-element.js.map