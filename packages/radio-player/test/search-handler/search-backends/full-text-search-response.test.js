import { expect } from '@open-wc/testing';

import { FullTextSearchResponse } from '../../../lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-response';

import sampleResponse from './full-text-sample-response-brackets';

describe('Full Text Search Response Models', () => {
  it('initialize properly from backend response', async () => {
    const response = new FullTextSearchResponse(sampleResponse);
    expect(response.success).to.be.true;

    expect(response.value.docs[0].identifier).to.equal('KHNC_1360_AM_20180126_170000');
  });
});
