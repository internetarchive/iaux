/* eslint-disable no-underscore-dangle */
import { __decorate } from "tslib";
import { LitElement, html, css, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WaveformProgress = class WaveformProgress extends LitElement {
    constructor() {
        super(...arguments);
        this.percentComplete = 0;
        this.waveformUrl = '';
        this.interactive = false;
        this.zonesOfSilence = [];
        // This is our internal, canonical source for the `percentComplete`.
        // The public `percentComplete` will be getting modified by outside modifiers
        // like the audio player, but since the user can scrub through the waveform,
        // we need to be able to control when that value gets updated
        this._percentComplete = 0;
        this._userIsInteracting = false;
    }
    render() {
        return html `
      <div class="container">
        <div id="fill" style="width: ${this._percentComplete}%"></div>
        <img class="waveform-image" src="${this.waveformUrl}" />
        ${this.zonesOfSilenceTemplate} ${this.interactive ? this.interactionCoverTemplate : ''}
      </div>
    `;
    }
    get zonesOfSilenceTemplate() {
        return html `
      ${this.zonesOfSilence.map((zone) => html `
          <div
            class="zone-of-silence"
            style="left: ${zone.startPercent}%; width: ${zone.endPercent - zone.startPercent}%"
          ></div>
        `)}
    `;
    }
    get interactionCoverTemplate() {
        return html `
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
    updated(changedProperties) {
        if (!changedProperties.has('percentComplete') || this._userIsInteracting) {
            return;
        }
        this._percentComplete = this.percentComplete;
    }
    drag(e) {
        /* istanbul ignore if */
        if (!this._userIsInteracting) {
            return;
        }
        this.updatePercentComplete(e);
    }
    dragstart(e) {
        this._userIsInteracting = true;
        this.updatePercentComplete(e);
    }
    dragend() {
        this._userIsInteracting = false;
    }
    updatePercentComplete(e) {
        if (!this.container) {
            return;
        }
        const containerOffset = this.container.offsetLeft;
        const offsetX = e.pageX - containerOffset;
        this._percentComplete = this.offsetXToPercent(offsetX);
        this.dispatchValueChangeEvent();
    }
    dispatchValueChangeEvent() {
        const event = new CustomEvent('valuechange', {
            detail: { value: this._percentComplete },
        });
        this.dispatchEvent(event);
    }
    get dragcover() {
        return this.shadowRoot && this.shadowRoot.getElementById('dragcover');
    }
    get container() {
        return this.shadowRoot && this.shadowRoot.querySelector('.container');
    }
    offsetXToPercent(offsetX) {
        /* istanbul ignore if */
        if (this.dragcover === null) {
            return 0;
        }
        const width = this.dragcover.clientWidth;
        const percentComplete = (offsetX / width) * 100;
        return percentComplete;
    }
    static get styles() {
        const fillColorCss = css `var(--fillColor, #3272b6)`;
        const zoneOfSilenceColorCss = css `var(--zoneOfSilenceColor, #f6e652)`;
        const waveformLeftRightMarginCss = css `var(--waveformLeftRightMarginSize, 10px)`;
        return css `
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
};
__decorate([
    property({ type: Number })
], WaveformProgress.prototype, "percentComplete", void 0);
__decorate([
    property({ type: String })
], WaveformProgress.prototype, "waveformUrl", void 0);
__decorate([
    property({ type: Boolean })
], WaveformProgress.prototype, "interactive", void 0);
__decorate([
    property({ type: Array })
], WaveformProgress.prototype, "zonesOfSilence", void 0);
__decorate([
    property({ type: Number })
], WaveformProgress.prototype, "_percentComplete", void 0);
WaveformProgress = __decorate([
    customElement('waveform-progress')
], WaveformProgress);
export default WaveformProgress;
//# sourceMappingURL=waveform-progress.js.map