import { FetchRetrier, FetchRetrierInterface } from './utils/fetch-retrier';
import type { FetchHandlerInterface } from './fetch-handler-interface';

/**
 * The FetchHandler adds some common helpers:
 * - retry the request if it fails
 * - add `reCache=1` to the request if it's in the current url so the backend sees it
 * - add convenience method for fetching/decoding an API response by just the path
 */
export class IaFetchHandler implements FetchHandlerInterface {
  private iaApiBaseUrl?: string;

  private fetchRetrier: FetchRetrierInterface = new FetchRetrier();

  private searchParams?: string;

  constructor(options?: {
    iaApiBaseUrl?: string;
    fetchRetrier?: FetchRetrierInterface;
    searchParams?: string;
  }) {
    if (options?.iaApiBaseUrl) this.iaApiBaseUrl = options.iaApiBaseUrl;
    if (options?.fetchRetrier) this.fetchRetrier = options.fetchRetrier;
    if (options?.searchParams) {
      this.searchParams = options.searchParams;
    } else {
      this.searchParams = window.location.search;
    }
  }

  /** @inheritdoc */
  async fetchIAApiResponse<T>(
    path: string,
    options?: {
      includeCredentials?: boolean;
    },
  ): Promise<T> {
    const url = `${this.iaApiBaseUrl}${path}`;
    return this.fetchApiResponse(url, options);
  }

  /** @inheritdoc */
  async fetchApiResponse<T>(
    url: string,
    options?: {
      includeCredentials?: boolean;
      method?: string;
      body?: BodyInit;
      headers?: HeadersInit;
    },
  ): Promise<T> {
    const requestInit: RequestInit = {};
    if (options?.includeCredentials) requestInit.credentials = 'include';
    if (options?.method) requestInit.method = options.method;
    if (options?.body) requestInit.body = options.body;
    if (options?.headers) requestInit.headers = options.headers;
    const response = await this.fetch(url, requestInit);
    const json = await response.json();
    return json as T;
  }

  /** @inheritdoc */
  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    let finalInput = input;
    const urlParams = new URLSearchParams(this.searchParams);
    if (urlParams.get('reCache') === '1') {
      finalInput = this.addSearchParams(input, { reCache: '1' });
    }
    return this.fetchRetrier.fetchRetry(finalInput, init);
  }

  /**
   * Since RequestInfo can be either a `Request` or `string`, we need to change
   * the way we add search params to it depending on the input.
   */
  private addSearchParams(
    input: RequestInfo,
    params: Record<string, string>,
  ): RequestInfo {
    const urlString = typeof input === 'string' ? input : input.url;
    const url = new URL(urlString, window.location.href);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    if (typeof input === 'string') {
      return url.href;
    } else {
      const newRequest = new Request(url.href, input);
      return newRequest;
    }
  }
}
