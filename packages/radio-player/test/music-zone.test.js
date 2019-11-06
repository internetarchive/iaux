import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import MusicZone from '../lib/src/models/music-zone';

describe('Music Zone', () => {
  it('can be instantiated', async () => {

    const zone = new MusicZone(10, 20)
    expect(zone.start).to.equal(10);
    expect(zone.end).to.equal(20);
  });
});
