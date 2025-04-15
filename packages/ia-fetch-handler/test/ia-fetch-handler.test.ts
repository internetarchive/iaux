import { expect } from '@open-wc/testing';
import { IaFetchHandler } from '../src/ia-fetch-handler';
import { FetchRetrierInterface } from '../src/utils/fetch-retrier';

class MockFetchRetrier implements FetchRetrierInterface {
  requestInfo?: RequestInfo;
  init?: RequestInit;
  retries?: number;

  async fetchRetry(
    requestInfo: RequestInfo,
    init?: RequestInit,
    retries?: number,
  ): Promise<Response> {
    this.init = init;
    this.requestInfo = requestInfo;
    this.retries = retries;
    return new Response(JSON.stringify({ boop: 'snoot' }), { status: 200 });
  }
}

describe('Fetch Handler', () => {
  describe('fetch', () => {
    it('adds reCache=1 if it is in the current url', async () => {
      const fetchRetrier = new MockFetchRetrier();
      const fetchHandler = new IaFetchHandler({
        fetchRetrier: fetchRetrier,
        searchParams: '?reCache=1',
      });
      await fetchHandler.fetch('https://foo.org/api/v1/snoot');
      expect(fetchRetrier.requestInfo).to.equal(
        'https://foo.org/api/v1/snoot?reCache=1',
      );
    });
  });

  describe('fetchIAApiResponse', () => {
    it('prepends the IA basehost to the url when making a request', async () => {
      const endpoint = '/foo/service/endpoint.php';
      const fetchRetrier = new MockFetchRetrier();
      const fetchHandler = new IaFetchHandler({
        iaApiBaseUrl: 'www.example.com',
        fetchRetrier: fetchRetrier,
      });
      await fetchHandler.fetchIAApiResponse(endpoint);
      expect(fetchRetrier.requestInfo).to.equal(
        'www.example.com/foo/service/endpoint.php',
      );
    });
  });

  describe('fetchApiResponse', () => {
    it('adds credentials: include if requested', async () => {
      const endpoint = '/foo/service/endpoint.php';
      const fetchRetrier = new MockFetchRetrier();
      const fetchHandler = new IaFetchHandler({
        iaApiBaseUrl: 'www.example.com',
        fetchRetrier: fetchRetrier,
      });
      await fetchHandler.fetchApiResponse(endpoint, {
        includeCredentials: true,
      });
      expect(fetchRetrier.init).to.deep.equal({ credentials: 'include' });
    });
  });
});
