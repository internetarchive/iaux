import { CSSResult, html, PropertyValues } from 'lit';
import DropdownMenu from './dropdown-menu';
import userMenuCSS from './styles/user-menu';
import dropdownStyles from './styles/dropdown-menu';
import KeyboardNavigation from './lib/keyboard-navigation';
import { customElement, property } from 'lit/decorators.js';
import { makeBooleanFromString } from './lib/makeBooleanString';

@customElement('user-menu')
export default class UserMenu extends DropdownMenu {
  @property({ type: String }) username = '';
  @property({ type: String }) screenName = '';

  private previousKeydownListener?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: HTMLElement, ev: KeyboardEvent) => any;

  static get styles(): CSSResult[] {
    return [dropdownStyles, userMenuCSS];
  }

  updated(props: PropertyValues) {
    if (props.has('open') && this.open) {
      const container = this.shadowRoot?.querySelector(
        '.nav-container',
      ) as HTMLElement;

      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container,
          'usermenu',
        );
        this.addEventListener('keydown', keyboardNavigation.handleKeyDown);
        if (this.previousKeydownListener) {
          this.removeEventListener('keydown', this.previousKeydownListener);
        }
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
  }

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden="${makeBooleanFromString(this.ariaHidden ?? 'true')}"
          aria-expanded="${makeBooleanFromString(this.ariaExpanded ?? 'false')}"
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
