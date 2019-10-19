import {
  LitElement,
  html,
  css,
  customElement,
  property,
  PropertyValues,
  TemplateResult,
  CSSResult,
} from 'lit-element';

enum SectionMarkerMode {
  left = 'left',
  right = 'right',
  both = 'both',
  neither = 'neither',
}

import prevSectionImage from './assets/img/previous-section-marker';
import nextSectionImage from './assets/img/next-section-marker';

@customElement('section-marker')
class SectionMarker extends LitElement {

  @property({ type: SectionMarkerMode }) markerMode = SectionMarkerMode.both;

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
    return css`
      .container {
        display: flex;
        justify-content: center;
        outline: 1px solid purple;
        height: 100%;
      }

      .container.mode-left .right-arrow {
        display: none;
      }

      .container.mode-right .left-arrow {
        display: none;
      }

      .container.mode-both {
      }

      .container.mode-neither .left-arrow, .container.mode-neither .right-arrow {
        display: none;
      }

      .center-divider {
        border-left: 1px solid white;
        width: 1px;
        left: 50%;
        outline: 1px solid red;
      }

      .left-arrow {
        right: 50%;
      }

      .right-arrow {
        left: 50%;
      }
    `;
  }
}

export { SectionMarkerMode, SectionMarker };
