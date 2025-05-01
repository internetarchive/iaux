import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TrackedElement from './tracked-element';
import toSentenceCase from './lib/t-sentence-case';
import moreSliderCSS from './styles/more-slider';
import formatUrl from './lib/format-url';
import { IATopNavConfig, IATopNavLink } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('more-slider')
export class MoreSlider extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  static get styles() {
    return moreSliderCSS;
  }

  analyticsEvent(title: string) {
    return `${this.config.eventCategory}|NavMore${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <ul>
        ${this.menuItems.map(
          (item) =>
            html`<li>
              <a
                @click=${this.trackClick}
                href=${formatUrl(item.url, this.baseHost)}
                data-event-click-tracking="${this.analyticsEvent(item.title)}"
                >${item.title}</a
              >
            </li>`,
        )}
      </ul>
    `;
  }
}
