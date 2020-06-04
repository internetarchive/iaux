import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import savePageFormCSS from './styles/save-page-form';

class SavePageForm extends TrackedElement {
  static get styles() {
    return savePageFormCSS;
  }

  static get properties() {
    return {
      config: { type: Object }
    };
  }

  constructor() {
    super();
    this.config = {
      eventCategory: ''
    };
  }

  validateURL(e) {
    const urlInput = e.target.querySelector('[name="url_preload"]');
    const valid = /^https?:\/\/.{1,}/.test(urlInput.value);

    if (!valid) {
      e.preventDefault();
      urlInput.value = '';
      urlInput.setAttribute('placeholder', 'enter a web address');
      return;
    }
    this.trackSubmit(e);
  }

  render() {
    return html`
      <form action="//web.archive.org/save" method="post" data-event-submit-tracking="${this.config.eventCategory}|SavePageSubmit" @submit=${this.validateURL}>
        <h3>Save Page Now</h3>
        <p>Capture a web page as it appears now for use as a trusted citation in the future.</p>
        <div>
          <input type="text" name="url_preload" placeholder="https://" />
          <input type="submit" value="Save page" />
        </div>
        <p>Only available for sites that allow crawlers.</p>
      </form>
    `;
  }
}

customElements.define('save-page-form', SavePageForm);

export default SavePageForm;
