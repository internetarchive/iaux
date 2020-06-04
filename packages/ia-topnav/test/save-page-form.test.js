import { html, fixture, expect } from '@open-wc/testing';

import '../src/save-page-form';

const component = html`<save-page-form></save-page-form>`;

describe('<save-page-form>', () => {
  it('checks validity of URL value and updates placeholder when invalid', async () => {
    const el = await fixture(component);
    const urlInput = el.shadowRoot.querySelector('[name="url_preload"]');
    const initialPlaceholder = urlInput.getAttribute('placeholder');
    const submitEvent = {
      type: 'submit',
      target: el.shadowRoot.querySelector('form'),
      preventDefault: () => {}
    };

    urlInput.value = 'archive';
    el.validateURL(submitEvent);

    expect(urlInput.getAttribute('placeholder')).to.not.equal(initialPlaceholder);
  });
});
