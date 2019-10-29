import TranscriptEntryConfig from './transcript-entry-config';

export default class TranscriptConfig {
  entries: TranscriptEntryConfig[] = [];

  constructor(entries: TranscriptEntryConfig[]) {
    this.entries = entries;
  }

  get searchResults(): TranscriptEntryConfig[] {
    return this.entries.filter((entry: TranscriptEntryConfig) => entry.searchMatchIndex !== undefined);
  }
}
