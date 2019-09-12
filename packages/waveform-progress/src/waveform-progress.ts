import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('waveform-progress')
export default class WaveformProgress extends LitElement {
  @property({ type: Number }) percentComplete = 0;
  @property({ type: String }) waveformUrl = '';
  @property({ type: String }) fillColor = '#3272b6';
  @property({ type: Boolean }) interactive = true;

  private _userIsInteracting = false;

  render() {
    return html`
      <div class="container">
        <div class="fill" style="width: ${this.percentComplete}%"></div>
        <img class="waveform-image" src="${this.waveformUrl}">
        ${this.interactive ? this.interactionCoverTemplate : ''}
      </div>
      `;
  }

  private drag(e: MouseEvent) {
    if (this._userIsInteracting) {
      this.percentComplete = this.offsetXToPercent(e.offsetX);
    }
  }

  private dragstart(e: Event) {
    this._userIsInteracting = true;
  }

  private dragend(e: Event) {
    this._userIsInteracting = false;
  }

  get dragcover(): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.getElementById('dragcover');
  }

  get interactionCoverTemplate(): TemplateFragment {
    return html`
      <div
        id="dragcover"

        @mousedown=${this.dragstart}
        @mouseup=${this.dragend}
        @mousemove=${this.drag}

        @touchstart=${this.dragstart}
        @touchend=${this.dragend}
        @touchmove=${this.drag}>
      </div>
    `;
  }

  private offsetXToPercent(offsetX: number): number {
    if (this.dragcover === null) { return 0; }
    const width: number = this.dragcover.clientWidth;
    const percentComplete: number = offsetX / width * 100;
    return percentComplete;
  }

  static get styles() {
    const fillColor = css`#3272b6`;

    return css`
      :host {
        display: inline-block;
      }

      #dragcover {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .container {
        display: block;
        position: relative;
        background-color: white;
        width: 100%;
        height: 100%;
      }

      .waveform-image {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .fill {
        position: absolute;
        height: 100%;
        background-color: ${fillColor};
      }
    `;
  }
}
