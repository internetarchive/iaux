import { LitElement, html, customElement, property, TemplateResult } from 'lit-element';
import AudioSource from './models/audio-source';

@customElement('audio-element')
export default class AudioElement extends LitElement {
  @property({ type: Boolean }) showControls = false;

  @property({ type: Number }) playbackRate = 1;

  @property({ type: Number }) volume = 1;

  @property({ type: Array }) sources = [];

  render(): TemplateResult {
    return html`
      <audio
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @play=${this.playbackStarted}
        @pause=${this.playbackPaused}
        @canplay=${this.canplay}
      >
        ${this.sources.map(
          (source: AudioSource) => html`
            <source src=${source.url} type=${source.mimetype} />
          `,
        )}
      </audio>
    `;
  }

  get audioElement(): HTMLAudioElement | null {
    return this.shadowRoot && (this.shadowRoot.querySelector('audio') as HTMLAudioElement);
  }

  load(): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.load();
  }

  play(): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.play();
  }

  pause(): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.pause();
  }

  seekBy(seconds: number): void {
    /* istanbul ignore if */
    if (!this.audioElement) return;
    this.audioElement.currentTime = this.audioElement.currentTime + seconds;
  }

  seekTo(seconds: number): void {
    /* istanbul ignore if */
    if (!this.audioElement) return;
    this.audioElement.currentTime = seconds;
  }

  updated(): void {
    /* istanbul ignore if */
    if (!this.audioElement) return;

    this.audioElement.playbackRate = this.playbackRate;

    this.audioElement.volume = this.volume;

    if (this.showControls) {
      this.audioElement.setAttribute('controls', 'true');
    } else {
      this.audioElement.removeAttribute('controls');
    }
  }

  private handleDurationChange(e: Event): void {
    const target = e.target as HTMLAudioElement;
    const event = new CustomEvent('durationchange', {
      detail: { duration: target.duration },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleTimeChange(e: Event): void {
    const target = e.target as HTMLAudioElement;
    const event = new CustomEvent('timeupdate', {
      detail: { currentTime: target.currentTime },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private playbackStarted(): void {
    const event: Event = new Event('playbackStarted');
    this.dispatchEvent(event);
  }

  private playbackPaused(): void {
    const event: Event = new Event('playbackPaused');
    this.dispatchEvent(event);
  }

  private canplay(): void {
    const event: Event = new Event('canplay');
    this.dispatchEvent(event);
  }
}
