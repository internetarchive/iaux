import { Range } from '../search-models';
import { TranscriptIndexInterface } from '../transcript-index-interface';
import { SearchIndexInterface } from './search-index-interface';

export class LocalSearchIndex implements SearchIndexInterface {
  /**
   * The TranscriptIndex allows quick lookup
   *
   * @private
   * @memberof LocalSearchIndex
   */
  private transcriptIndex: TranscriptIndexInterface;

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} term
   * @returns {Promise<Range[]>}
   * @memberof SearchIndexInterface
   */
  async getSearchRanges(term: string): Promise<Range[]> {
    const ranges: Range[] = [];
    const termLowerCased: string = term.toLowerCase();

    let index = -1;
    /* eslint-disable-next-line no-cond-assign */
    while (
      (index = this.transcriptIndex.mergedTranscriptLowercased.indexOf(
        termLowerCased,
        index + 1,
      )) !== -1
    ) {
      const newRange: Range = new Range(index, index + termLowerCased.length);
      ranges.push(newRange);
    }

    return new Promise((resolve) => {
      resolve(ranges);
    });
  }

  constructor(transcriptIndex: TranscriptIndexInterface) {
    this.transcriptIndex = transcriptIndex;
  }
}
