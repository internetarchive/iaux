import { html, css, LitElement } from 'lit-element';
import { LazyLoaderService } from '@internetarchive/lazy-loader-service';
import loaderIcon from './assets/icon-loader';
import questionIcon from './assets/icon-question';

class ZenDeskHelpWidget extends LitElement {
  static get properties() {
    return {
      widgetSrc: { type: String },
      buttonVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.widgetSrc = '';
    this.buttonVisible = false;
    this.isLoading = false;
  }

  async initiateZenDesk() {
    this.isLoading = true;

    // force UI update to render loader icon after button click
    this.requestUpdate();

    // load third-party script
    const lazyLoaderService = new LazyLoaderService();
    await lazyLoaderService.loadScript({
      attributes: [{ key: 'id', value: 'ze-snippet' }],
      src: this.widgetSrc,
    });

    let countdownTicksLeft = 20;
    const timeoutTimer = setInterval(() => {
      // See if button has appeared
      const iframe = document.getElementById('launcher');
      if (iframe) {
        const button = iframe.contentWindow.document.querySelector('button');
        if (button) {
          // Found it! Click on it and hope the window opens!
          button.click();
          this.buttonVisible = false;
          clearInterval(timeoutTimer);
          return;
        }
      }

      // Try again later
      countdownTicksLeft -= 1;
      if (countdownTicksLeft <= 0) clearInterval(timeoutTimer);
    }, 250);
  }

  get buttonVisibilityState() {
    return !this.buttonVisible ? 'hidden' : '';
  }

  get getActiveIcon() {
    return this.isLoading ? loaderIcon : questionIcon;
  }

  render() {
    return html`
      <button
        class="help-widget ${this.buttonVisibilityState}"
        @click=${this.initiateZenDesk}
        data-event-click-tracking="ZenDesk|InitialHelpButton"
      >${this.getActiveIcon}<span class="hidden-sm">Help</span></button>`;
  }

  static get styles() {
    return css`
      :host {
        --buttonBlue: #194880;
        --white: #fff;

        --iconFillColor: var(--white);
        --linkColor: var(--white);
      }

      .help-widget {
        width: 108px;
        height: 46px;
        margin: 14px 20px;
        position: fixed;
        bottom: 0px;
        z-index: 999998;
        transition-duration: 250ms;
        right: 0px;
        background: var(--buttonBlue);
        color: var(--linkColor);
        letter-spacing: 0.6px;
        font-size: inherit;
        transition: opacity 0.12s linear;
        border-radius: 999rem;
        border: 0;
        outline: none;
        font-weight: 700;
        cursor: pointer;
        vertical-align: middle;
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .help-widget svg {
        vertical-align: middle;
        margin-right: 3px;
        pointer-events: none;
      }

      .help-widget .hidden-sm {
        pointer-events: none;
      }

      .hidden {
        opacity: 0;
        display: none;
        visibility: hidden;
      }

      @media (max-width: 767px) {
        .hidden-sm {
          display:none;
        }

        .help-widget {
          padding: 13px 13px;
          width: initial;
        }

        .help-widget svg {
          margin-right: 0;
        }
      }`;
  }
}

customElements.define('ia-zendesk-help-widget', ZenDeskHelpWidget);

export default ZenDeskHelpWidget;
