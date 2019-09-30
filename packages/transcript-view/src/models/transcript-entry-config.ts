export default class TranscriptEntryConfig {
  id: number;

  start: number;

  end: number;

  isMusic: boolean;

  searchMatchIndex?: number;

  text: string;

  constructor(
    id: number,
    start: number,
    end: number,
    text: string,
    isMusic: boolean,
    searchMatchIndex?: number,
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.text = text;
    this.isMusic = isMusic;
    this.searchMatchIndex = searchMatchIndex;
  }
}
