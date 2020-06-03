import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import savePageFormCSS from './styles/save-page-form';

class SavePageForm extends TrackedElement {
  static get styles() {
    return savePageFormCSS;
  }

  render() {
    return html`
      <form action="//web.archive.org/save" method="post">
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
