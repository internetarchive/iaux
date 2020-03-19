import { LitElement, html, css } from 'lit-element';
import TrackedElement from './tracked-element';

class ExampleComponent extends LitElement {
  static get styles() {
    return css`
      fieldset {
        padding: 0;
        border: 0;
      }
      button {
        display: inline-block;
        width: 320px;
        height: 40px;
        padding: 10px 24px;
        font-size: 16px;
        line-height: 16px;
        box-sizing: border-box;
      }
    `;
  }

  static get properties() {
    return {
      eventActions: { type: Array },
      eventCategory: { type: String },
    };
  }

  constructor() {
    super();
    this.eventCategory = 'ExampleTracker';
  }

  click(e) {
    this.trackEvent({
      eventName: 'buttonClicked',
      eventCategory: this.eventCategory,
      eventAction: e.currentTarget.dataset.analyticsAction,
    });
  }

  submit(e) {
    this.trackEvent({
      eventName: 'formSubmitted',
      eventCategory: this.eventCategory,
      eventAction: 'Submit',
    });
    e.preventDefault();
  }

  button(action) {
    return html`
      <button @click=${this.click} data-analytics-action="${action}">Send "${action}" to click tracker</button>
    `;
  }

  render() {
    return html`
      <h1>Click and Submit Tracking</h1>
      <p>View the console for event logging example</p>
      <form action="" method="GET" @submit=${this.submit}>
        <fieldset>
          ${this.eventActions.map(this.button.bind(this))}
        </fieldset>
      </form>
    `;
  }
}

Object.assign(ExampleComponent.prototype, TrackedElement);

customElements.define('example-component', ExampleComponent);
