import { html, LitElement } from 'lit-element';
import zendeskWidgetCSS from './styles/zendesk-widget';
import buttonIcons from './help-button-icons';
import { LazyLoaderService } from '@internetarchive/lazy-loader-service';

class ZenDeskHelpWidget extends LitElement {
  static get styles() {
    return zendeskWidgetCSS;
  }

  static get properties() {
    return {
      widgetSrc: { type: String },
      buttonVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.widgetSrc = '';
    this.buttonVisible = true;
  }

  async initiateZenDesk(e) {

    // toggle custom button visibility with spinner
    this.toggleButtonVisibility(e);

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
      countdownTicksLeft--;
      if (countdownTicksLeft <= 0) clearInterval(timeoutTimer);
    }, 250);
  }

  toggleButtonVisibility(e) {
    const loaderIcon = e.target.querySelector('.icon-loading-spinner');
    const questionIcon = e.target.querySelector('.icon-question-mark');

    if (loaderIcon) loaderIcon.classList.toggle('hidden');
    if (questionIcon) questionIcon.classList.toggle('hidden');
  }

  get buttonVisibilityState() {
    return !this.buttonVisible ? 'hidden' : '';
  }

  render() {
    return html`
      <button
        class="help-widget ${this.buttonVisibilityState}"
        @click=${this.initiateZenDesk}
        data-event-click-tracking="ZenDesk|InitialHelpButton"
      >${buttonIcons} <span class="hidden-sm">Help</span></button>`;
  }
}

customElements.define('ia-zendesk-help-widget', ZenDeskHelpWidget);

export default ZenDeskHelpWidget;
