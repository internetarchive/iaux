import {
  expect
} from '@open-wc/testing';

import { TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, SearchResult, TranscriptEntryRange } from '../../lib/src/search-handler/search-models';

describe('Search Models', () => {
  describe('Range', () => {
    it('can be initialized properly', async () => {
      const range = new Range(9, 13);
      expect(range.startIndex).to.equal(9);
      expect(range.endIndex).to.equal(13);

      const range2 = new Range(14, 7);
      expect(range2.startIndex).to.equal(14);
      expect(range2.endIndex).to.equal(7);
    });

    it('correctly calculates the length of the range is start is less than end', async () => {
      const range = new Range(9, 13);
      expect(range.length).to.equal(4);
    });

    it('correctly calculates the length of the range is end is less than start', async () => {
      const range = new Range(7, 2);
      expect(range.length).to.equal(5);
    });

    it('can be initialized with the same number', async () => {
      const range = new Range(7, 7);
      expect(range.length).to.equal(0);
    });
  });

  describe('SearchResult', () => {
    it('can be initialized properly', async () => {
      const range = new Range(9, 12);
      const result = new SearchResult(range, 'foo', true);
      expect(result.range.length).to.equal(3);
      expect(result.text).to.equal('foo');
      expect(result.isSearchMatch).to.equal(true);
    });
  });

  describe('TranscriptEntryRange', () => {
    it('can be initialized properly', async () => {
      const transcript = new TranscriptEntryConfig(1, 17, 23, 'foo bar baz', false);
      const range = new Range(34, 44);
      const transcriptRange = new TranscriptEntryRange(transcript, range);

      expect(transcriptRange.range.length).to.equal(10);
      expect(transcriptRange.entry.rawText).to.equal('foo bar baz');
    });
  });
});
