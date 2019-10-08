import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';
import '../lib/radio-player';
import RadioPlayerConfig from '../lib/models/radio-player-config';

describe('Radio Player', () => {
  it('has no configuration', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    expect(el.config).to.equal(undefined);
  });
});
