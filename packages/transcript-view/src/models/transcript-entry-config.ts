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
    searchMatchIndex: number,
    text: string,
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.searchMatchIndex = searchMatchIndex;
    this.text = text;
  }
}
