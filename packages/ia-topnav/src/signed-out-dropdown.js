import DropdownMenu from './dropdown-menu';
import signedOutDropdownStyles from './styles/signed-out-dropdown';

class SignedOutDropdown extends DropdownMenu {
  static get styles() {
    return [DropdownMenu.styles, signedOutDropdownStyles];
  }
}

customElements.define('signed-out-dropdown', SignedOutDropdown);
