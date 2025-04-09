import { html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TrackedElement from './tracked-element';
import desktopSubnavCSS from './styles/desktop-subnav';
import icons from './assets/img/icons';
import formatUrl from './lib/formatUrl';
import { IATopNavLink } from './models';

@customElement('desktop-subnav')
export class DesktopSubnav extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  static get styles() {
    return desktopSubnavCSS;
  }

  get listItems() {
    return this.menuItems
      ? this.menuItems.map(
          (link) => html`
            <li>
              <a
                class="${link.title.toLowerCase()}"
                .href="${formatUrl(link.url, this.baseHost)}"
                >${link.title}${DesktopSubnav.iconFor(link.title)}</a
              >
            </li>
          `,
        )
      : nothing;
  }

  static iconFor(title: string): TemplateResult {
    const subnavIcons: Record<string, TemplateResult> = {
      Donate: icons.donate,
    };
    return subnavIcons[title] ? subnavIcons[title] : html``;
  }

  render() {
    return html`
      <ul>
        ${this.listItems}
      </ul>
    `;
  }
}
