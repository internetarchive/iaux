import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../lib/duration-formatter.js';

describe('DurationFormatter', () => {
  it('defaults value to 0', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    expect(el.seconds).to.equal(0);
  });

  it('returns empty string if seconds is not a number', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    el.seconds = 'foo';

    expect(el.durationString).to.equal('');
  });

  it('returns a properly formatted duration string if just seconds', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    el.seconds = 35;

    expect(el.durationString).to.equal('00:35');
  });

  it('returns a properly formatted duration string if seconds less than 10', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    el.seconds = 7;

    expect(el.durationString).to.equal('00:07');
  });

  it('returns a properly formatted duration string if minutes and seconds', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    el.seconds = 63;

    expect(el.durationString).to.equal('01:03');
  });

  it('returns a properly formatted duration string if hours, minutes, and seconds', async () => {
    const el = await fixture(html`
      <duration-formatter></duration-formatter>
    `);

    el.seconds = 3663;

    expect(el.durationString).to.equal('01:01:03');
  });

});
