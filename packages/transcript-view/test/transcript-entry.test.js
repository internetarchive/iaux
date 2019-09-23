import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';
import '../lib/transcript-entry';
import TranscriptEntryConfig from '../lib/models/transcript-entry-config';

describe('TranscriptEntry', () => {
  it('has no entry, nor is active or selected by default', async () => {
    const el = await fixture(html`
      <transcript-entry></transcript-entry>
    `);

    expect(el.entry).to.equal(undefined);
    expect(el.isActive).to.equal(false);
    expect(el.isSelected).to.equal(false);
  });

  it('displays entry text if provided', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', undefined);

    const el = await fixture(html`
      <transcript-entry .entry=${entry}></transcript-entry>
    `);

    expect(el.shadowRoot.innerHTML).to.have.string('foo-bar');
  });

  it('has an `active` class if it is the active search result', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', undefined);

    const el = await fixture(html`
      <transcript-entry .entry=${entry} ?isActive=${true}></transcript-entry>
    `);

    const containerElement = el.shadowRoot.querySelector('span');

    expect(containerElement.className).to.have.string('active');
  });

  it('has a `selected` class if it is the selected search result', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', undefined);

    const el = await fixture(html`
      <transcript-entry .entry=${entry} ?isSelected=${true}></transcript-entry>
    `);

    const containerElement = el.shadowRoot.querySelector('span');

    expect(containerElement.className).to.have.string('selected');
  });

  it('emits a `userSelected` event if user selects it and it is a search match', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', 1);

    const el = await fixture(html`
      <transcript-entry .entry=${entry}></transcript-entry>
    `);

    const clickableSpan = el.shadowRoot.querySelector('span');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { clickableSpan.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'userSelected');
    expect(response).to.exist;
  });
});
