import {
  LitElement,
  html,
  css,
  TemplateResult,
  CSSResult,
} from 'lit';
import {
  customElement,
  property,
} from 'lit/decorators.js';

import prevSectionImage from './assets/img/previous-section-marker';
import nextSectionImage from './assets/img/next-section-marker';

enum SectionMarkerMode {
  left = 'left',
  right = 'right',
  both = 'both',
  neither = 'neither',
}

@customElement('section-marker')
class SectionMarker extends LitElement {

  @property({ type: SectionMarkerMode }) markerMode = SectionMarkerMode.neither;

  render(): TemplateResult {
    return html`
      <div class="container mode-${this.markerMode}">
        <div class="left-arrow arrow">${nextSectionImage}</div>
        <div class="center-divider"></div>
        <div class="right-arrow arrow">${prevSectionImage}</div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    const animationSpeed: CSSResult = css`0.1s`;
    const markerHeightCollapsedCss = css`var(--markerHeightCollapsed, 10px)`;
    const markerHeightExpandedCss = css`var(--markerHeightExpanded, 25px)`;

    return css`
      .container {
        display: flex;
        justify-content: center;
        height: 100%;
      }

      .arrow {
        padding-top: 10px;
        opacity: 1;
        transition: opacity ${animationSpeed} ease-out, padding-top ${animationSpeed} ease-out;
      }

      .right-arrow {
        visibility: hidden;
      }

      .arrow {
        visibility: hidden;
      }

      .container.mode-left .right-arrow {
        opacity: 0;
      }

      .container.mode-right .left-arrow {
        opacity: 0;
      }

      .container.mode-neither .left-arrow, .container.mode-neither .right-arrow {
        opacity: 0;
        padding-top: 75%;
      }

      .container.mode-neither .center-divider {
        height: ${markerHeightCollapsedCss};
      }

      .center-divider {
        border-left: 1px solid white;
        width: 1px;
        left: 50%;
        height: ${markerHeightExpandedCss};
        align-self: flex-end;
        transition: height ${animationSpeed} ease-out;
      }
    `;
  }
}

export { SectionMarkerMode, SectionMarker };
