import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type SVGTemplateResult,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { loaderIcon } from './loader-icon';
import { questionIcon } from './question-icon';
import { loadZendeskScript, waitForZendesk } from './zendesk-service';

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
 * @cssprop [--button-padding=14px] - Button padding.
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
 * @example
 * ```html
 * <ia-zendesk-help-widget
 *   .widgetKey="YOUR_KEY"
 * ></ia-zendesk-help-widget>
 * ```
 *
 * @example Customised appearance
 * ```html
 * <ia-zendesk-help-widget
 *   .widgetKey="YOUR_KEY"
 *   style="
 *     --button-background: #e03b3b;
 *     --button-width: 130px;
 *     --button-bottom: 20px;
 *     --button-right: 20px;
 *   "
 * ></ia-zendesk-help-widget>
 * ```
 */
@customElement('ia-zendesk-help-widget')
export class IAZendeskHelpWidget extends LitElement {
  /** Zendesk account key from the `ze-snippet` URL. */
  @property({ type: String }) widgetKey?: string;

  /** True from the first click until the Zendesk script resolves. Shows the spinner. */
  @state() private isLoading = false;

  /** Guards against re-loading the script and re-waiting on subsequent clicks. */
  private zendeskReady = false;

  /**
   * Click handler for the Help button.
   *
   * On the first call: injects the Zendesk script and waits for `window.zE`
   * to become available, then opens the panel.
   *
   * On subsequent calls: the script is already present so we go straight to
   * opening the panel.
   */
  async initiateZenDesk(): Promise<void> {
    this.isLoading = true;
    this.dispatchEvent(new Event('zendeskHelpButtonClicked'));

    try {
      if (!this.widgetKey) {
        throw new Error('Missing widgetKey');
      }

      if (!this.zendeskReady) {
        await loadZendeskScript(this.widgetKey);
        await waitForZendesk();
        this.zendeskReady = true;
      }

      window.zE?.('messenger', 'open');
    } catch (err) {
      console.error('[ia-zendesk-help-widget]', err);
    } finally {
      this.isLoading = false;
    }
  }

  private get iconTemplate(): SVGTemplateResult {
    return this.isLoading ? loaderIcon : questionIcon;
  }

  render(): TemplateResult {
    return html`
      <button class="help-widget" @click=${this.initiateZenDesk}>
        ${this.iconTemplate}
        <span class="label">Help</span>
      </button>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .help-widget {
        position: fixed;
        top: var(--button-top, auto);
        bottom: var(--button-bottom, 0);
        left: var(--button-left, auto);
        right: var(--button-right, 0);
        z-index: var(--button-z-index, 999998);
        width: var(--button-width, auto);
        padding: var(--button-padding, 14px);
        margin: var(--button-margin, 14px 20px);
        background: var(--button-background, #194880);
        color: var(--button-color, #fff);
        border-radius: var(--button-border-radius, 999rem);
        border: 0;
        font-size: var(--button-font-size, 14px);
        font-weight: var(--button-font-weight, 700);
        letter-spacing: 0.6px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: opacity 0.12s linear;
      }

      .fill-color {
        fill: var(--button-color, #fff);
      }

      .help-widget svg {
        vertical-align: middle;
        pointer-events: none;
      }

      .label {
        pointer-events: none;
        margin-left: 5px;
      }

      @media (max-width: 767px) {
        .label {
          display: none;
        }
      }
    `;
  }
}
