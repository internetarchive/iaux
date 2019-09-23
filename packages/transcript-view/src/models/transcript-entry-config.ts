export default class TranscriptEntryConfig {
  id: number;

  startTime: number;

  endTime: number;

  searchMatchIndex?: number;

  text: string;

  constructor(
    id: number,
    startTime: number,
    endTime: number,
    text: string,
    searchMatchIndex?: number,
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.text = text;
    this.searchMatchIndex = searchMatchIndex;
  }
}
