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
    // 'MSNBCW_20160906_000000_Enter_Barack_Obama'; // 'WFMD_930_AM_20190803_170000'; // 'KSTE_650_AM_20190804_200000';

  private startPlaybackAt: number | undefined = undefined;

  private currentTime = 0;

  private searchTerm = '';

  private baseTranscriptConfig: TranscriptConfig = new TranscriptConfig([]);

  private fileName = '';

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

  async loadItemMetadata() {
    const url = `https://archive.org/metadata/${this.itemId}`;
    const response = await fetch(url);
    const data = await response.json();

    this.handleMetadataResponse(data);
  }

  // handleMetadataResponse(response: any) {
  //   const { metadata, files } = response;
  //   const { collection, ccnum } = metadata;
  //   const collectionIdentifier = collection[0];
  //   const srtFile = files.find(
  //     (file: any) => file.format === 'SubRip' && file.name.endsWith(`${ccnum}.srt`),
  //   );
  //   this.fileName = srtFile.name;

  //   // const originalAudioFile = files.find(
  //   //   (file: any) =>
  //   //     file.source === 'original' &&
  //   //     ['vbr mp3', 'ogg vorbis', 'advanced audio coding'].includes(file.format.toLowerCase()),
  //   // );

  //   const audioFiles = files.filter((file: any) =>
  //     ['vbr mp3', 'ogg vorbis'].includes(file.format.toLowerCase()),
  //   );

  //   const audioSources = audioFiles.map((file: any) => {
  //     const url = `https://archive.org/download/${this.itemId}/${file.name}`;
  //     const mimetype = file.format.toLowerCase() === 'ogg vorbis' ? 'audio/ogg' : 'audio/mpeg';
  //     return new AudioSource(url, mimetype);
  //   });

  //   // const waveFormImageFile = files.find(
  //   //   (file: any) =>
  //   //     file.format.toLowerCase() === 'png' && file.original === originalAudioFile.name,
  //   // );

  //   // const waveFormImageUrl = `https://archive.org/download/${this.itemId}/${waveFormImageFile.name}`;

  //   this.radioPlayerConfig = new RadioPlayerConfig(
  //     metadata.contributor,
  //     metadata.start_localtime || metadata.start_time,
  //     `https://archive.org/services/img/${collectionIdentifier}`,
  //     undefined,
  //     audioSources,
  //   );
  // }

  handleMetadataResponse(response: any) {
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

  async fetchTranscript(setAsActive: boolean) {
    const srtUrl = `https://archive.org/cors/${this.itemId}/${this.fileName}`;

    const response = await fetch(srtUrl);
    const json = await response.json();
    // const text = await response.text();

    // console.log(SAMPLE_TRANSCRIPT);
    // const parsed = parseSRT(SAMPLE_TRANSCRIPT);

    // console.log(parsed);

    const transcriptEntries = json.map((entry: any) => {
      // const fixedText = entry.text.replace('<br />', ' ').toLowerCase();

      return new TranscriptEntryConfig(
        entry.id,
        entry.start,
        entry.end,
        entry.text,
        entry.is_music,
        entry.search_match_index,
      );
    });

    this.baseTranscriptConfig = new TranscriptConfig(transcriptEntries);

    if (setAsActive) {
      this.transcriptConfig = this.baseTranscriptConfig;
    }
  }

  private get radioPlayer(): RadioPlayer | null {
    return this.shadowRoot ? (this.shadowRoot.querySelector('radio-player') as RadioPlayer) : null;
  }

  private searchRequested(e: CustomEvent) {
    const term = e.detail.searchTerm;
    this.doSearch(term);
  }

  firstUpdated() {
    this.setup();
  }

  async setup() {
    await this.loadItemMetadata();

    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('q');
    const startTime = searchParams.get('start');

    if (searchTerm) {
      this.searchTerm = searchTerm;
      this.doSearch(searchTerm);
      if (this.radioPlayer) {
        this.radioPlayer.searchTerm = searchTerm;
      }
    }

    const showDefaultTranscript = !searchTerm;
    this.fetchTranscript(showDefaultTranscript);

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
    const searchUrl = `https://www-jasonb.archive.org/details/tv?q=${searchTerm}&output=json&only=${this.itemId}`;
    const response = await fetch(searchUrl);
    const json = await response.json();

    console.log('doSearch', json);

    // const convertedTranscript = json.transcript.map(
    //   (entry: any) =>
    //     new TranscriptEntryConfig(
    //       entry.id,
    //       entry.start,
    //       entry.end,
    //       entry.text,
    //       entry.is_music || false,
    //       entry.search_match_index,
    //     ),
    // );

    // const transcriptConfig = new TranscriptConfig(convertedTranscript);

    // if (this.radioPlayer) {
    //   this.radioPlayer.transcriptConfig = transcriptConfig;
    // }
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
