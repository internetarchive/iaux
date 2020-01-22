import {
  LitElement, html, customElement, property, TemplateResult
} from 'lit-element';

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

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? `0${v}` : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }
}
