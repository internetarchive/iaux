import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../index';

/* eslint-disable no-unused-expressions */

describe('SectionMarker', () => {
  it('marker mode defaults to `neither`', async () => {
    const el = await fixture(html`
      <section-marker></section-marker>
    `);

    expect(el.markerMode).to.equal("neither");
  });
});
