import type { AnalyticsEvent } from '@internetarchive/analytics-manager';

export interface AnalyticsHandlerInterface {
  /**
   * A general purpose analytics ping that takes arbitrary key-value pairs
   * and pings the analytics endpoint
   *
   * @param {Record<string, any>} values
   */
  sendPing(values: Record<string, any>): void;

  /**
   * Send a sampled event
   *
   * @param {options} AnalyticsEvent
   */
  sendEvent(options: AnalyticsEvent): void;

  /** @deprecated use sendEvent instead */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void;

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;

  /**
   * Handles tracking events passed in via `iax` query parameter.
   *
   * Format is `?iax=Category|Action|Label` // Label is optional
   * eg `?iax=EmailCampaign|RedButtonClicked`
   * NOTE: Uses the unsampled analytics property. Watch out for future high click links!
   *
   * @param {string}
   */
  trackIaxParameter(location: string): void;

  /**
   * Tracks a page view
   *
   * Appends several environmental values like
   * locale, timezone, referrer, and others.
   *
   * @param {{
   *     mediaType?: string;
   *     mediaLanguage?: string;
   *     primaryCollection?: string;
   *     page?: string;
   *   }} [options]
   * @memberof AnalyticsHelperInterface
   */

  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void;
}
