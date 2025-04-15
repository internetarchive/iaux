/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */

import {
  AnalyticsHelperInterface,
  AnalyticsHelpers,
  AnalyticsManager,
  AnalyticsManagerInterface,
  AnalyticsEvent,
} from '@internetarchive/analytics-manager';
import type { AnalyticsHandlerInterface } from './analytics-handler-interface';

export class AnalyticsHandler implements AnalyticsHandlerInterface {
  private analyticsBackend?: AnalyticsManagerInterface;

  private analyticsHelpers?: AnalyticsHelperInterface;

  constructor(options: { enableAnalytics: boolean }) {
    if (!options.enableAnalytics) return;
    this.analyticsBackend = new AnalyticsManager();
    this.analyticsHelpers = new AnalyticsHelpers(this.analyticsBackend);
  }

  /** @inheritdoc */
  sendPing(values: Record<string, any>): void {
    this.analyticsBackend?.sendPing(values);
  }

  /** @inheritdoc */
  sendEvent(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEvent(options);
  }

  /** @inheritdoc */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void {
    this.sendEvent({
      category,
      action,
      label,
      eventConfiguration: additionalEventParams,
    });
  }

  /** @inheritdoc */
  sendEventNoSampling(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEventNoSampling(options);
  }

  /** @inheritdoc */
  trackIaxParameter(location: string): void {
    this.analyticsHelpers?.trackIaxParameter(location);
  }

  /** @inheritdoc */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void {
    this.analyticsHelpers?.trackPageView(options);
  }
}
