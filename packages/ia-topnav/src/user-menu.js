import { html } from 'lit-element';
import DropdownMenu from './dropdown-menu';
import userMenuCSS from './styles/user-menu';

class UserMenu extends DropdownMenu {
  static get styles() {
    return [DropdownMenu.styles, userMenuCSS];
  }

  static get properties() {
    const props = {
      ...DropdownMenu.properties,
      username: { type: String },
    };
    return props;
  }

  constructor() {
    super();
    this.username = '';
  }

  get menuClass() {
    let menuClass = super.menuClass;
    menuClass += this.config.hideSearch ? ' search-hidden' : '';
    return menuClass;
  }

  render() {
    return html`
      <nav
        class="${this.menuClass}"
        aria-hidden="${this.ariaHidden}"
        aria-expanded="${this.ariaExpanded}"
      >
        <h3>${this.config.screenName}</h3>
        <ul>
          ${this.dropdownItems}
        </ul>
      </nav>
    `;
  }
}

customElements.define('user-menu', UserMenu);
