import TranscriptEntryConfig from './transcript-entry-config';

export default class TranscriptConfig {
  entries: TranscriptEntryConfig[] = [];

  constructor(entries: TranscriptEntryConfig[]) {
    this.entries = entries;
  }
}
