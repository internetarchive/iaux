import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { FetchRetrier } from '../src/utils/fetch-retrier';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';

describe('FetchRetrier', () => {
  let fetchStub: sinon.SinonStub;
  let sleepStub: sinon.SinonStub;
  let analytics: MockAnalyticsHandler;

  beforeEach(() => {
    analytics = new MockAnalyticsHandler();
    fetchStub = sinon.stub(globalThis, 'fetch');
    sleepStub = sinon.stub().resolves(); // stubbed promisedSleep
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('returns response on first success', async () => {
    fetchStub.resolves(new Response('ok', { status: 200 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/data');

    expect(res.status).to.equal(200);
    expect(fetchStub.callCount).to.equal(1);
    expect(sleepStub.callCount).to.equal(0);
    expect(analytics.events.length).to.equal(0);
  });

  it('does not retry on 404 and logs event', async () => {
    fetchStub.resolves(new Response('not found', { status: 404 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/404');

    expect(res.status).to.equal(404);
    expect(fetchStub.callCount).to.equal(1);
    expect(sleepStub.callCount).to.equal(0);
    expect(analytics.events[0].action).to.equal('status404NotRetrying');
  });

  it('retries on 500 and logs retry/failure events', async () => {
    fetchStub.onCall(0).resolves(new Response('fail', { status: 500 }));
    fetchStub.onCall(1).resolves(new Response('fail again', { status: 500 }));
    fetchStub.onCall(2).resolves(new Response('still fail', { status: 500 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 2,
      retryDelay: 1,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/fail');

    expect(res.status).to.equal(500);
    expect(fetchStub.callCount).to.equal(3);
    expect(sleepStub.callCount).to.equal(2);
    expect(analytics.events.some(e => e.action === 'retryingFetch')).to.be.true;
    expect(analytics.events.some(e => e.action === 'fetchFailed')).to.be.true;
  });

  it('retries on fetch error and eventually succeeds', async () => {
    fetchStub.onCall(0).rejects(new Error('Network error'));
    fetchStub.onCall(1).resolves(new Response('ok', { status: 200 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 1,
      retryDelay: 1,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/retry');

    expect(res.status).to.equal(200);
    expect(fetchStub.callCount).to.equal(2);
    expect(sleepStub.calledOnce).to.be.true;
    expect(analytics.events.some(e => e.action === 'retryingFetch')).to.be.true;
  });

  it('throws and logs when retries are exhausted due to network error', async () => {
    fetchStub.rejects(new Error('Boom'));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 1,
      retryDelay: 1,
      sleepFn: sleepStub,
    });

    try {
      await retrier.fetchRetry('https://foo.org/networkfail');
      throw new Error('Should have thrown');
    } catch (err: any) {
      expect(err.message).to.equal('Boom');
    }

    expect(fetchStub.callCount).to.equal(2);
    expect(sleepStub.callCount).to.equal(1);
    expect(analytics.events.some(e => e.action === 'fetchFailed')).to.be.true;
  });

  it('detects content blocker error and does not retry', async () => {
    const blockerError = new TypeError('Content Blocker denied request');
    fetchStub.rejects(blockerError);

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 2,
      sleepFn: sleepStub,
    });

    try {
      await retrier.fetchRetry('https://foo.org/blocked');
      throw new Error('Should have thrown');
    } catch (err: any) {
      expect(err).to.equal(blockerError);
    }

    expect(fetchStub.callCount).to.equal(1);
    expect(sleepStub.callCount).to.equal(0);
    expect(
      analytics.events.some(
        e => e.action === 'contentBlockerDetectedNotRetrying',
      ),
    ).to.be.true;
  });

  it('calls sleepFn on retry with correct delay', async () => {
    fetchStub.onCall(0).resolves(new Response(null, { status: 500 }));
    fetchStub.onCall(1).resolves(new Response('ok', { status: 200 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 2,
      retryDelay: 1234,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/retry-with-sleep');

    expect(res.status).to.equal(200);
    expect(sleepStub.calledOnce).to.be.true;
    expect(sleepStub.calledWith(1234)).to.be.true;
  });

  it('sleeps for each retry attempt', async () => {
    fetchStub.resolves(new Response(null, { status: 500 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryCount: 2,
      retryDelay: 300,
      sleepFn: sleepStub,
    });

    const res = await retrier.fetchRetry('https://foo.org/retry-fail');

    expect(res.status).to.equal(500);
    expect(sleepStub.callCount).to.equal(2);
    expect(sleepStub.alwaysCalledWith(300)).to.be.true;
  });
});
