import { TranscriptConfig, TranscriptEntryConfig } from "@internetarchive/transcript-view";

class TranscriptIndexMap {
  entryId: number;
  startIndex: number;
  endIndex: number;
  constructor(entryId: number, startIndex: number, endIndex: number) {
    this.entryId = entryId;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }
}

export default class SearchHandler {

  private transcriptConfig: TranscriptConfig;

  private transcriptEntryIndices: TranscriptIndexMap[] = [];

  private mergedTranscript: string = '';

  constructor(transcriptConfig: TranscriptConfig) {
    this.transcriptConfig = transcriptConfig;
    this.buildIndex();
  }

  search(term: string): TranscriptConfig {
    const searchIndices = this.getSearchIndices(term);
    var newTranscriptEntries: TranscriptEntryConfig[] = [];
    var matchIndex = 0;

    this.transcriptEntryIndices.forEach((entryIndexMap: TranscriptIndexMap, index: number) => {
      const transcriptEntry = this.transcriptConfig.entries[index];

      const searchIndicesInEntry = searchIndices.filter((index) => {
        index >= entryIndexMap.startIndex && index <= entryIndexMap.endIndex
      });

      // if there are no hits in here, just append it as-is
      if (searchIndicesInEntry.length === 0) {
        newTranscriptEntries.push(transcriptEntry);
        return;
      }

      searchIndicesInEntry.forEach((searchStartIndex: number, index: number) => {
        const entryText = transcriptEntry.displayText;
        const startIndex = searchStartIndex - entryIndexMap.startIndex;
        const endIndex = startIndex + term.length;
        const goesOver = endIndex > (entryText.length - startIndex); // does it continue into the next entry?

        const beforeText = entryText.substring(0, startIndex);
        const resultText = entryText.substring(startIndex, endIndex);
        const afterText = entryText.substring(endIndex, entryText.length);

        console.log('entryText', entryText, term, startIndex, endIndex, goesOver, beforeText, resultText, afterText);

        const beforeEntry = new TranscriptEntryConfig(
          transcriptEntry.id,
          transcriptEntry.start,
          transcriptEntry.end,
          beforeText,
          transcriptEntry.isMusic
        );

        const resultEntry = new TranscriptEntryConfig(
          transcriptEntry.id,
          transcriptEntry.start,
          transcriptEntry.end,
          resultText,
          transcriptEntry.isMusic,
          matchIndex
        )

        const afterEntry = new TranscriptEntryConfig(
          transcriptEntry.id,
          transcriptEntry.start,
          transcriptEntry.end,
          afterText,
          transcriptEntry.isMusic,
        )

        newTranscriptEntries.push(beforeEntry);
        newTranscriptEntries.push(resultEntry);
        newTranscriptEntries.push(afterEntry);
      });
    });

    const newTranscript = new TranscriptConfig(newTranscriptEntries);

    return newTranscript;
  }

  private getSearchIndices(term: string): number[] {
    const regex = new RegExp(term, 'gi');

    var startIndices: number[] = [];
    var result;
    while ( (result = regex.exec(this.mergedTranscript)) ) {
      startIndices.push(result.index);
    }

    return startIndices;
  }

  private buildIndex() {
    var startIndex = 0;
    this.transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      const displayText = entry.displayText;

      const indexMap: TranscriptIndexMap = new TranscriptIndexMap(
        entry.id,
        startIndex,
        startIndex + displayText.length
      );
      this.transcriptEntryIndices.push(indexMap);
      this.mergedTranscript += `${entry.displayText} `;
      startIndex = this.mergedTranscript.length
    });
    this.mergedTranscript = this.mergedTranscript.trim();
  }
}
