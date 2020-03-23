import { expect } from '@open-wc/testing';

import { FullTextSearchBackend } from '../../../lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-backend';

import sampleResponseBrackets from './full-text-sample-response-brackets';
import sampleResponseEms from './full-text-sample-response-em';

class MockFullTextSearchBracketsDelegate {
  searchRequested(query) {
    return new Promise(resolve => resolve(sampleResponseBrackets));
  }
}

class MockFullTextSearchEmssDelegate {
  searchRequested(query) {
    return new Promise(resolve => resolve(sampleResponseEms));
  }
}

describe('Full Text Search Backend', () => {
  it('returns empty array if no delegate assigned', async () => {
    const searchBackend = new FullTextSearchBackend();
    const searchIndices = await searchBackend.getSearchRanges('government');
    expect(searchIndices.length).to.equal(0);
  });

  it('correctly finds search indices with default triple curly brackets', async () => {
    const searchDelegate = new MockFullTextSearchBracketsDelegate();
    const searchBackend = new FullTextSearchBackend();
    searchBackend.delegate = searchDelegate;

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
    const searchDelegate = new MockFullTextSearchEmssDelegate();
    const searchBackend = new FullTextSearchBackend('<em>', '</em>');
    searchBackend.delegate = searchDelegate;

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
