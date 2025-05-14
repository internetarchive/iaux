import { html, fixture, expect } from '@open-wc/testing';

import '../src/save-page-form';
import { SavePageForm } from '../src/save-page-form';

const component = html`<save-page-form></save-page-form>`;

describe('<save-page-form>', () => {
  it('checks validity of URL value and shows an error when invalid', async () => {
    const el = await fixture<SavePageForm>(component);
    const urlInput = el.shadowRoot?.querySelector(
      '[name="url_preload"]',
    ) as HTMLInputElement;
    const errorMessage = el.shadowRoot?.querySelector('.error');
    // const submitEvent: { type: string, target: Element | null | undefined, preventDefault: () => void, currentTarget: Element | null | undefined } = {
    //   type: 'submit',
    //   target: el.shadowRoot?.querySelector('form'),
    //   preventDefault: () => { },
    //   currentTarget: null,
    // };

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    }) as SubmitEvent;

    Object.defineProperty(submitEvent, 'target', {
      value: el.shadowRoot?.querySelector('form') as HTMLFormElement,
      writable: false,
    });

    Object.defineProperty(submitEvent, 'currentTarget', {
      value: el.shadowRoot?.querySelector('form') as HTMLFormElement,
      writable: false,
    });

    // const submitEvent: CustomEvent = {
    //   type: 'submit',
    //   target: el.shadowRoot!.querySelector('form'),
    //   preventDefault: () => { },
    //   currentTarget: null,
    // };

    // submitEvent.currentTarget = submitEvent.target;

    // urlInput.value = 'archive';
    // el.validateURL(submitEvent);

    // await el.updateComplete;

    // expect(el.inputValid).to.be.false;
    // expect(errorMessage.getAttribute('class')).to.contain('visible');

    // urlInput.value += '.org';
    // el.validateURL(submitEvent);

    // await el.updateComplete;

    // expect(el.inputValid).to.be.true;
    // expect(errorMessage.getAttribute('class')).not.to.contain('visible');
  });
});
