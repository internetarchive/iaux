import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { SearchHelper } from '../../lib/src/search-handler/search-helper';
import { Range } from '../../lib/src/search-handler/search-models';

describe('Search Helper', () => {
  describe('getIntersection()', () => {
    it('correctly calculates the intersection of two ranges', async () => {
      const range1 = new Range(0, 10);
      const range2 = new Range(7, 15);
      const intersection = SearchHelper.getIntersection(range1, range2);

      expect(intersection.startIndex).to.equal(7);
      expect(intersection.endIndex).to.equal(10);
    });

    it('correctly calculates the intersection of two ranges in opposite order', async () => {
      const range1 = new Range(0, 10);
      const range2 = new Range(7, 15);
      const intersection = SearchHelper.getIntersection(range2, range1);

      expect(intersection.startIndex).to.equal(7);
      expect(intersection.endIndex).to.equal(10);
    });

    it('returns `undefined` if the ranges do not intersect', async () => {
      const range1 = new Range(0, 10);
      const range2 = new Range(11, 15);
      const intersection = SearchHelper.getIntersection(range1, range2);
      expect(intersection).to.equal(undefined);
    });

    it('returns the expected intersection for a given text block', async () => {
      const range1 = new Range(0, 11);
      const range2 = new Range(8, 15);
      const intersection = SearchHelper.getIntersection(range1, range2);
      const text = 'foo bar baz boop blop bump snip snap';
      const intersected = text.substring(intersection.startIndex, intersection.endIndex);

      expect(intersected).to.equal('baz');
    });
  });
});
