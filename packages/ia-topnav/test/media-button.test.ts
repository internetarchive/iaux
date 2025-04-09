import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/media-button';
import { MediaButton } from '../src/media-button';

describe('<media-button>', () => {
  it('emits an event when button pressed', async () => {
    const el = await fixture<MediaButton>(html`<media-button></media-button>`);

    const link = el.shadowRoot?.querySelector(
      '.menu-item',
    ) as HTMLAnchorElement;

    setTimeout(() => link.click());
    const response = await oneEvent(el, 'mediaTypeSelected');

    expect(response).to.exist;
  });
});
