import { html } from 'lit';
import TrackedElement from './tracked-element';
import savePageFormCSS from './styles/save-page-form';

class SavePageForm extends TrackedElement {
  static get styles() {
    return savePageFormCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      inputValid: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {
      eventCategory: '',
    };
    this.inputValid = true;
  }

  validateURL(e) {
    const urlInput = e.target.querySelector('[name="url_preload"]');
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
        <p>Capture a web page as it appears now for use as a trusted citation in the future.</p>
        <div>
          <input type="text" name="url_preload" placeholder="https://" />
          <input type="submit" value="Save" />
        </div>
        <p class=${this.errorClass}>Please enter a valid web address</p>
      </form>
    `;
  }
}

customElements.define('save-page-form', SavePageForm);

export default SavePageForm;
