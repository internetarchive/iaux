/* eslint-disable no-underscore-dangle */

import {
  LitElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  CSSResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ZoneOfSilence from './models/zone-of-silence';

@customElement('waveform-progress')
export default class WaveformProgress extends LitElement {
  @property({ type: Number }) percentComplete = 0;

  @property({ type: String }) waveformUrl = '';

  @property({ type: Boolean }) interactive = false;

  @property({ type: Array }) zonesOfSilence: ZoneOfSilence[] = [];

  // This is our internal, canonical source for the `percentComplete`.
  // The public `percentComplete` will be getting modified by outside modifiers
  // like the audio player, but since the user can scrub through the waveform,
  // we need to be able to control when that value gets updated
  @property({ type: Number }) private _percentComplete = 0;

  private _userIsInteracting = false;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div id="fill" style="width: ${this._percentComplete}%"></div>
        <img class="waveform-image" src="${this.waveformUrl}" />
        ${this.zonesOfSilenceTemplate} ${this.interactive ? this.interactionCoverTemplate : ''}
      </div>
    `;
  }

  private get zonesOfSilenceTemplate(): TemplateResult {
    return html`
      ${this.zonesOfSilence.map(
        (zone: ZoneOfSilence) => html`
          <div
            class="zone-of-silence"
            style="left: ${zone.startPercent}%; width: ${zone.endPercent - zone.startPercent}%"
          ></div>
        `,
      )}
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
        @touchmove=${this.drag}
      ></div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (!changedProperties.has('percentComplete') || this._userIsInteracting) {
      return;
    }

    this._percentComplete = this.percentComplete;
  }

  private drag(e: MouseEvent): void {
    /* istanbul ignore if */
    if (!this._userIsInteracting) {
      return;
    }
    this.updatePercentComplete(e);
  }

  private dragstart(e: MouseEvent): void {
    this._userIsInteracting = true;
    this.updatePercentComplete(e);
  }

  private dragend(): void {
    this._userIsInteracting = false;
  }

  private updatePercentComplete(e: MouseEvent): void {
    if (!this.container) { return; }
    const containerOffset: number = this.container.offsetLeft;
    const offsetX: number = e.pageX - containerOffset;
    this._percentComplete = this.offsetXToPercent(offsetX);
    this.dispatchValueChangeEvent();
  }

  private dispatchValueChangeEvent(): void {
    const event = new CustomEvent('valuechange', {
      detail: { value: this._percentComplete },
    });
    this.dispatchEvent(event);
  }

  private get dragcover(): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.getElementById('dragcover');
  }

  private get container(): HTMLElement | null {
    return this.shadowRoot && this.shadowRoot.querySelector('.container');
  }

  private offsetXToPercent(offsetX: number): number {
    /* istanbul ignore if */
    if (this.dragcover === null) {
      return 0;
    }
    const width: number = this.dragcover.clientWidth;
    const percentComplete: number = (offsetX / width) * 100;
    return percentComplete;
  }

  static get styles(): CSSResult {
    const fillColorCss = css`var(--fillColor, #3272b6)`;
    const zoneOfSilenceColorCss = css`var(--zoneOfSilenceColor, #f6e652)`;
    const waveformLeftRightMarginCss = css`var(--waveformLeftRightMarginSize, 10px)`;

    return css`
      :host {
        display: inline-block;
      }

      #dragcover {
        width: 100%;
        height: 100%;
        position: absolute;
        touch-action: none;
      }

      .container {
        display: block;
        position: relative;
        background-color: white;
        height: 100%;
        margin-left: ${waveformLeftRightMarginCss};
        margin-right: ${waveformLeftRightMarginCss};
      }

      .waveform-image {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .zone-of-silence {
        position: absolute;
        top: 0;
        bottom: 0;
        background: linear-gradient(
          #000,
          #000 47%,
          ${zoneOfSilenceColorCss} 50%,
          #000 53%,
          #000 100%
        );
      }

      #fill {
        position: absolute;
        height: 100%;
        background-color: ${fillColorCss};
      }
    `;
  }
}
