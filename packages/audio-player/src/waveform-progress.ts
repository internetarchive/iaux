import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import AudioSource from './models/audio-source';

@customElement('audio-player')
export class AudioPlayer extends LitElement {
  @property({ type: Number }) playbackRate = 1;
  @property({ type: [AudioSource] }) sources = Array<AudioSource>();

  render() {
    return html`
      <audio
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        id="audioPlayer">

        ${(this.sources ? this.sources : []).map((source: AudioSource, index: number) =>
          html`
            <source src=${source.url} type=${source.mimetype}>
          `
        )}

      </audio>
    `;
  }

  get audioPlayer(): HTMLAudioElement | null {
    return this.shadowRoot && this.shadowRoot.getElementById('audioPlayer') as HTMLAudioElement;
  }

  play() {
    this.audioPlayer && this.audioPlayer.play();
  }

  pause() {
    this.audioPlayer && this.audioPlayer.pause();
  }

  scrubBy(seconds: number) {
    if (!this.audioPlayer) { return; }
    this.audioPlayer.currentTime = this.audioPlayer.currentTime + seconds;
  }

  scrubTo(seconds: number) {
    if (!this.audioPlayer) { return; }
    this.audioPlayer.currentTime = seconds;
  }

  updated(changedProperties: PropertyValues) {
    if (!this.audioPlayer) { return; }
    if (changedProperties.has('playbackRate')) {
      this.audioPlayer.playbackRate = this.playbackRate;
    }
  }

  handleDurationChange(e: Event) {
    const target = e.target as HTMLAudioElement;
    const event = new CustomEvent('durationchange', {
      detail: { duration: target.duration },
      bubbles: true,
      composed: true });
    this.dispatchEvent(event);
  }

  handleTimeChange(e: Event) {
    const target = e.target as HTMLAudioElement;
    const event = new CustomEvent('timeupdate', {
      detail: { currentTime: target.currentTime },
      bubbles: true,
      composed: true });
    this.dispatchEvent(event);
  }
}
