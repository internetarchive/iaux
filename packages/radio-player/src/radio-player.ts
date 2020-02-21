/* eslint-disable import/no-duplicates */
import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues,
} from 'lit-element';
import { AudioElement, AudioSource } from '@internetarchive/audio-element';
import {
  TranscriptConfig,
  TranscriptEntryConfig,
  TranscriptView,
} from '@internetarchive/transcript-view';

import '@internetarchive/waveform-progress';
import '@internetarchive/playback-controls';
import '@internetarchive/scrubber-bar';

import { QuickSearchEntry } from '@internetarchive/expandable-search-bar';
import '@internetarchive/expandable-search-bar';

import './search-results-switcher';

import { ZoneOfSilence } from '@internetarchive/waveform-progress';
import { PlaybackControls, PlaybackMode } from '@internetarchive/playback-controls';
import SearchResultsSwitcher from './search-results-switcher';
import MusicZone from './models/music-zone';
import RadioPlayerConfig from './models/radio-player-config';
import SearchHandler from './search-handler/search-handler';

/**
 * A Radio Player element to play back transcribed audio.
 *
 * It is responsible for orchestrating all of the other components like:
 * - Waveform Progress
 * - Scrubber Bar
 * - Playback Controls
 * - Transcript View
 * - Audio Element
 * - Search Bar
 *
 * @export
 * @class RadioPlayer
 * @extends {LitElement}
 */
@customElement('radio-player')
export default class RadioPlayer extends LitElement {
  /**
   * Radio player configuration
   *
   * @type {(RadioPlayerConfig | undefined)}
   * @memberof RadioPlayer
   */
  @property({ type: Object }) config: RadioPlayerConfig | undefined = undefined;

  /**
   * Transcript configuration
   *
   * @type {(TranscriptConfig | undefined)}
   * @memberof RadioPlayer
   */
  @property({ type: Object }) transcriptConfig: TranscriptConfig | undefined = undefined;

  /**
   * Search result transcript. It's also a `TranscriptConfig` object, but is broken up by
   * transcript entries as well as search results.
   *
   * If this is set, the transcript view, uses this, otherwise it uses `transcriptConfig`
   *
   * @type {(TranscriptConfig | undefined)}
   * @memberof RadioPlayer
   */
  @property({ type: Object }) searchResultsTranscript: TranscriptConfig | undefined = undefined;

  /**
   * Current playback time
   *
   * @type {number}
   * @memberof RadioPlayer
   */
  @property({ type: Number }) currentTime = 0;

  /**
   * Current search term
   *
   * @type {string}
   * @memberof RadioPlayer
   */
  @property({ type: String }) searchTerm = '';

  /**
   * Flag to determine whether or not to skip the music sections
   *
   * @type {boolean}
   * @memberof RadioPlayer
   */
  @property({ type: Boolean }) skipMusicSections = false;

  /**
   * Percent of playback that is complete
   *
   * @private
   * @type {number}
   * @memberof RadioPlayer
   */
  @property({ type: Number }) private percentComplete = 0;

  /**
   * Flag for whether or not the radio player is playing
   *
   * @private
   * @type {boolean}
   * @memberof RadioPlayer
   */
  @property({ type: Boolean }) private isPlaying = false;

  /**
   * Duration of the audio file
   *
   * @private
   * @type {number}
   * @memberof RadioPlayer
   */
  @property({ type: Number }) private duration = 0;

  /**
   * The playback rate where 1 is "normal", 0 is paused, 2 is twice as fase
   *
   * @private
   * @type {number}
   * @memberof RadioPlayer
   */
  @property({ type: Number }) private playbackRate = 1;

  /**
   * Volume from 0 to 1
   *
   * @private
   * @type {number}
   * @memberof RadioPlayer
   */
  @property({ type: Number }) private volume = 1;

  /**
   * Flag for whether we should show the search results switcher
   *
   * @private
   * @type {boolean}
   * @memberof RadioPlayer
   */
  @property({ type: Boolean }) private shouldShowSearchResultSwitcher = false;

  /**
   * Flag for whether we should show the 'no results' message
   *
   * @private
   * @type {boolean}
   * @memberof RadioPlayer
   */
  @property({ type: Boolean }) private shouldShowNoSearchResultMessage = false;

  private musicZones: MusicZone[] = [];

  private searchHandler: SearchHandler | undefined;

  /**
   * LitElement lifecycle main render method
   *
   * @returns {TemplateResult}
   * @memberof RadioPlayer
   */
  render(): TemplateResult {
    return html`
      ${this.audioElementTemplate}
      <section role="main">
        ${this.titleDateTemplate} ${this.collectionLogoTemplate} ${this.playbackControlsTemplate}
        <div class="waveform-scrubber-container">
          ${this.waveFormProgressTemplate} ${this.scrubberBarTemplate}
        </div>
        ${this.searchSectionTemplate} ${this.transcriptViewTemplate}
      </section>
    `;
  }

  /**
   * Start playback
   *
   * @memberof RadioPlayer
   */
  play(): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.play();
  }

  /**
   * Pause playback
   *
   * @memberof RadioPlayer
   */
  pause(): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.pause();
  }

  /**
   * Seek audio to given number of seconds
   *
   * @param {number} seconds
   * @memberof RadioPlayer
   */
  seekTo(seconds: number): void {
    /* istanbul ignore else */
    if (this.audioElement) this.audioElement.seekTo(seconds);
  }

  /**
   * Generate markup for the title and date view sections
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get titleDateTemplate(): TemplateResult {
    return html`
      <div class="title-date">
        <div class="title">
          ${this.config ? this.config.title : ''}
        </div>

        <div class="date">
          ${this.config ? this.config.date : ''}
        </div>
      </div>
    `;
  }

  /**
   * Generate markup for the logo element
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get collectionLogoTemplate(): TemplateResult {
    return html`
      <img class="collection-logo" src=${this.logoUrl} />
    `;
  }

  /**
   * Return the logoUrl from the config if provided
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof RadioPlayer
   */
  private get logoUrl(): string {
    return this.config ? this.config.logoUrl : '';
  }

  /**
   * Generate the markup for the waveform progress element
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get waveFormProgressTemplate(): TemplateResult {
    return html`
      <waveform-progress
        interactive="true"
        .waveformUrl=${this.waveformUrl}
        .percentComplete=${this.percentComplete}
        @valuechange=${this.valueChangedFromScrub}
      >
      </waveform-progress>
    `;
  }

  /**
   * Generate an array of `ZoneOfSilence` models for the waveform progress element
   *
   * It does this by parsing the transcript for music sections and converting
   * those music sections to zones of silence.
   *
   * @readonly
   * @private
   * @type {ZoneOfSilence[]}
   * @memberof RadioPlayer
   */
  private get zonesOfSilence(): ZoneOfSilence[] {
    /* istanbul ignore else */
    if (this.duration === 0) {
      return [];
    }

    // eslint-disable-next-line max-len
    const musicEntries: TranscriptEntryConfig[] = this.transcriptEntries.filter(
      (entry: TranscriptEntryConfig) => entry.isMusic === true,
    );

    const zonesOfSilence: ZoneOfSilence[] = musicEntries.map((entry: TranscriptEntryConfig) => {
      const startPercent: number = (entry.start / this.duration) * 100;
      const endPercent: number = (entry.end / this.duration) * 100;
      return new ZoneOfSilence(startPercent, endPercent);
    });

    return zonesOfSilence;
  }

  /**
   * Return the waveform url from the configuration
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof RadioPlayer
   */
  private get waveformUrl(): string {
    return this.config ? this.config.waveformUrl : '';
  }

  /**
   * Generate the audio element markup
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get audioElementTemplate(): TemplateResult {
    return html`
      <audio-element
        .sources=${this.audioSources}
        .playbackRate=${this.playbackRate}
        .volume=${this.volume}
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @playbackStarted=${this.playbackStarted}
        @playbackPaused=${this.playbackPaused}
        @canplay=${this.canplay}
      >
      </audio-element>
    `;
  }

  /**
   * Return the audio sources from the configuration
   *
   * @readonly
   * @private
   * @type {AudioSource[]}
   * @memberof RadioPlayer
   */
  private get audioSources(): AudioSource[] {
    return this.config ? this.config.audioSources : [];
  }

  /**
   * Generate markup for the playback controls
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get playbackControlsTemplate(): TemplateResult {
    return html`
      <playback-controls
        @back-button-pressed=${this.backButtonHandler}
        @play-pause-button-pressed=${this.playPauseButtonHandler}
        @forward-button-pressed=${this.forwardButtonHandler}
        @volumeChange=${this.volumeChanged}
        @playbackRateChange=${this.changePlaybackRate}
        @next-section-button-pressed=${this.nextSectionButtonHandler}
        @prev-section-button-pressed=${this.prevSectionButtonHandler}
      >
      </playback-controls>
    `;
  }

  /**
   * Generate an array of start and end points for each of the music zones.
   * This allows us to show the markers on the scrubber bar and optionally skip those sections.
   *
   * @readonly
   * @private
   * @type {number[]}
   * @memberof RadioPlayer
   */
  private get scrubberBarMarkerPercentages(): number[] {
    const percentages: number[] = [0];
    this.zonesOfSilence.forEach(zone => {
      percentages.push(zone.startPercent);
      percentages.push(zone.endPercent);
    });
    percentages.push(100);
    return percentages;
  }

  /**
   * Generate markup for the scrubber bar
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get scrubberBarTemplate(): TemplateResult {
    return html`
      <scrubber-bar
        .sectionMarkerPercentages=${this.scrubberBarMarkerPercentages}
        .value=${this.percentComplete}
        @valuechange=${this.valueChangedFromScrub}
      >
      </scrubber-bar>
    `;
  }

  /**
   * Generate markup for the transcript view
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get transcriptViewTemplate(): TemplateResult {
    return html`
      <div class="transcript-container">
        <transcript-view
          .config=${this.currentTranscript}
          .currentTime=${this.currentTime}
          @transcriptEntrySelected=${this.transcriptEntrySelected}
        >
        </transcript-view>
      </div>
    `;
  }

  private get currentTranscript(): TranscriptConfig | undefined {
    return this.searchResultsTranscript || this.transcriptConfig;
  }

  /**
   * Generate markup for search section
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get searchSectionTemplate(): TemplateResult {
    return html`
      <div class="search-section">
        <expandable-search-bar
          searchTerm=${this.searchTerm}
          .quickSearches=${this.quickSearches}
          @inputchange=${this.updateSearchTerm}
          @enterKeyPressed=${this.searchEnterKeyPressed}
          @searchCleared=${this.searchCleared}
        >
        </expandable-search-bar>
        <div class="search-results-info">
          ${this.searchResultsSwitcherTemplate} ${this.noSearchResultsTemplate}
        </div>
      </div>
    `;
  }

  /**
   * Generate markup for the search results switcher
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get searchResultsSwitcherTemplate(): TemplateResult {
    return html`
      <search-results-switcher
        class="${this.shouldShowSearchResultSwitcher ? '' : 'hidden'}"
        @searchResultIndexChanged=${this.searchResultIndexChanged}
      >
      </search-results-switcher>
    `;
  }

  /**
   * Generate markup for the "No Search Results" message
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof RadioPlayer
   */
  private get noSearchResultsTemplate(): TemplateResult {
    return html`
      <div
        class="no-search-results-message ${this.shouldShowNoSearchResultMessage ? '' : 'hidden'}"
      >
        No search results.
      </div>
    `;
  }

  /**
   * Generate an array of `QuickSearchEntry` objects based on the quick search
   * configuration passed in.
   *
   * @readonly
   * @private
   * @type {QuickSearchEntry[]}
   * @memberof RadioPlayer
   */
  private get quickSearches(): QuickSearchEntry[] {
    if (!this.config) {
      return [];
    }

    const entries: QuickSearchEntry[] = this.config.quickSearches.map(
      entry => new QuickSearchEntry(entry),
    );

    return entries;
  }

  /**
   * Update the local search term when the SearchBar widget gets updated and emits the event
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private updateSearchTerm(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.value) {
      return;
    }
    const searchTerm = detail.value;
    this.searchTerm = searchTerm;
    this.emitSearchTermChangedEvent(searchTerm);
  }

  /**
   * Triggered when the user clicks the clear search button in the search bar.
   * Clean up all of the search info and reset to the base transcript.
   *
   * @private
   * @memberof RadioPlayer
   */
  private searchCleared(): void {
    this.searchTerm = '';
    this.searchResultsTranscript = undefined;
    this.emitSearchClearedEvent();
    this.emitSearchTermChangedEvent('');
    /* istanbul ignore else */
    if (this.transcriptView) {
      this.transcriptView.selectedSearchResultIndex = 0;
    }
    /* istanbul ignore else */
    if (this.searchResultsSwitcher) {
      this.searchResultsSwitcher.currentResultIndex = 0;
    }
  }

  /**
   * Triggered when the user scrubs through search result indices so we can coordinate
   * the UI updates like scrolling the transcript view
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private searchResultIndexChanged(e: CustomEvent): void {
    const detail = e.detail || {};
    const { searchResultIndex } = detail;
    if (searchResultIndex === undefined || !this.transcriptView) {
      return;
    }
    this.transcriptView.selectedSearchResultIndex = searchResultIndex;
    this.transcriptView.scrollToSelectedSearchResult();
  }

  /**
   * Triggered when the user presses enter in the search bar so we can trigger a search.
   *
   * @private
   * @param {CustomEvent} e
   * @memberof RadioPlayer
   */
  private searchEnterKeyPressed(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.value) {
      return;
    }
    this.executeSearch(detail.value);
  }

  private executeSearch(term: string): void {
    if (!this.searchHandler || term.length < 2) {
      this.searchResultsTranscript = undefined;
      return;
    }
    this.searchResultsTranscript = this.searchHandler.search(term);
  }

  /**
   * Return transcript entries from the transcript configuration
   *
   * @readonly
   * @private
   * @type {TranscriptEntryConfig[]}
   * @memberof RadioPlayer
   */
  private get transcriptEntries(): TranscriptEntryConfig[] {
    return this.currentTranscript ? this.currentTranscript.entries : [];
  }

  /**
   * Return the transcript view DOM element
   *
   * @readonly
   * @private
   * @type {(TranscriptView | null)}
   * @memberof RadioPlayer
   */
  private get transcriptView(): TranscriptView | null {
    /* istanbul ignore next */
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('transcript-view') as TranscriptView)
      : null;
  }

  /**
   * Return the audio element DOM element
   *
   * @readonly
   * @private
   * @type {(AudioElement | null)}
   * @memberof RadioPlayer
   */
  private get audioElement(): AudioElement | null {
    /* istanbul ignore next */
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('audio-element') as AudioElement)
      : null;
  }

  /**
   * Return the playback controls DOM element
   *
   * @readonly
   * @private
   * @type {(PlaybackControls | null)}
   * @memberof RadioPlayer
   */
  private get playbackControls(): PlaybackControls | null {
    /* istanbul ignore next */
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('playback-controls') as PlaybackControls)
      : null;
  }

  /**
   * Return the search results switcher DOM element
   *
   * @readonly
   * @private
   * @type {(SearchResultsSwitcher | null)}
   * @memberof RadioPlayer
   */
  private get searchResultsSwitcher(): SearchResultsSwitcher | null {
    /* istanbul ignore next */
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('search-results-switcher') as SearchResultsSwitcher)
      : null;
  }

  /**
   * Triggered when the user changes the playback rate so we can update the audio element
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private changePlaybackRate(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.playbackRate) {
      return;
    }
    this.playbackRate = detail.playbackRate;
  }

  /**
   * Triggered when the user changes the volume from the playback controls
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private volumeChanged(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.volume) {
      return;
    }
    this.volume = e.detail.volume;
  }

  /**
   * Triggered when the user presses the back button in the playback controls
   *
   * @private
   * @memberof RadioPlayer
   */
  private backButtonHandler(): void {
    /* istanbul ignore else */
    if (this.audioElement) {
      this.audioElement.seekBy(-10);
    }
  }

  /**
   * Triggered when the user presses the play/pause button
   *
   * @private
   * @returns {void}
   * @memberof RadioPlayer
   */
  private playPauseButtonHandler(): void {
    this.isPlaying = !this.isPlaying;
    /* istanbul ignore if */
    if (!this.audioElement) {
      return;
    }
    if (this.isPlaying) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

  /**
   * Triggered when the user presses the forward button in the playback controls
   *
   * @private
   * @memberof RadioPlayer
   */
  private forwardButtonHandler(): void {
    /* istanbul ignore else */
    if (this.audioElement) {
      this.audioElement.seekBy(10);
    }
  }

  /**
   * Skip to the next section
   *
   * @private
   * @returns {void}
   * @memberof RadioPlayer
   */
  private nextSectionButtonHandler(): void {
    /* istanbul ignore if */
    if (!this.audioElement) {
      return;
    }
    const percentsGreaterThanValue: number[] = this.scrubberBarMarkerPercentages.filter(
      value => value > this.percentComplete + 0.1,
    );
    const closestUpper = Math.min(...percentsGreaterThanValue);
    const seekTo: number = this.duration * (closestUpper / 100) + 0.1;
    this.audioElement.seekTo(seekTo);
  }

  /**
   * Jump to the previous section
   *
   * @private
   * @returns {void}
   * @memberof RadioPlayer
   */
  private prevSectionButtonHandler(): void {
    /* istanbul ignore if */
    if (!this.audioElement) {
      return;
    }
    const percentsLessThanValue: number[] = this.scrubberBarMarkerPercentages.filter(
      value => value < this.percentComplete - 0.1,
    );
    const closestLower = Math.max(...percentsLessThanValue);
    const seekTo: number = this.duration * (closestLower / 100) - 0.1;
    this.audioElement.seekTo(seekTo);
  }

  /**
   * Handle the duration change event like when the audio file first loads
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private handleDurationChange(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.duration) {
      return;
    }
    this.duration = detail.duration;
  }

  /**
   * Triggered as the playback progresses in the audio element
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private handleTimeChange(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.currentTime) {
      return;
    }

    this.currentTime = detail.currentTime;
    const percent = this.currentTime / this.duration;
    this.percentComplete = percent * 100;
  }

  /**
   * Update any consumers that the current time has changed
   *
   * @private
   * @memberof RadioPlayer
   */
  private emitCurrentTimeChangedEvent(): void {
    const event = new CustomEvent('currentTimeChanged', {
      detail: { currentTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

  /**
   * When the user clears the search, we want to bubble up the event to other consumers.
   *
   * @private
   * @memberof RadioPlayer
   */
  private emitSearchClearedEvent(): void {
    const event = new Event('searchCleared');
    this.dispatchEvent(event);
  }

  private emitSearchTermChangedEvent(term: string): void {
    const event = new CustomEvent('searchTermChanged', {
      detail: { searchTerm: term },
    });
    this.dispatchEvent(event);
  }

  /**
   * Handle the playback paused event
   *
   * @private
   * @memberof RadioPlayer
   */
  private playbackPaused(): void {
    this.isPlaying = false;
    /* istanbul ignore else */
    if (this.playbackControls) {
      this.playbackControls.playbackMode = PlaybackMode.paused;
    }
    const event = new Event('playbackPaused');
    this.dispatchEvent(event);
  }

  /**
   * Handle the playback started event
   *
   * @private
   * @memberof RadioPlayer
   */
  private playbackStarted(): void {
    this.isPlaying = true;
    /* istanbul ignore else */
    if (this.playbackControls) {
      this.playbackControls.playbackMode = PlaybackMode.playing;
    }
    const event = new Event('playbackStarted');
    this.dispatchEvent(event);
  }

  /**
   * Emits a `canplay` event when the media is ready to be played
   *
   * @private
   * @memberof RadioPlayer
   */
  private canplay(): void {
    const event: Event = new Event('canplay');
    this.dispatchEvent(event);
  }

  /**
   * Triggered when the user scrubs the scrubber bar or waveform progress bar
   *
   * Handles updating the audioElement to the new time and emitting an event
   * that the time changed
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private valueChangedFromScrub(e: CustomEvent): void {
    const detail = e.detail || {};
    if (!detail.value) {
      return;
    }

    const percentage = detail.value;
    const newTime = this.duration * (percentage / 100);
    this.currentTime = newTime;
    /* istanbul ignore else */
    if (this.audioElement) {
      this.audioElement.seekTo(newTime);
    }
    this.percentComplete = percentage;
    const event = new CustomEvent('timeChangedFromScrub', {
      detail: { newTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

  /**
   * Triggered when the user selects a transcript entry.
   * Allows it to jump to that spot in the playback.
   *
   * @private
   * @param {CustomEvent} e
   * @returns {void}
   * @memberof RadioPlayer
   */
  private transcriptEntrySelected(e: CustomEvent): void {
    const detail = e.detail || {};
    const entry = detail.entry || {};
    if (!entry.start) {
      return;
    }

    const newTime = entry.start;
    this.currentTime = newTime;
    /* istanbul ignore else */
    if (this.audioElement) {
      this.audioElement.seekTo(newTime);
      this.audioElement.play();
    }
    const event = new CustomEvent('transcriptEntrySelected', {
      detail: { newTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

  /**
   * Creates the music zones based on the transcript so we know when to skip past sections
   *
   * @private
   * @memberof RadioPlayer
   */
  private updateMusicZones(): void {
    // eslint-disable-next-line max-len
    const musicEntries: TranscriptEntryConfig[] = this.transcriptEntries.filter(
      (entry: TranscriptEntryConfig) => entry.isMusic === true,
    );

    // eslint-disable-next-line max-len
    const musicZones: MusicZone[] = musicEntries.map(
      (entry: TranscriptEntryConfig) => new MusicZone(entry.start, entry.end),
    );

    this.musicZones = musicZones;
  }

  /**
   * Skips a music zone if enabled
   *
   * @private
   * @memberof RadioPlayer
   */
  private skipMusicZone(): void {
    // eslint-disable-next-line max-len
    const activeMusicZone: MusicZone | undefined = this.musicZones.find(
      (zone: MusicZone) => this.currentTime > zone.start && this.currentTime < zone.end,
    );

    if (activeMusicZone && this.audioElement) {
      this.audioElement.seekTo(activeMusicZone.end + 0.1);
    }
  }

  /**
   * Updates the search results switcher numbers
   *
   * @private
   * @returns {void}
   * @memberof RadioPlayer
   */
  private updateSearchResultSwitcher(): void {
    this.shouldShowNoSearchResultMessage = false;
    this.shouldShowSearchResultSwitcher = false;

    if (this.searchTerm.length === 0) {
      return;
    }

    const resultCount: number = this.searchResults.length;

    if (resultCount === 0) {
      this.shouldShowNoSearchResultMessage = true;
    } else {
      this.shouldShowSearchResultSwitcher = true;
      /* istanbul ignore else */
      if (this.searchResultsSwitcher) {
        this.searchResultsSwitcher.numberOfResults = resultCount;
      }
    }
  }

  /**
   * Returns the search result template entries from the transcript config
   *
   * @readonly
   * @private
   * @type {TranscriptEntryConfig[]}
   * @memberof RadioPlayer
   */
  private get searchResults(): TranscriptEntryConfig[] {
    return this.searchResultsTranscript ? this.searchResultsTranscript.searchResults : [];
  }

  /**
   * LitElement life cycle event when any reactive property gets updated
   *
   * @param {PropertyValues} changedProperties
   * @memberof RadioPlayer
   */
  updated(changedProperties: PropertyValues): void {
    // when the transcriptConfig gets changed, reload the music zones and search results switcher
    if (changedProperties.has('transcriptConfig')) {
      this.updateMusicZones();
      this.setupSearchHandler();
    }

    if (changedProperties.has('searchResultsTranscript')) {
      this.updateSearchResultSwitcher();
    }

    if (changedProperties.has('searchTerm')) {
      this.executeSearch(this.searchTerm);
    }

    // as the currentTime gets updated, emit an event and skip the music zone if enabled
    if (changedProperties.has('currentTime')) {
      this.emitCurrentTimeChangedEvent();
      if (this.skipMusicSections) {
        this.skipMusicZone();
      }
    }
  }

  private setupSearchHandler(): void {
    if (this.transcriptConfig) {
      this.searchHandler = new SearchHandler(this.transcriptConfig);
    }
    if (this.searchTerm) {
      this.executeSearch(this.searchTerm);
    }
  }

  /**
   * Component styles
   *
   * @readonly
   * @static
   * @type {CSSResult}
   * @memberof RadioPlayer
   */
  static get styles(): CSSResult {
    const collectionLogoMaxHeightCss = css`var(--collectionLogoMaxHeight, 8rem)`;

    const titleColorCss = css`var(--titleColor, white)`;
    const titleFontCss = css`var(--titleFont, 1.5em sans-serif)`;

    const dateColorCss = css`var(--dateColor, white)`;
    const dateFontCss = css`var(--dateFont, 1em sans-serif)`;

    const waveformProgressHeightCss = css`var(--waveformProgressHeight, 5rem)`;

    return css`
      section[role='main'] {
        display: -ms-grid;
        display: grid;
        grid-gap: 0.5rem;
      }

      /* mobile view */
      @media (max-width: 770px) {
        section[role='main'] {
          -ms-grid-columns: 25% 0.5rem 1fr;
          -ms-grid-rows: auto 0.5rem auto 0.5rem auto 0.5rem auto 0.5rem auto;
          grid-template-columns: 25% 1fr;
          grid-template-areas:
            'collection-logo title-date'
            'waveform-scrubber waveform-scrubber'
            'playback-controls playback-controls'
            'search-section search-section'
            'transcript-container transcript-container';
        }
        .date {
          text-align: left;
        }
        transcript-view {
          --timeDisplay: none;
        }
        playback-controls {
          width: 75%;
          margin: auto;
          grid-row: 5;
          grid-column: 1;
          -ms-grid-row: 5;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .title-date {
          grid-row: 1;
          grid-column: 3;
          -ms-grid-row: 1;
          -ms-grid-column: 3;
        }
        .transcript-container {
          grid-row: 9;
          grid-column: 1;
          -ms-grid-row: 9;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .collection-logo {
          grid-row: 1;
          grid-column: 1;
          -ms-grid-row: 1;
          -ms-grid-column: 1;
        }
        .waveform-scrubber-container {
          grid-row: 3;
          grid-column: 1;
          -ms-grid-row: 3;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .search-section {
          grid-row: 7;
          grid-column: 1;
          -ms-grid-row: 7;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
          width: 75%;
          margin: auto;
        }
        expandable-search-bar {
          width: 100%;
        }
      }

      /* wide view */
      @media (min-width: 770px) {
        section[role='main'] {
          -ms-grid-columns: 192px 0.5rem 0 0.5rem 250px 0.5rem 1fr;
          -ms-grid-rows: auto 0.5rem auto 0.5rem auto;
          grid-template-columns: 192px 0 250px 1fr;
          grid-template-areas:
            'title-date title-date title-date title-date'
            'collection-logo 1 playback-controls waveform-scrubber'
            'search-section transcript-container transcript-container transcript-container';
        }
        .title-date {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          grid-row: 1;
          grid-column: 1;
          -ms-grid-row: 1;
          -ms-grid-column: 1;
          -ms-grid-column-span: 7;
        }
        transcript-view {
          --timeDisplay: block;
        }
        playback-controls {
          grid-row: 3;
          grid-column: 5;
          -ms-grid-row: 3;
          -ms-grid-column: 5;
          -ms-grid-column-span: 1;
        }
        .transcript-container {
          grid-row: 5;
          grid-column: 3;
          -ms-grid-row: 5;
          -ms-grid-column: 3;
          -ms-grid-column-span: 5;
        }
        .collection-logo {
          grid-row: 3;
          grid-column: 1;
          -ms-grid-row: 3;
          -ms-grid-column: 1;
        }
        .waveform-scrubber-container {
          grid-row: 3;
          grid-column: 7;
          -ms-grid-row: 3;
          -ms-grid-column: 7;
          -ms-grid-column-span: 1;
        }
        .search-section {
          grid-row: 5;
          grid-column: 1;
          -ms-grid-row: 5;
          -ms-grid-column: 1;
          -ms-grid-column-span: 1;
        }
      }

      .title-date {
        grid-area: title-date;
      }

      .title {
        color: ${titleColorCss};
        font: ${titleFontCss};
      }

      .date {
        color: ${dateColorCss};
        font: ${dateFontCss};
      }

      waveform-progress {
        width: 100%;
        height: ${waveformProgressHeightCss};
      }

      playback-controls {
        grid-area: playback-controls;
      }

      .transcript-container {
        grid-area: transcript-container;
      }

      transcript-view {
        max-width: 600px;
        display: block;
      }

      .collection-logo {
        width: 100%;
        max-height: ${collectionLogoMaxHeightCss};
        object-fit: contain;
        grid-area: collection-logo;
        align-self: center;
      }

      .waveform-scrubber-container {
        width: 100%;
        height: 100%;
        grid-area: waveform-scrubber;
      }

      .search-section {
        grid-area: search-section;
      }

      .search-results-info {
        margin-top: 0.5em;
      }

      .quick-search-container {
        max-height: 150px;
        overflow-y: scroll;
        scrollbar-width: none;
        margin: 0 0.5em;
      }

      .quick-search-container::-webkit-scrollbar {
        display: none;
      }

      expandable-search-bar {
        display: block;
        margin: auto;
      }

      .no-search-results-message {
        text-align: center;
      }

      .hidden {
        display: none;
      }
    `;
  }
}
