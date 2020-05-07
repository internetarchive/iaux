import DropdownMenu from './dropdown-menu';
import signedOutDropdownStyles from './styles/signed-out-dropdown';

class SignedOutDropdown extends DropdownMenu {
  static get styles() {
    return [DropdownMenu.styles, signedOutDropdownStyles];
  }

  get menuClass() {
    let menuClass = super.menuClass;
    menuClass += this.config.hideSearch ? ' search-hidden' : '';
    return menuClass;
  }
}

customElements.define('signed-out-dropdown', SignedOutDropdown);
