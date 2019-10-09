import { LitElement, html, customElement, TemplateResult } from 'lit-element';

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
  render(): TemplateResult {
    return html`
      <radio-player
        .config=${this.radioPlayerConfig}
        .transcriptConfig=${this.baseTranscriptConfig}
        @searchrequested=${this.doSearch}
        @searchCleared=${this.searchCleared}
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

  async doSearch(e: CustomEvent) {
    const term = e.detail.searchTerm;
    const searchUrl = `https://books-search0.us.archive.org/explorer/get_radio_captions_matches/BBC_Radio_2_20190502_180000/BBC_Radio_2_20190502_180000_speech_vs_music_asr.json?q=${term}`;
    const response = await fetch(searchUrl);
    const json = await response.json();

    const convertedTranscript = json.map(
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
    this.resetTranscript();
  }

  private resetTranscript() {
    const transcriptConfig = this.baseTranscriptConfig;

    if (this.radioPlayer) {
      this.radioPlayer.transcriptConfig = transcriptConfig;
    }
  }
}
