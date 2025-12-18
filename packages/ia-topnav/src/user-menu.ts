import { CSSResult, html } from 'lit';
import DropdownMenu from './dropdown-menu';
import userMenuCSS from './styles/user-menu';
import dropdownStyles from './styles/dropdown-menu';
import { customElement, property } from 'lit/decorators.js';

@customElement('user-menu')
export default class UserMenu extends DropdownMenu {
  @property({ type: String }) username = '';
  @property({ type: String }) screenName = '';

  static get styles(): CSSResult[] {
    return [dropdownStyles, userMenuCSS];
  }

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden=${!this.open}
          aria-expanded=${this.open}
        >
          <h3>${this.screenName}</h3>
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}
