import {
  LitElement,
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
} from 'lit';
/**
 * A lightweight launcher button that loads and opens the Zendesk Messenger
 * widget on demand.
 *
 * The native Zendesk launcher is never shown — this button is the sole entry
 * point. The Zendesk snippet script is fetched lazily on the first click so
 * it does not affect page load performance.
 *
 * @fires zendeskHelpButtonClicked - Dispatched when the user clicks the Help
 *   button, before the widget is opened.
 *
 * @cssprop [--button-background=#194880] - Button background colour.
 * @cssprop [--button-color=#fff] - Button text and icon colour.
 * @cssprop [--icon-fill-color=var(--button-color)] - SVG icon fill; defaults to `--button-color`.
 * @cssprop [--button-width=auto] - Button width.
 * @cssprop [--button-padding=13px] - Button padding.
 * @cssprop [--button-margin=14px 20px] - Margin between button and viewport edges.
 * @cssprop [--button-top=auto] - Distance from the top of the viewport.
 * @cssprop [--button-bottom=0] - Distance from the bottom of the viewport.
 * @cssprop [--button-left=auto] - Distance from the left of the viewport.
 * @cssprop [--button-right=0] - Distance from the right of the viewport.
 * @cssprop [--button-z-index=999998] - Stack order.
 * @cssprop [--button-border-radius=999rem] - Border radius.
 * @cssprop [--button-font-size=14px] - Font size.
 * @cssprop [--button-font-weight=700] - Font weight.
 *
 * @prop {number} [breakpoint=767] - Viewport width (px) below which the label is automatically hidden.
 *
 * @example
 * ```html
 * <ia-zendesk-widget
 *   .widgetKey="YOUR_KEY"
 * ></ia-zendesk-widget>
 * ```
 *
 * @example Customised appearance
 * ```html
 * <ia-zendesk-widget
 *   widgetKey="YOUR_KEY"
 *   style="
 *     --button-background: #e03b3b;
 *     --button-width: 130px;
 *     --button-bottom: 20px;
 *     --button-right: 20px;
 *   "
 * ></ia-zendesk-widget>
 * ```
 */
export declare class IAZendeskWidget extends LitElement {
  /** Zendesk account key from the `ze-snippet` URL. */
  widgetKey: string;
  /** Viewport width (px) below which the label is automatically hidden. */
  breakpoint: number;
  /** True from the first click until the Zendesk script resolves. Shows the spinner. */
  private isLoading;
  /** True when the viewport is narrower than `breakpoint`. */
  private isCompact;
  private _mql?;
  private _onMqlChange;
  /** Guards against re-loading the script and re-waiting on subsequent clicks. */
  private zendeskReady;
  connectedCallback(): void;
  disconnectedCallback(): void;
  updated(changed: PropertyValues<this>): void;
  private _setupMediaQuery;
  /**
   * Click handler for the Help button.
   *
   * On the first call: injects the Zendesk script and waits for `window.zE`
   * to become available, then opens the panel.
   *
   * On subsequent calls: the script is already present so we go straight to
   * opening the panel.
   */
  initiateZenDesk(): Promise<void>;
  private get iconTemplate();
  render(): TemplateResult;
  static get styles(): CSSResultGroup;
}
