import { html, LitElement } from 'lit-element';
import zendeskWidgetCSS from './styles/zendesk-widget';
import questionIcon from './icon-question-mark';

class ZenDeskHelpWidget extends LitElement {
  static get styles() {
    return zendeskWidgetCSS;
  }

  static get properties() {
    return {
      widgetSrc: { type: String },
    };
  }

  constructor() {
    super();
    this.widgetSrc = '';
  }

  initiateZenDesk(e) {
    // Hide button
    e.target.style.opacity = 0;

    if (this.abortIfScriptAlreadyLoaded()) return;

    // Inject help widget
    this.injectScript();

    let countdownTicksLeft = 20;
    const timeoutTimer = setInterval(() => {
      // See if button has appeared
      const iframe = document.getElementById('launcher');
      if (iframe) {
        const button = iframe.contentWindow.document.querySelector('button');
        if (button) {
          // Found it! Click on it and hope the window opens!
          button.click();
          clearInterval(timeoutTimer);
          return;
        }
      }

      // Try again later
      countdownTicksLeft--;
      if (countdownTicksLeft <= 0) clearInterval(timeoutTimer);
    }, 250);
  }

  injectScript() {
    const script = document.createElement('script');
    script.setAttribute('id', 'ze-snippet');
    script.setAttribute('src', this.widgetSrc);
    document.head.appendChild(script);    
  }

  abortIfScriptAlreadyLoaded() {
    if (document.querySelector(`script[src="${this.widgetSrc}"]`)) return;
  }

  render() {
    return html`
      <div
        class="help-widget"
        @click=${this.initiateZenDesk}
      >${questionIcon} <span class="hidden-sm">Help</span></div>`;
  }
}

customElements.define('ia-zendesk-help-widget', ZenDeskHelpWidget);

export default ZenDeskHelpWidget;
