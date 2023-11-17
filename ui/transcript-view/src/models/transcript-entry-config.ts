export default class TranscriptEntryConfig {
  id: number;

  start: number;

  end: number;

  isMusic: boolean;

  searchMatchIndex?: number;

  rawText: string;

  constructor(
    id: number,
    start: number,
    end: number,
    rawText: string,
    isMusic: boolean,
    searchMatchIndex?: number,
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.rawText = rawText;
    this.isMusic = isMusic;
    this.searchMatchIndex = searchMatchIndex;
  }

  get displayText(): string {
    if (this.isMusic) {
      return '[Transcript unavailable]';
    }

    return this.rawText;
  }
}
