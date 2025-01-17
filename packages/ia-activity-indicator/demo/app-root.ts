import { css, CSSResult, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '../index';
import { IAActivityIndicator, IAActivityIndicatorMode } from '../index';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('ia-activity-indicator') activityIndicator!: IAActivityIndicator;

  render() {
    return html`
      <ia-activity-indicator></ia-activity-indicator>

      <p><input type="button" value="Toggle" @click=${this.toggleMode} /></p>

      <p>
        Activity Ring Color:
        <input
          type="text"
          value="#999"
          @change=${(e: Event) =>
            this.changeActivityRingColor((e.target as HTMLInputElement).value)}
        />
      </p>
      <p>
        Activity Dots Color:
        <input
          type="text"
          value="#999"
          @change=${(e: Event) =>
            this.changeActivityDotsColor((e.target as HTMLInputElement).value)}
        />
      </p>
      <p>
        Complete Ring Color:
        <input
          type="text"
          value="purple"
          @change=${(e: Event) =>
            this.changeCompletedRingColor((e.target as HTMLInputElement).value)}
        />
      </p>
      <p>
        Complete Check Color:
        <input
          type="text"
          value="purple"
          @change=${(e: Event) =>
            this.changeCompletedCheckColor((e.target as HTMLInputElement).value)}
        />
      </p>
    `;
  }

  toggleMode() {
    const mode =
      this.activityIndicator.mode === IAActivityIndicatorMode.processing
        ? IAActivityIndicatorMode.complete
        : IAActivityIndicatorMode.processing;
    this.activityIndicator.mode = mode;
  }

  changeActivityRingColor(color: string) {
    this.activityIndicator.style.cssText += `--activityIndicatorLoadingRingColor: ${color}`;
  }

  changeActivityDotsColor(color: string) {
    this.activityIndicator.style.cssText += `--activityIndicatorLoadingDotColor: ${color}`;
  }

  changeCompletedRingColor(color: string) {
    this.activityIndicator.style.cssText += `--activityIndicatorCompletedRingColor: ${color}`;
  }

  changeCompletedCheckColor(color: string) {
    this.activityIndicator.style.cssText += `--activityIndicatorCheckmarkColor: ${color}`;
  }

  static get styles(): CSSResult {
    return css`
      ia-activity-indicator {
        width: 100px;
        height: 100px;
        display: block;
        --activityIndicatorLoadingDotColor: #999;
        --activityIndicatorLoadingRingColor: #999;
        --activityIndicatorCheckmarkColor: purple;
        --activityIndicatorCompletedRingColor: purple;
      }
    `;
  }
}
