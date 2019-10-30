import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';

import '../lib/src/radio-player';
import { AudioSource, TranscriptEntryConfig } from '../index';
import RadioPlayerConfig from '../lib/src/models/radio-player-config';
import sampleTranscript from './sample_transcript';
import { TranscriptConfig } from '@internetarchive/transcript-view';

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

  it('generates proper scrubber bar section markers', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1, 17, 'foo', false);
    const entry2 = new TranscriptEntryConfig(1, 18, 37, '', true);
    const entry3 = new TranscriptEntryConfig(1, 37, 56, 'bar', false);
    const entry4 = new TranscriptEntryConfig(1, 57, 74, 'baz', true);
    const entry5 = new TranscriptEntryConfig(1, 75, 100, 'baz', false);
    const entries = [entry1, entry2, entry3, entry4, entry5];

    const transcriptConfig = new TranscriptConfig(entries);

    const el = await fixture(html`
      <radio-player .transcriptConfig=${transcriptConfig}></radio-player>
    `);

    el.duration = 100

    const expected = [0, 18, 37, 57, 74, 100];

    el.scrubberBarMarkerPercentages.forEach((element, index) => {
      // we need to round the values because sometimes the percentage calculations
      // come out to 56.9999999
      expect(Math.round(element)).to.equal(expected[index]);
    });
  });

  it('shows and hides the search results switcher', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const searchResultsSwitcher = el.shadowRoot.querySelector('search-results-switcher');
    expect(searchResultsSwitcher.classList.contains('hidden')).to.equal(true);

    el.shouldShowSearchResultSwitcher = true;
    await promisedSleep(100);
    expect(searchResultsSwitcher.classList.contains('hidden')).to.equal(false);
  });

  it('shows and hides the no search results message', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const searchResultsSwitcher = el.shadowRoot.querySelector('.no-search-results-message');
    expect(searchResultsSwitcher.classList.contains('hidden')).to.equal(true);

    el.shouldShowNoSearchResultMessage = true;
    await promisedSleep(100);
    expect(searchResultsSwitcher.classList.contains('hidden')).to.equal(false);
  });

  // it('updates the search term when updateSearchTerm event is emitted', async () => {
  //   const el = await fixture(html`
  //     <radio-player></radio-player>
  //   `);

  //   const searchBar = el.shadowRoot.querySelector('expandable-search-bar');
  //   const inputField = searchBar.shadowRoot.querySelector('input[type=text]');
  //   const keyUpEvent = new KeyboardEvent('keyup', { key: 'A' });

  //   // searchBar.value = 'foo';

  //   inputField.dispatchEvent(keyUpEvent);

  //   await promisedSleep(100);

  //   expect(el.searchTerm).to.equal('A');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   // setTimeout(() => { searchBar.value = 'foo'; });
  //   // const response = await oneEvent(el, 'playbackPaused');
  //   // expect(response).to.exist;
  // });


});
