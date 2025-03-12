import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('duration-formatter')
export default class DurationFormatter extends LitElement {
  @property({ type: Number }) seconds = 0;

  render(): TemplateResult {
    return html`
      ${this.durationString}
    `;
  }

  get durationString(): string {
    if (typeof this.seconds !== 'number') {
      return '';
    }

    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor(this.seconds / 60) % 60;
    const seconds = Math.floor(this.seconds % 60);

    const hoursString = hours > 0 ? `${hours}` : undefined;
    const minutesString = hours > 0 && minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    let durationString = `${minutesString}:${secondsString}`;
    durationString = hoursString ? `${hoursString}:${durationString}` : durationString;

    return durationString;
  }
}
