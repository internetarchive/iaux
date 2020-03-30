import { expect } from '@open-wc/testing';

import { FullTextSearchBackend } from '../../../lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-backend';

import sampleResponseBrackets from './full-text-sample-response-brackets';
import sampleResponseEms from './full-text-sample-response-em';

class MockFullTextSearchServiceBrackets {
  searchRequested(query) {
    return new Promise(resolve => resolve(sampleResponseBrackets));
  }
}

class MockFullTextSearchServiceEmss {
  searchRequested(query) {
    return new Promise(resolve => resolve(sampleResponseEms));
  }
}

describe('Full Text Search Backend', () => {
  it('correctly finds search indices with default triple curly brackets', async () => {
    const searchService = new MockFullTextSearchServiceBrackets();
    const searchBackend = new FullTextSearchBackend(searchService);

    const searchIndices = await searchBackend.getSearchRanges('government');

    expect(searchIndices.length).to.equal(6);

    expect(searchIndices[0].startIndex).to.equal(719);
    expect(searchIndices[0].endIndex).to.equal(730);

    expect(searchIndices[1].startIndex).to.equal(823);
    expect(searchIndices[1].endIndex).to.equal(833);

    expect(searchIndices[2].startIndex).to.equal(1004);
    expect(searchIndices[2].endIndex).to.equal(1014);

    expect(searchIndices[3].startIndex).to.equal(1126);
    expect(searchIndices[3].endIndex).to.equal(1136);

    expect(searchIndices[4].startIndex).to.equal(1162);
    expect(searchIndices[4].endIndex).to.equal(1172);

    expect(searchIndices[5].startIndex).to.equal(1195);
    expect(searchIndices[5].endIndex).to.equal(1206);
  });

  it('correctly finds search indices with em tags', async () => {
    const searchService = new MockFullTextSearchServiceEmss();
    const searchBackend = new FullTextSearchBackend(searchService, '<em>', '</em>');

    const searchIndices = await searchBackend.getSearchRanges('government');

    expect(searchIndices.length).to.equal(6);

    expect(searchIndices[0].startIndex).to.equal(719);
    expect(searchIndices[0].endIndex).to.equal(730);

    expect(searchIndices[1].startIndex).to.equal(823);
    expect(searchIndices[1].endIndex).to.equal(833);

    expect(searchIndices[2].startIndex).to.equal(1004);
    expect(searchIndices[2].endIndex).to.equal(1014);

    expect(searchIndices[3].startIndex).to.equal(1126);
    expect(searchIndices[3].endIndex).to.equal(1136);

    expect(searchIndices[4].startIndex).to.equal(1162);
    expect(searchIndices[4].endIndex).to.equal(1172);

    expect(searchIndices[5].startIndex).to.equal(1195);
    expect(searchIndices[5].endIndex).to.equal(1206);
  });

});
