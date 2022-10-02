import DropdownMenu from './dropdown-menu.js';
import signedOutDropdownStyles from './styles/signed-out-dropdown.js';

class SignedOutDropdown extends DropdownMenu {
  static get styles() {
    return [DropdownMenu.styles, signedOutDropdownStyles];
  }
}

customElements.define('signed-out-dropdown', SignedOutDropdown);
