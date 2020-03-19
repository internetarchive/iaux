import { Range } from '../../search-models';
import { TranscriptIndexInterface } from '../../transcript-index-interface';
import { SearchBackendInterface } from '../search-backend-interface';

export class LocalSearchBackend implements SearchBackendInterface {
  /**
   * The TranscriptIndex allows quick lookup
   *
   * @private
   * @memberof LocalSearchBackend
   */
  private transcriptIndex: TranscriptIndexInterface;

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} query
   * @returns {Promise<Range[]>}
   * @memberof SearchBackendInterface
   */
  async getSearchRanges(query: string): Promise<Range[]> {
    const ranges: Range[] = [];
    const queryLowerCased: string = query.toLowerCase();

    let index = -1;
    /* eslint-disable-next-line no-cond-assign */
    while (
      (index = this.transcriptIndex.mergedTranscriptLowercased.indexOf(
        queryLowerCased,
        index + 1,
      )) !== -1
    ) {
      const newRange: Range = new Range(index, index + queryLowerCased.length);
      ranges.push(newRange);
    }

    return new Promise(resolve => {
      resolve(ranges);
    });
  }

  constructor(transcriptIndex: TranscriptIndexInterface) {
    this.transcriptIndex = transcriptIndex;
  }
}
