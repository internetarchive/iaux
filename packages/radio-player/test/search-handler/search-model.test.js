import {
  expect
} from '@open-wc/testing';

import { Range } from '../../lib/src/search-handler/search-models';

describe('Search Models', () => {
  describe('Range', () => {
    it('correctly calculates the length of the range is start is less than end', async () => {
      const range = new Range(9, 13);
      expect(range.length).to.equal(4);
    });

    it('correctly calculates the length of the range is end is less than start', async () => {
      const range = new Range(7, 2);
      expect(range.length).to.equal(5);
    });
  });
});
