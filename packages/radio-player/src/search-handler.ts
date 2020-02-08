import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';

/**
 * This class augments the transcript entry with the start and end indices.
 * This is useful for more rapidly splitting up and restoring the transcript
 * entries from the transforms that happen during the search.
 *
 * @class TranscriptIndexMap
 */
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

/**
 * The first step in converting the search results back to a usable transcript
 * is to break up the overall merged transcript into search results and non-search-results
 * sections. This will allow us to more easily break it up into its original transcript
 * chunks in a subsequent process.
 *
 * This class is a container to hold those chunks. They each have a start and end index
 * from their spot in the merged transcript, the text from that chunk, and whether that
 * chunk was a search match or just regular text.
 *
 * @class SearchSeparatedTranscriptEntry
 */
class SearchSeparatedTranscriptEntry {
  startIndex: number;

  endIndex: number;

  text: string;

  isSearchMatch: boolean;

  constructor(startIndex: number, endIndex: number, text: string, isSearchMatch: boolean) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.text = text;
    this.isSearchMatch = isSearchMatch;
  }
}

export default class SearchHandler {
  private transcriptConfig: TranscriptConfig;

  private transcriptEntryIndices: TranscriptIndexMap[] = [];

  private mergedTranscript = '';

  constructor(transcriptConfig: TranscriptConfig) {
    this.transcriptConfig = transcriptConfig;
    this.buildIndex();
  }

  search(term: string): TranscriptConfig {
    const searchIndices = this.getSearchIndices(term);
    const newTranscriptEntries: TranscriptEntryConfig[] = [];
    const matchIndex = 0;

    this.transcriptEntryIndices.forEach((entryIndexMap: TranscriptIndexMap, index: number) => {
      const transcriptEntry = this.transcriptConfig.entries[index];

      // from all the search results, find which ones start inside this transcript entry
      const searchIndicesInEntry = searchIndices.filter((matchIndex) => {
        const inRange = matchIndex >= entryIndexMap.startIndex && matchIndex <= entryIndexMap.endIndex;
        console.log('inRange', matchIndex, inRange, entryIndexMap);
        return inRange;
      });

      console.log('searchIndicesInEntry', searchIndices, entryIndexMap, searchIndicesInEntry);

      // if there are no hits in here, just append it as-is
      if (searchIndicesInEntry.length === 0) {
        console.log('no hit', index);
        newTranscriptEntries.push(transcriptEntry);
        return;
      }

      const startStops = [];
      const startIndex = 0;
      searchIndicesInEntry.forEach((searchStartIndex) => {

      });


      searchIndicesInEntry.forEach((searchStartIndex: number, index: number) => {
        const entryText = transcriptEntry.displayText;
        const startIndex = searchStartIndex - entryIndexMap.startIndex;
        const endIndex = startIndex + term.length;
        const goesOver = endIndex > (entryText.length - startIndex); // does it continue into the next entry?

        const beforeText = entryText.substring(resultStartIndex, startIndex);
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
        );

        const afterEntry = new TranscriptEntryConfig(
          transcriptEntry.id,
          transcriptEntry.start,
          transcriptEntry.end,
          afterText,
          transcriptEntry.isMusic,
        );

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

    const startIndices: number[] = [];
    let result;
    while ((result = regex.exec(this.mergedTranscript))) {
      startIndices.push(result.index);
    }

    return startIndices;
  }

  private getSearchSeparatedTranscript(term: string): SearchSeparatedTranscriptEntry[] {
    const searchIndices = this.getSearchIndices(term);
    if (searchIndices.length === 0) {
      return [new SearchSeparatedTranscriptEntry(0, this.mergedTranscript.length, this.mergedTranscript, false)];
    }

    const transcriptEntries: SearchSeparatedTranscriptEntry[] = [];
    let startIndex = 0;
    searchIndices.forEach((index) => {
      const nextStart = index + term.length;
      const nonResultText = this.mergedTranscript.substring(startIndex, index);
      const resultText = this.mergedTranscript.substring(index, nextStart);
      const nonResultEntry = new SearchSeparatedTranscriptEntry(startIndex, index - 1, nonResultText, false);
      const searchResultEntry = new SearchSeparatedTranscriptEntry(index, nextStart - 1, resultText, true);
      transcriptEntries.push(nonResultEntry);
      transcriptEntries.push(searchResultEntry);
      startIndex = nextStart;
    });
    const finalResultText = this.mergedTranscript.substring(startIndex, this.mergedTranscript.length);
    const finalResultEntry = new SearchSeparatedTranscriptEntry(
      startIndex, this.mergedTranscript.length, finalResultText, false
    );
    transcriptEntries.push(finalResultEntry);

    return transcriptEntries;
  }

  private buildIndex() {
    let startIndex = 0;
    this.transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      const { displayText } = entry;

      const indexMap: TranscriptIndexMap = new TranscriptIndexMap(
        entry.id,
        startIndex,
        startIndex + displayText.length
      );
      this.transcriptEntryIndices.push(indexMap);
      this.mergedTranscript += `${entry.displayText} `;
      startIndex = this.mergedTranscript.length;
    });
    this.mergedTranscript = this.mergedTranscript.trim();
  }
}
