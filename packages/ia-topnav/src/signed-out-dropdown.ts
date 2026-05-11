import { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import DropdownMenu from './dropdown-menu';
import dropdownMenuCSS from './styles/dropdown-menu';

@customElement('signed-out-dropdown')
export class SignedOutDropdown extends DropdownMenu {
  static get styles(): CSSResultGroup {
    return dropdownMenuCSS;
  }
}
