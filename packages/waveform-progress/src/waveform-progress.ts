import {
  LitElement,
  html,
  css,
  customElement,
  property,
  PropertyValues,
  TemplateResult,
} from 'lit-element';

@customElement('waveform-progress')
export default class WaveformProgress extends LitElement {
  @property({ type: Number }) percentComplete = 0;
  @property({ type: String }) waveformUrl = '';
  @property({ type: String }) fillColor = '#3272b6';
  @property({ type: Boolean }) interactive = false;

  // This is our internal, canonical source for the `percentComplete`.
  // The public `percentComplete` will be getting modified by outside modifiers
  // like the audio player, but since the user can scrub through the waveform,
  // we need to be able to control when that value gets updated
  @property({ type: Number }) private _percentComplete = 0;

  private _userIsInteracting = false;

  render() {
    console.log('INTERACTIVE', this.interactive);
    return html`
      <div class="container">
        <div id="fill" style="width: ${this._percentComplete}%"></div>
        <img class="waveform-image" src="${this.waveformUrl}">
        ${this.interactive ? this.interactionCoverTemplate : ''}
      </div>
      `;
  }

  private get interactionCoverTemplate(): TemplateResult {
    return html`
      <div
        id="dragcover"

        @mousedown=${this.dragstart}
        @mouseup=${this.dragend}
        @mouseleave=${this.dragend}
        @mousemove=${this.drag}

        @touchstart=${this.dragstart}
        @touchend=${this.dragend}
        @touchmove=${this.drag}>
      </div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    console.log('updated', changedProperties);
    if (!changedProperties.has('percentComplete') || this._userIsInteracting) {
      return;
    }

    this._percentComplete = this.percentComplete;
  }

  private drag(e: MouseEvent) {
    console.log('drag', e);
    if (!this._userIsInteracting) { return; }
    this._percentComplete = this.offsetXToPercent(e.offsetX);
    this.dispatchValueChangeEvent()
  }

  private dragstart(e: Event) {
    console.log('dragstart', e);
    this._userIsInteracting = true;
  }

  private dragend(e: Event) {
    console.log('dragend', e);
    this._userIsInteracting = false;
  }

  private dispatchValueChangeEvent() {
    const event = new CustomEvent('valuechange', {
      detail: { value: this._percentComplete },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private get dragcover(): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.getElementById('dragcover');
  }

  private offsetXToPercent(offsetX: number): number {
    if (this.dragcover === null) { return 0; }
    const width: number = this.dragcover.clientWidth;
    const percentComplete: number = offsetX / width * 100;
    console.log('offsetXToPercent', width, offsetX, percentComplete);
    return percentComplete;
  }

  static get styles() {
    const fillColorCss = css`var(--fillColor, #3272b6)`;

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

      #fill {
        position: absolute;
        height: 100%;
        background-color: ${fillColorCss};
      }
    `;
  }
}
