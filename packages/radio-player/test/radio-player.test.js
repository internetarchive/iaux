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

  it('updates the search term when updateSearchTerm event is emitted', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const searchBar = el.shadowRoot.querySelector('expandable-search-bar');
    const inputField = searchBar.shadowRoot.querySelector('input[type=text]');
    inputField.value = 'foo';
    const keyUpEvent = new KeyboardEvent('keyup');
    inputField.dispatchEvent(keyUpEvent);
    expect(el.searchTerm).to.equal('foo');
  });

  it('does not update the search term if updateSearchTerm event does not contain needed info', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.searchTerm = 'boop';

    const event = new CustomEvent('foo', { })
    el.updateSearchTerm(event);
    expect(el.searchTerm).to.equal('boop');

    const event2 = new CustomEvent('foo', { detail: { }})
    el.updateSearchTerm(event2);
    expect(el.searchTerm).to.equal('boop');
  });


  it('can clear searches properly', async () => {
    const el = await fixture(html`
      <radio-player searchTerm='foo search'></radio-player>
    `);

    const transcriptView = el.shadowRoot.querySelector('transcript-view');
    const searchResultsSwitcher = el.shadowRoot.querySelector('search-results-switcher');

    expect(el.searchTerm).to.equal('foo search');

    setTimeout(() => { el.searchCleared(); });
    const response = await oneEvent(el, 'searchCleared');
    expect(response).to.exist;
    expect(el.searchTerm).to.equal('');
    expect(searchResultsSwitcher.currentResultIndex).to.equal(0);
    expect(transcriptView.selectedSearchResultIndex).to.equal(0);
  });

  it('emits a `searchRequested` event when the `searchEnterKeyPressed` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { value: 'foo' }})

    setTimeout(() => { el.searchEnterKeyPressed(event); });
    const response = await oneEvent(el, 'searchRequested');
    expect(response.detail.searchTerm).to.equal('foo');
  });

  it('updates `playbackRate` when `changePlaybackRate` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { playbackRate: 1.5 }})
    el.changePlaybackRate(event);
    expect(el.playbackRate).to.equal(1.5);
  });

  it('does not update `playbackRate` when `changePlaybackRate` is not passed a proper event', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { })
    el.changePlaybackRate(event);
    expect(el.playbackRate).to.equal(1);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.changePlaybackRate(event2);
    expect(el.playbackRate).to.equal(1);
  });

  it('updates `volume` when `volumeChanged` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { volume: 75 }})
    el.volumeChanged(event);
    expect(el.volume).to.equal(75);
  });

  it('does not update `volume` if `volumeChanged` event is not properly structured', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.volume = 23;

    const event = new CustomEvent('foo', { })
    el.volumeChanged(event);
    expect(el.volume).to.equal(23);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.volumeChanged(event2);
    expect(el.volume).to.equal(23);
  });

  it('updates `duration` when `handleDurationChange` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { duration: 75 }})
    el.handleDurationChange(event);
    expect(el.duration).to.equal(75);
  });

  it('does not update `duration` if `handleDurationChange` event is not properly structured', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.duration = 23;

    const event = new CustomEvent('foo', { })
    el.handleDurationChange(event);
    expect(el.duration).to.equal(23);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.handleDurationChange(event2);
    expect(el.duration).to.equal(23);
  });

  it('updates `currentTime` when `handleTimeChange` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { currentTime: 75 }})
    el.handleTimeChange(event);
    expect(el.currentTime).to.equal(75);
  });

  it('does not update `currentTime` if `handleTimeChange` event is not properly structured', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.currentTime = 15;

    const event = new CustomEvent('foo', { })
    el.handleTimeChange(event);
    expect(el.currentTime).to.equal(15);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.handleTimeChange(event2);
    expect(el.currentTime).to.equal(15);
  });

  it('updates `currentTime` when `valueChangedFromScrub` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.duration = 100;

    const event = new CustomEvent('foo', { detail: { value: 75 }})
    el.valueChangedFromScrub(event);
    expect(el.currentTime).to.equal(75);
  });

  it('does not update `currentTime` if `valueChangedFromScrub` event is not properly structured', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.duration = 100;
    el.currentTime = 15;

    const event = new CustomEvent('foo', { })
    el.valueChangedFromScrub(event);
    expect(el.currentTime).to.equal(15);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.valueChangedFromScrub(event2);
    expect(el.currentTime).to.equal(15);
  });

  it('updates `currentTime` when `transcriptEntrySelected` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    const event = new CustomEvent('foo', { detail: { entry: { start: 75 }}})
    el.transcriptEntrySelected(event);
    expect(el.currentTime).to.equal(75);
  });

  it('does not update `currentTime` if `transcriptEntrySelected` event is not properly structured', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    el.currentTime = 15;

    const event = new CustomEvent('foo', { })
    el.transcriptEntrySelected(event);
    expect(el.currentTime).to.equal(15);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.transcriptEntrySelected(event2);
    expect(el.currentTime).to.equal(15);

    const event3 = new CustomEvent('foo', { detail: { entry: {}}})
    el.transcriptEntrySelected(event3);
    expect(el.currentTime).to.equal(15);
  });

  it('updates the transcriptView result index and scrolls when `searchResultIndexChanged` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var scrollCalled = false;

    const transcriptView = el.shadowRoot.querySelector('transcript-view');
    transcriptView.scrollToSelectedSearchResult = () => { scrollCalled = true; }

    const event = new CustomEvent('foo', { detail: { searchResultIndex: 3 }})
    el.searchResultIndexChanged(event);
    expect(transcriptView.selectedSearchResultIndex).to.equal(3);
    expect(scrollCalled).to.equal(true);
  });

  it('does not update the searchResultIndexChanged if event does not contain needed info', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);
    const transcriptView = el.shadowRoot.querySelector('transcript-view');
    transcriptView.selectedSearchResultIndex = 13;

    const event = new CustomEvent('foo', { })
    el.searchResultIndexChanged(event);
    expect(transcriptView.selectedSearchResultIndex).to.equal(13);

    const event2 = new CustomEvent('foo', { detail: { }})
    el.searchResultIndexChanged(event);
    expect(transcriptView.selectedSearchResultIndex).to.equal(13);
  });


  it('updates the transcriptView result index and scrolls when `searchResultIndexChanged` callback is triggered', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var scrollCalled = false;

    const transcriptView = el.shadowRoot.querySelector('transcript-view');
    transcriptView.scrollToSelectedSearchResult = () => { scrollCalled = true; }

    const event = new CustomEvent('foo', { detail: { searchResultIndex: 3 }})
    el.searchResultIndexChanged(event);
    expect(transcriptView.selectedSearchResultIndex).to.equal(3);
    expect(scrollCalled).to.equal(true);
  });

  it('does not update transcriptView when search result index changed if transcript view does not exist', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var scrollCalled = false;

    const transcriptView = el.shadowRoot.querySelector('transcript-view');
    transcriptView.remove();

    transcriptView.scrollToSelectedSearchResult = () => { scrollCalled = true; }

    const event = new CustomEvent('foo', { detail: { searchResultIndex: 3 }})
    el.searchResultIndexChanged(event);
    expect(scrollCalled).to.equal(false);
  });

  it('seeks the audio element back by 10 seconds when the backButtonHandler is called', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var seekTime = 0;
    const audioElement = el.shadowRoot.querySelector('audio-element');
    audioElement.seekBy = (time) => { seekTime = time; }
    el.backButtonHandler();
    expect(seekTime).to.equal(-10);
  });

  it('seeks the audio element forward by 10 seconds when the forwardButtonHandler is called', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var seekTime = 0;
    const audioElement = el.shadowRoot.querySelector('audio-element');
    audioElement.seekBy = (time) => { seekTime = time; }
    el.forwardButtonHandler();
    expect(seekTime).to.equal(10);
  });

  it('seeks to the next section when the nextSectionButtonHandler is called', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = 0;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    el.duration = 100;
    el.percentComplete = 35;

    el.nextSectionButtonHandler();

    expect(seekedTime).to.equal(37.1);
  });

  it('seeks to the beginning of the section when the previousSectionButtonHandler is called', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = 0;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    el.duration = 100;
    el.percentComplete = 35;

    el.prevSectionButtonHandler();

    expect(seekedTime).to.equal(17.9);
  });

  it('handles play / pause button correctly', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    var playCalled = false;
    var pauseCalled = false;

    const audioElement = el.shadowRoot.querySelector('audio-element');
    audioElement.play = () => { playCalled = true; }
    audioElement.pause = () => { pauseCalled = true; }

    expect(el.isPlaying).to.equal(false);
    el.playPauseButtonHandler();

    expect(el.isPlaying).to.equal(true);
    expect(playCalled).to.equal(true);
    expect(pauseCalled).to.equal(false);

    el.playPauseButtonHandler();

    expect(el.isPlaying).to.equal(false);
    expect(pauseCalled).to.equal(true);
  });

  it('handles audio scrubbing correctly', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = 0;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    el.duration = 100;

    const event = new CustomEvent('foo', { detail: { value: 73 }})

    setTimeout(() => { el.valueChangedFromScrub(event); });
    const response = await oneEvent(el, 'timeChangedFromScrub');

    expect(response.detail.newTime).to.equal(73);
    expect(seekedTime).to.equal(73);
    expect(el.currentTime).to.equal(73);
    expect(el.percentComplete).to.equal(73);
  });

  it('handles transcript entry selection correctly', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = 0;
    var playCalled = false;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    audioElement.play = () => {
      playCalled = true;
    }

    el.duration = 100;

    const event = new CustomEvent('foo', { detail: { entry: entry3 }})

    setTimeout(() => { el.transcriptEntrySelected(event); });
    const response = await oneEvent(el, 'transcriptEntrySelected');

    expect(response.detail.newTime).to.equal(37);
    expect(seekedTime).to.equal(37);
    expect(playCalled).to.equal(true);
    expect(el.currentTime).to.equal(37);
  });

  it('skips music zone properly', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = 0;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    el.duration = 100;
    el.currentTime = 59;
    el.skipMusicZone();
    expect(seekedTime).to.equal(74.1);
  });

  it('does not skip music zone if not currently in one', async () => {
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
    const audioElement = el.shadowRoot.querySelector('audio-element');

    var seekedTime = -1;

    audioElement.seekTo = (time) => {
      seekedTime = time;
    }

    el.duration = 100;
    el.currentTime = 39;
    el.skipMusicZone();

    // seekTo is never called because we're not in a music zone
    expect(seekedTime).to.equal(-1);
    expect(el.currentTime).to.equal(39);
  });

  it('calls `skipMusicZone` if music skipping is enabled', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1, 17, 'foo', false);
    const entry2 = new TranscriptEntryConfig(1, 18, 37, '', true);
    const entry3 = new TranscriptEntryConfig(1, 37, 56, 'bar', false);
    const entry4 = new TranscriptEntryConfig(1, 57, 74, 'baz', true);
    const entry5 = new TranscriptEntryConfig(1, 75, 100, 'baz', false);
    const entries = [entry1, entry2, entry3, entry4, entry5];

    const transcriptConfig = new TranscriptConfig(entries);

    const el = await fixture(html`
      <radio-player
        .transcriptConfig=${transcriptConfig}
        skipMusicSections="true">
      </radio-player>
    `);

    var skipCalled = false;

    el.skipMusicZone = () => {
      skipCalled = true;
    }

    el.duration = 100;
    el.currentTime = 39;

    await promisedSleep(50);

    expect(skipCalled).to.equal(true);
  });

  it('properly generates QuickSearchEntry objects from config', async () => {
    const config = new RadioPlayerConfig('foo-title', 'bar-date', '', '', [], ['foo', 'bar', 'baz']);

    const el = await fixture(html`
      <radio-player
        .config=${config}>
      </radio-player>
    `);

    const quickSearches = el.quickSearches;

    expect(quickSearches[0].displayText).to.equal('foo');
    expect(quickSearches[1].displayText).to.equal('bar');
    expect(quickSearches[2].displayText).to.equal('baz');
  });

  it('retrieves search results properly from the transcript config', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1, 17, 'foo', false);
    const entry2 = new TranscriptEntryConfig(1, 18, 37, '', true);
    const entry3 = new TranscriptEntryConfig(1, 37, 56, 'bar', false, 0);
    const entry4 = new TranscriptEntryConfig(1, 57, 74, 'baz', true);
    const entry5 = new TranscriptEntryConfig(1, 75, 100, 'baz', false, 1);
    const entries = [entry1, entry2, entry3, entry4, entry5];

    const transcriptConfig = new TranscriptConfig(entries);

    const el = await fixture(html`
      <radio-player
        .transcriptConfig=${transcriptConfig}>
      </radio-player>
    `);

    const searchResults = el.searchResults;

    expect(searchResults[0].displayText).to.equal('bar');
    expect(searchResults[1].displayText).to.equal('baz');
  });

  it('retrieves no search results if there is no transcript config', async () => {
    const el = await fixture(html`
      <radio-player>
      </radio-player>
    `);

    expect(el.searchResults.length).to.equal(0);
  });

  it('properly updates the search results switcher when there are search results', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1, 17, 'foo', false);
    const entry2 = new TranscriptEntryConfig(1, 18, 37, '', true);
    const entry3 = new TranscriptEntryConfig(1, 37, 56, 'bar', false, 0);
    const entry4 = new TranscriptEntryConfig(1, 57, 74, 'baz', true);
    const entry5 = new TranscriptEntryConfig(1, 75, 100, 'baz', false, 1);
    const entries = [entry1, entry2, entry3, entry4, entry5];

    const transcriptConfig = new TranscriptConfig(entries);

    const el = await fixture(html`
      <radio-player
        .transcriptConfig=${transcriptConfig}>
      </radio-player>
    `);

    const searchResultsSwitcher = el.shadowRoot.querySelector('search-results-switcher');

    el.searchTerm = 'foo';
    el.updateSearchResultSwitcher();

    expect(el.shouldShowSearchResultSwitcher).to.equal(true);
    expect(searchResultsSwitcher.numberOfResults).to.equal(2);
  });


  it('properly updates the search results switcher when there are no search results', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1, 17, 'foo', false);
    const entry2 = new TranscriptEntryConfig(1, 18, 37, '', true);
    const entry3 = new TranscriptEntryConfig(1, 37, 56, 'bar', false);
    const entry4 = new TranscriptEntryConfig(1, 57, 74, 'baz', true);
    const entry5 = new TranscriptEntryConfig(1, 75, 100, 'baz', false);
    const entries = [entry1, entry2, entry3, entry4, entry5];

    const transcriptConfig = new TranscriptConfig(entries);

    const el = await fixture(html`
      <radio-player
        .transcriptConfig=${transcriptConfig}>
      </radio-player>
    `);

    const searchResultsSwitcher = el.shadowRoot.querySelector('search-results-switcher');

    el.searchTerm = 'foo';
    el.updateSearchResultSwitcher();

    expect(el.shouldShowNoSearchResultMessage).to.equal(true);
    expect(el.shouldShowSearchResultSwitcher).to.equal(false);
  });

});
