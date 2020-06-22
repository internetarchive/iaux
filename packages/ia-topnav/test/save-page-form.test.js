import { html, fixture, expect } from '@open-wc/testing';

import '../src/save-page-form';

const component = html`<save-page-form></save-page-form>`;

describe('<save-page-form>', () => {
  it('checks validity of URL value and shows an error when invalid', async () => {
    const el = await fixture(component);
    const urlInput = el.shadowRoot.querySelector('[name="url_preload"]');
    const errorMessage = el.shadowRoot.querySelector('.error');
    const submitEvent = {
      type: 'submit',
      target: el.shadowRoot.querySelector('form'),
      preventDefault: () => {}
    };
    submitEvent.currentTarget = submitEvent.target;

    urlInput.value = 'archive';
    el.validateURL(submitEvent);

    await el.updateComplete;

    expect(el.inputValid).to.be.false;
    expect(errorMessage.getAttribute('class')).to.contain('visible');

    urlInput.value += '.org';
    el.validateURL(submitEvent);

    await el.updateComplete;

    expect(el.inputValid).to.be.true;
    expect(errorMessage.getAttribute('class')).not.to.contain('visible');
  });
});
