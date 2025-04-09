import { html } from 'lit';
import TrackedElement from './tracked-element';
import savePageFormCSS from './styles/save-page-form';
import { customElement, property, state } from 'lit/decorators.js';
import { IATopNavConfig } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('save-page-form')
export class SavePageForm extends TrackedElement {
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;

  @state() inputValid = true;

  static get styles() {
    return savePageFormCSS;
  }

  private validateURL(e: SubmitEvent) {
    const target = e.target as HTMLFormElement;
    const urlInput = target.querySelector(
      '[name="url_preload"]',
    ) as HTMLInputElement;
    const valid = /\..{2,}$/.test(urlInput.value);

    if (!valid) {
      e.preventDefault();
      this.inputValid = false;
      return;
    }
    this.inputValid = true;
    this.trackSubmit(e);
  }

  get errorClass() {
    return `error${this.inputValid ? '' : ' visible'}`;
  }

  render() {
    return html`
      <form
        action="//web.archive.org/save"
        method="post"
        data-event-submit-tracking="${this.config.eventCategory}|SavePageSubmit"
        @submit=${this.validateURL}
      >
        <h3>Save Page Now</h3>
        <p>
          Capture a web page as it appears now for use as a trusted citation in
          the future.
        </p>
        <div>
          <input type="text" name="url_preload" placeholder="https://" />
          <input type="submit" value="Save" />
        </div>
        <p class=${this.errorClass}>Please enter a valid web address</p>
      </form>
    `;
  }
}
