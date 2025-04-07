import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/media-button';

describe('<media-button>', () => {
  it('emits an event when button pressed', async () => {
    const el = await fixture(html`<media-button></media-button>`);

    setTimeout(() => el.shadowRoot.querySelector('.menu-item').click());
    const response = await oneEvent(el, 'mediaTypeSelected');

    expect(response).to.exist;
  });
});
