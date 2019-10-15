import { LitElement, html, customElement, TemplateResult, property } from 'lit-element';

/* eslint-disable */

import { AudioSource } from '@internetarchive/audio-element';
import {
  TranscriptConfig,
  TranscriptEntryConfig,
  TranscriptView,
} from '@internetarchive/transcript-view';

import transcript from './transcript3.js';
// prettier-ignore
import '../src/radio-player';
import RadioPlayer from '../src/radio-player';
import RadioPlayerConfig from '../src/models/radio-player-config';

@customElement('radio-player-controller')
export default class RadioPlayerController extends LitElement {
  @property({ type: Number }) currentTime = 0;

  @property({ type: String }) searchTerm = '';

  private startPlaybackAt: number | undefined = undefined;

  render(): TemplateResult {
    return html`
      <radio-player
        .config=${this.radioPlayerConfig}
        .transcriptConfig=${this.baseTranscriptConfig}
        @searchRequested=${this.searchRequested}
        @searchCleared=${this.searchCleared}
        @playbackPaused=${this.playbackPaused}
        @currentTimeChanged=${this.currentTimeChanged}
        @timeChangedFromScrub=${this.timeChangedFromScrub}
        @transcriptEntrySelected=${this.transcriptEntrySelected}
        @canplay=${this.canplay}
      >
      </radio-player>
    `;
  }

  private get radioPlayerConfig(): RadioPlayerConfig {
    const audioSource = new AudioSource(
      'https://ia803005.us.archive.org/30/items/BBC_Radio_2_20190502_180000/BBC_Radio_2_20190502_180000.mp3',
      'audio/mpeg',
    );

    const quickSearchTerms = [
      'International relations',
      'International law',
      'Birth control',
      'Sports terminology',
      'Training',
      'Human rights',
      'Economics',
      'Law',
      'Geography terminology',
      'IOS software',
      'American football terminology',
      'Android (operating system) software',
      "Women's National Basketball Association teams",
      'Olympic medals',
      'Gold',
      'Orders, decorations, and medals',
      'Connecticut',
      'Abuse',
      'Personhood',
      'Culture',
      'Google',
      'BlackBerry software',
      'Java platform software',
      'Capitals in Asia',
      'Cigarettes',
      'Tobacco',
    ];

    const config = new RadioPlayerConfig(
      'Voice of America',
      '7:00pm',
      './logo.jpg',
      './waveform.png',
      [audioSource],
      quickSearchTerms,
    );

    return config;
  }

  private get baseTranscriptConfig(): TranscriptConfig {
    const convertedTranscript: TranscriptEntryConfig[] = transcript.map(
      (entry: any) =>
        new TranscriptEntryConfig(
          entry.id,
          entry.start,
          entry.end,
          entry.text,
          entry.is_music || false,
          entry.searchMatchIndex,
        ),
    );

    const transcriptConfig = new TranscriptConfig(convertedTranscript);

    return transcriptConfig;
  }

  private get radioPlayer(): RadioPlayer | null {
    return this.shadowRoot ? (this.shadowRoot.querySelector('radio-player') as RadioPlayer) : null;
  }

  private searchRequested(e: CustomEvent) {
    const term = e.detail.searchTerm;
    this.doSearch(term);
  }

  firstUpdated() {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('q');
    const startTime = searchParams.get('start');

    if (searchTerm) {
      this.doSearch(searchTerm);
      if (this.radioPlayer) {
        this.radioPlayer.searchTerm = searchTerm;
      }
    }

    if (startTime) {
      this.startPlaybackAt = parseFloat(startTime);
    }
  }

  private canplay() {
    if (this.startPlaybackAt && this.radioPlayer) {
      this.radioPlayer.seekTo(this.startPlaybackAt);
      this.startPlaybackAt = undefined;
    }
  }

  async doSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.updateSearchQueryParam();
    const searchUrl = `https://books-search0.us.archive.org/explorer/get_radio_captions_matches/BBC_Radio_2_20190502_180000/BBC_Radio_2_20190502_180000_speech_vs_music_asr.json?q=${searchTerm}`;
    const response = await fetch(searchUrl);
    const json = await response.json();

    const convertedTranscript = json.transcript.map(
      (entry: any) =>
        new TranscriptEntryConfig(
          entry.id,
          entry.start,
          entry.end,
          entry.text,
          entry.is_music || false,
          entry.search_match_index,
        ),
    );

    const transcriptConfig = new TranscriptConfig(convertedTranscript);

    if (this.radioPlayer) {
      this.radioPlayer.transcriptConfig = transcriptConfig;
    }
  }

  private searchCleared() {
    this.searchTerm = '';
    this.resetTranscript();
    this.updateSearchQueryParam();
  }

  private currentTimeChanged(e: CustomEvent): void {
    this.currentTime = e.detail.currentTime;
  }

  private playbackPaused(): void {
    this.updateStartTimeQueryParam();
  }

  private timeChangedFromScrub(e: CustomEvent): void {
    this.currentTime = e.detail.newTime;
    this.updateStartTimeQueryParam();
  }

  private transcriptEntrySelected(e: CustomEvent): void {
    this.currentTime = e.detail.newTime;
    this.updateStartTimeQueryParam();
  }

  private updateStartTimeQueryParam(): void {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('start', `${this.currentTime}`);
    window.history.replaceState({}, '', `?${searchParams.toString()}`);
  }

  private updateSearchQueryParam(): void {
    const searchParams = new URLSearchParams(window.location.search);
    if (this.searchTerm === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', `${this.searchTerm}`);
    }
    window.history.replaceState({}, '', `?${searchParams.toString()}`);
  }

  private resetTranscript() {
    const transcriptConfig = this.baseTranscriptConfig;

    if (this.radioPlayer) {
      this.radioPlayer.transcriptConfig = transcriptConfig;
    }
  }
}
