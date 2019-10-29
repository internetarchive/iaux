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

import './search-bar/search-bar';
import './quick-search';
import './search-results-switcher';

import { ZoneOfSilence } from '@internetarchive/waveform-progress';
import { PlaybackControls, PlaybackMode } from '@internetarchive/playback-controls';
import SearchResultsSwitcher from './search-results-switcher';
import MusicZone from './models/music-zone';
import RadioPlayerConfig from './models/radio-player-config';

@customElement('radio-player')
export default class RadioPlayer extends LitElement {
  @property({ type: RadioPlayerConfig }) config: RadioPlayerConfig | undefined = undefined;

  @property({ type: TranscriptConfig }) transcriptConfig: TranscriptConfig | undefined = undefined;

  @property({ type: Number }) currentTime = 0;

  @property({ type: String }) searchTerm = '';

  @property({ type: Boolean }) skipMusicSections = false;

  @property({ type: Number }) private percentComplete = 0;

  @property({ type: Boolean }) private isPlaying = false;

  @property({ type: Number }) private duration = 0;

  @property({ type: Number }) private playbackRate = 1;

  @property({ type: Number }) private volume = 1;

  @property({ type: Boolean }) private shouldShowSearchResultSwitcher = false;

  @property({ type: Boolean }) private shouldShowNoSearchResultMessage = false;

  private musicZones: MusicZone[] = [];

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

  play(): void {
    if (this.audioElement) this.audioElement.play();
  }

  pause(): void {
    if (this.audioElement) this.audioElement.pause();
  }

  seekTo(seconds: number): void {
    if (this.audioElement) this.audioElement.seekTo(seconds);
  }

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

  private get collectionLogoTemplate(): TemplateResult {
    return html`
      <img class="collection-logo" src=${this.logoUrl} />
    `;
  }

  private get logoUrl(): string {
    return this.config ? this.config.logoUrl : '';
  }

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

  private get zonesOfSilence(): ZoneOfSilence[] {
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

  private get waveformUrl(): string {
    return this.config ? this.config.waveformUrl : '';
  }

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

  private get audioSources(): AudioSource[] {
    return this.config ? this.config.audioSources : [];
  }

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

  private get scrubberBarMarkerPercentages(): number[] {
    const percentages: number[] = [0];
    this.zonesOfSilence.forEach(zone => {
      percentages.push(zone.startPercent);
      percentages.push(zone.endPercent);
    });
    percentages.push(100);
    return percentages;
  }

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

  private get transcriptViewTemplate(): TemplateResult {
    return html`
      <div class="transcript-container">
        <transcript-view
          .config=${this.transcriptConfig}
          .currentTime=${this.currentTime}
          @transcriptEntrySelected=${this.transcriptEntrySelected}
        >
        </transcript-view>
      </div>
    `;
  }

  private get searchSectionTemplate(): TemplateResult {
    // The mobile and desktop search sections work similarly, but the mobile version has
    // a dropdown area on it and the desktop version does not.
    // This is a case where the functionality is different enough to have two instances
    // of it instead of one and just show and hide them based on the media query.
    return html`
      <div class="search-section">
        <search-bar
          searchTerm=${this.searchTerm}
          .quickSearches=${this.quickSearches}
          @inputchange=${this.updateSearchTerm}
          @enterKeyPressed=${this.searchEnterKeyPressed}
          @searchCleared=${this.searchCleared}
        >
        </search-bar>
        <div class="search-results-info">
          ${this.searchResultsSwitcherTemplate} ${this.noSearchResultsTemplate}
        </div>
      </div>
    `;
  }

  private get searchResultsSwitcherTemplate(): TemplateResult {
    return html`
      <search-results-switcher
        class="${this.shouldShowSearchResultSwitcher ? '' : 'hidden'}"
        @searchResultIndexChanged=${this.searchResultIndexChanged}
      >
      </search-results-switcher>
    `;
  }

  private get noSearchResultsTemplate(): TemplateResult {
    return html`
      <div
        class="no-search-results-message ${this.shouldShowNoSearchResultMessage ? '' : 'hidden'}"
      >
        No search results.
      </div>
    `;
  }

  private get quickSearches(): string[] {
    return this.config ? this.config.quickSearches : [];
  }

  private updateSearchTerm(e: CustomEvent): void {
    this.searchTerm = e.detail.value;
  }

  private searchCleared(): void {
    this.searchTerm = '';
    this.emitSearchClearedEvent();
    if (this.transcriptView) {
      this.transcriptView.selectedSearchResultIndex = 0;
    }
    if (this.searchResultsSwitcher) {
      this.searchResultsSwitcher.currentResultIndex = 0;
    }
  }

  private emitSearchClearedEvent(): void {
    const event = new Event('searchCleared');
    this.dispatchEvent(event);
  }

  private searchResultIndexChanged(e: CustomEvent): void {
    if (!this.transcriptView) {
      return;
    }
    this.transcriptView.selectedSearchResultIndex = e.detail.searchResultIndex;
    this.transcriptView.scrollToSelectedSearchResult();
  }

  private searchEnterKeyPressed(e: CustomEvent): void {
    const event = new CustomEvent('searchRequested', {
      detail: { searchTerm: e.detail.value },
    });
    this.dispatchEvent(event);
  }

  private get transcriptEntries(): TranscriptEntryConfig[] {
    return this.transcriptConfig ? this.transcriptConfig.entries : [];
  }

  private get transcriptView(): TranscriptView | null {
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('transcript-view') as TranscriptView)
      : null;
  }

  private get audioElement(): AudioElement | null {
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('audio-element') as AudioElement)
      : null;
  }

  private get playbackControls(): PlaybackControls | null {
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('playback-controls') as PlaybackControls)
      : null;
  }

  private get searchResultsSwitcher(): SearchResultsSwitcher | null {
    return this.shadowRoot
      ? (this.shadowRoot.querySelector('search-results-switcher') as SearchResultsSwitcher)
      : null;
  }

  private changePlaybackRate(e: CustomEvent): void {
    this.playbackRate = e.detail.playbackRate;
  }

  private volumeChanged(e: CustomEvent): void {
    this.volume = e.detail.volume;
  }

  private backButtonHandler(): void {
    if (this.audioElement) {
      this.audioElement.seekBy(-10);
    }
  }

  private playPauseButtonHandler(): void {
    this.isPlaying = !this.isPlaying;
    if (!this.audioElement) {
      return;
    }
    if (this.isPlaying) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

  private forwardButtonHandler(): void {
    if (this.audioElement) {
      this.audioElement.seekBy(10);
    }
  }

  private nextSectionButtonHandler(): void {
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

  private prevSectionButtonHandler(): void {
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

  private handleDurationChange(e: CustomEvent): void {
    this.duration = e.detail.duration;
  }

  private handleTimeChange(e: CustomEvent): void {
    this.currentTime = e.detail.currentTime;
    const percent = this.currentTime / this.duration;
    this.percentComplete = percent * 100;
  }

  private emitCurrentTimeChangedEvent(): void {
    const event = new CustomEvent('currentTimeChanged', {
      detail: { currentTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

  private playbackPaused(): void {
    this.isPlaying = false;
    if (this.playbackControls) {
      this.playbackControls.playbackMode = PlaybackMode.paused;
    }
    const event = new Event('playbackPaused');
    this.dispatchEvent(event);
  }

  private playbackStarted(): void {
    this.isPlaying = true;
    if (this.playbackControls) {
      this.playbackControls.playbackMode = PlaybackMode.playing;
    }
    const event = new Event('playbackStarted');
    this.dispatchEvent(event);
  }

  private canplay(): void {
    const event: Event = new Event('canplay');
    this.dispatchEvent(event);
  }

  private valueChangedFromScrub(e: CustomEvent): void {
    const percentage = e.detail.value;
    const newTime = this.duration * (percentage / 100);
    this.currentTime = newTime;
    if (this.audioElement) {
      this.audioElement.seekTo(newTime);
    }
    this.percentComplete = percentage;
    const event = new CustomEvent('timeChangedFromScrub', {
      detail: { newTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

  private transcriptEntrySelected(e: CustomEvent): void {
    const newTime = e.detail.entry.start;
    this.currentTime = newTime;
    if (this.audioElement) {
      this.audioElement.seekTo(newTime);
      this.audioElement.play();
    }
    const event = new CustomEvent('transcriptEntrySelected', {
      detail: { newTime: this.currentTime },
    });
    this.dispatchEvent(event);
  }

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

  private checkForMusicZone(): void {
    // eslint-disable-next-line max-len
    const activeMusicZone: MusicZone | undefined = this.musicZones.find(
      (zone: MusicZone) => this.currentTime > zone.start && this.currentTime < zone.end,
    );

    if (activeMusicZone && this.audioElement) {
      this.audioElement.seekTo(activeMusicZone.end + 0.1);
    }
  }

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
      if (this.searchResultsSwitcher) {
        this.searchResultsSwitcher.numberOfResults = resultCount;
      }
    }
  }

  private get searchResults(): TranscriptEntryConfig[] {
    return this.transcriptConfig ? this.transcriptConfig.searchResults : [];
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('transcriptConfig')) {
      this.updateMusicZones();
      this.updateSearchResultSwitcher();
    }

    if (changedProperties.has('currentTime')) {
      this.emitCurrentTimeChangedEvent();
      if (this.skipMusicSections) {
        this.checkForMusicZone();
      }
    }
  }

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
          -ms-grid-row: 5;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .title-date {
          -ms-grid-row: 1;
          -ms-grid-column: 3;
        }
        .transcript-container {
          -ms-grid-row: 9;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .collection-logo {
          -ms-grid-row: 1;
          -ms-grid-column: 1;
        }
        .waveform-scrubber-container {
          -ms-grid-row: 3;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
        }
        .search-section {
          -ms-grid-row: 7;
          -ms-grid-column: 1;
          -ms-grid-column-span: 3;
          width: 75%;
          margin: auto;
        }
        search-bar {
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
          -ms-grid-row: 1;
          -ms-grid-column: 1;
          -ms-grid-column-span: 7;
        }
        transcript-view {
          --timeDisplay: block;
        }
        playback-controls {
          -ms-grid-row: 3;
          -ms-grid-column: 5;
          -ms-grid-column-span: 1;
        }
        .transcript-container {
          -ms-grid-row: 5;
          -ms-grid-column: 3;
          -ms-grid-column-span: 5;
        }
        .collection-logo {
          -ms-grid-row: 3;
          -ms-grid-column: 1;
        }
        .waveform-scrubber-container {
          -ms-grid-row: 3;
          -ms-grid-column: 7;
          -ms-grid-column-span: 1;
        }
        .search-section {
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

      search-bar {
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
