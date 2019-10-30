import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';

import '../lib/src/radio-player';
import { AudioSource } from '../index';
import RadioPlayerConfig from '../lib/src/models/radio-player-config';

describe('Radio Player', () => {
  it('has no configuration', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    expect(el.config).to.equal(undefined);
  });

  it('renders all of the major sub components', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const shadowRoot = el.shadowRoot;

    expect(shadowRoot.querySelectorAll('waveform-progress').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('transcript-view').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('.collection-logo').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('.title-date').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('audio-element').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('playback-controls').length).to.equal(1);
    expect(shadowRoot.querySelectorAll('scrubber-bar').length).to.equal(1);
  });

  it('can be configured with a title and date', async () => {
    const config = new RadioPlayerConfig('foo-title', 'bar-date', '', '', []);

    const el = await fixture(html`
      <radio-player .config=${config}></radio-player>
    `);

    const titleDisplay = el.shadowRoot.querySelector('.title');
    const dateDisplay = el.shadowRoot.querySelector('.date');

    expect(titleDisplay.innerText).to.equal('foo-title');
    expect(dateDisplay.innerText).to.equal('bar-date');
  });

  it('can play audio', async () => {
    const audioMp3 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audioMp3];

    const config = new RadioPlayerConfig('foo-title', 'bar-date', '', '', audioSources);

    const el = await fixture(html`
      <radio-player .config=${config}></radio-player>
    `);

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.play(); });
    const response = await oneEvent(el, 'playbackStarted');
    expect(response).to.exist;
  });

  it('can pause audio', async () => {
    const audioMp3 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audioMp3];

    const config = new RadioPlayerConfig('foo-title', 'bar-date', '', '', audioSources);

    const el = await fixture(html`
      <radio-player .config=${config}></radio-player>
    `);

    el.play();

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.pause(); });
    const response = await oneEvent(el, 'playbackPaused');
    expect(response).to.exist;
  });

  it('can seek audio', async () => {
    const audioMp3 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audioMp3];

    const config = new RadioPlayerConfig('foo-title', 'bar-date', '', '', audioSources);

    const el = await fixture(html`
      <radio-player .config=${config}></radio-player>
    `);

    el.seekTo(0.7);
    await promisedSleep(250);  // give it time to seek
    expect(el.currentTime).to.equal(0.7);
  });
});
