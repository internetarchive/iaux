import { expect } from '@open-wc/testing';

import { SearchService } from '../lib/search-service';
import { SearchParams } from '../lib/search-params';

import { MockResponseGenerator } from './mock-response-generator';

describe('SearchService', () => {
  it('can search when requested', async () => {
    class MockSearchBackend {
      async performSearch(params) {
        const responseGenerator = new MockResponseGenerator()
        const mockResponse = responseGenerator.generateMockSearchResponse(params);
        return new Promise(resolve => resolve(mockResponse));
      }
    }

    const query = "title:foo AND collection:bar"
    const params = new SearchParams(query)
    const backend = new MockSearchBackend();
    const service = new SearchService(backend);
    const result = await service.search(params);
    expect(result.responseHeader.params.query).to.equal(query);
  });

  it('can request metadata when requested', async () => {
    class MockSearchBackend {
      async fetchMetadata(identifier) {
        const responseGenerator = new MockResponseGenerator()
        const mockResponse = responseGenerator.generateMockMetadataResponse(identifier);
        return new Promise(resolve => resolve(mockResponse));
      }
    }

    const backend = new MockSearchBackend();
    const service = new SearchService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.metadata.identifier).to.equal('foo');
  });
});
