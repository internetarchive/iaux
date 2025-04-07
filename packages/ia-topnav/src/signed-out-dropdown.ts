import { customElement } from 'lit/decorators.js';
import DropdownMenu from './dropdown-menu';
import dropdownMenuCSS from './styles/dropdown-menu';
import signedOutDropdownStyles from './styles/signed-out-dropdown';

@customElement('signed-out-dropdown')
export class SignedOutDropdown extends DropdownMenu {
  static get styles() {
    return [dropdownMenuCSS, signedOutDropdownStyles];
  }
}
