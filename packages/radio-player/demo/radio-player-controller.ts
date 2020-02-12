/* eslint-disable import/no-duplicates */
import { LitElement, html, customElement, TemplateResult, property } from 'lit-element';

import { AudioSource } from '@internetarchive/audio-element';
import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';

import '../src/radio-player';
import RadioPlayer from '../src/radio-player';
import RadioPlayerConfig from '../src/models/radio-player-config';

@customElement('radio-player-controller')
export default class RadioPlayerController extends LitElement {
  @property({ type: RadioPlayerConfig }) radioPlayerConfig:
    | RadioPlayerConfig
    | undefined = undefined;

  @property({ type: TranscriptConfig }) transcriptConfig: TranscriptConfig | undefined = undefined;

  @property({ type: String }) itemId: string | undefined = 'WFMD_930_AM_20190803_170000';

  private startPlaybackAt: number | undefined = undefined;

  private currentTime = 0;

  private fileName = '';

  render(): TemplateResult {
    return html`
      <radio-player
        .config=${this.radioPlayerConfig}
        .transcriptConfig=${this.transcriptConfig}
        @searchTermChanged=${this.searchTermChanged}
        @playbackPaused=${this.playbackPaused}
        @currentTimeChanged=${this.currentTimeChanged}
        @timeChangedFromScrub=${this.timeChangedFromScrub}
        @transcriptEntrySelected=${this.transcriptEntrySelected}
        @canplay=${this.canplay}
      >
      </radio-player>
    `;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async loadItemMetadata(): Promise<any> {
    const url = `https://archive.org/metadata/${this.itemId}`;
    const response = await fetch(url);
    const data = await response.json();

    this.handleMetadataResponse(data);
  }

  async fetchTranscript(): Promise<any> {
    const srtUrl = `https://archive.org/cors/${this.itemId}/${this.fileName}`;

    const response = await fetch(srtUrl);
    const json = await response.json();

    const transcriptEntries = json.map(
      (entry: any) =>
        new TranscriptEntryConfig(
          entry.id,
          entry.start,
          entry.end,
          entry.text,
          entry.is_music,
          entry.search_match_index,
        ),
    );

    this.transcriptConfig = new TranscriptConfig(transcriptEntries);
  }

  async setup(): Promise<any> {
    await this.loadItemMetadata();
    await this.fetchTranscript();

    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('q');
    const startTime = searchParams.get('start');

    if (searchTerm && this.radioPlayer) {
      this.radioPlayer.searchTerm = searchTerm;
    }

    if (startTime) {
      this.startPlaybackAt = parseFloat(startTime);
    }
  }

  handleMetadataResponse(response: any): void {
    const metadata = response;
    const collectionIdentifier = metadata.metadata.collection[0];
    const srtFile = metadata.files.find((file: any) => file.format === 'JSON SRT');
    this.fileName = srtFile.name;

    const originalAudioFile = metadata.files.find(
      (file: any) =>
        file.source === 'original' &&
        ['vbr mp3', 'ogg vorbis', 'advanced audio coding'].includes(file.format.toLowerCase()),
    );

    const audioFiles = metadata.files.filter((file: any) =>
      ['vbr mp3', 'ogg vorbis'].includes(file.format.toLowerCase()),
    );

    const audioSources = audioFiles.map((file: any) => {
      const url = `https://archive.org/download/${this.itemId}/${file.name}`;
      const mimetype = file.format.toLowerCase() === 'ogg vorbis' ? 'audio/ogg' : 'audio/mpeg';
      return new AudioSource(url, mimetype);
    });

    const waveFormImageFile = metadata.files.find(
      (file: any) =>
        file.format.toLowerCase() === 'png' && file.original === originalAudioFile.name,
    );

    const waveFormImageUrl = `https://archive.org/download/${this.itemId}/${waveFormImageFile.name}`;

    this.radioPlayerConfig = new RadioPlayerConfig(
      metadata.metadata.contributor,
      metadata.metadata.start_localtime || metadata.metadata.start_time,
      `https://archive.org/services/img/${collectionIdentifier}`,
      waveFormImageUrl,
      audioSources,
    );
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  private get radioPlayer(): RadioPlayer | null {
    return this.shadowRoot ? (this.shadowRoot.querySelector('radio-player') as RadioPlayer) : null;
  }

  firstUpdated(): void {
    this.setup();
  }

  private canplay(): void {
    if (this.startPlaybackAt && this.radioPlayer) {
      this.radioPlayer.seekTo(this.startPlaybackAt);
      this.startPlaybackAt = undefined;
    }
  }

  private searchTermChanged(e: CustomEvent): void {
    const { searchTerm } = e.detail;
    this.updateSearchQueryParam(searchTerm);
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

  /* eslint-disable-next-line class-methods-use-this */
  private updateSearchQueryParam(searchTerm: string): void {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', `${searchTerm}`);
    }
    window.history.replaceState({}, '', `?${searchParams.toString()}`);
  }
}
