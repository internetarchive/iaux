import type { AnalyticsEvent } from '@internetarchive/analytics-manager';
import type { AnalyticsHandlerInterface } from '../../src/utils/analytics-handler-interface';

export type MockAnalyticsEvent = AnalyticsEvent & {
  bucketType: '1%' | '100%';
  additionalEventParams?: object;
};
export class MockAnalyticsHandler implements AnalyticsHandlerInterface {
  events: MockAnalyticsEvent[] = [];

  sendPing(values: Record<string, any>): void {}
  sendEvent(event: MockAnalyticsEvent): void {
    const thisEvent = Object.assign({}, event, { bucketType: '1%' });
    this.events.push(thisEvent);
  }
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void {
    this.events.push({
      category,
      action,
      label,
      bucketType: '1%',
      additionalEventParams: { ...additionalEventParams },
    });
  }
  sendEventNoSampling(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      bucketType: '100%',
    } as unknown as MockAnalyticsEvent);
  }
  trackIaxParameter(location: string): void {}
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void {}
}
