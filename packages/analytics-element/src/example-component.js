import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';

customElements.define('example-component', class extends TrackedElement {
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

  click(e) {
    this.trackClick(e);
  }

  submit(e) {
    this.trackSubmit(e);
    e.preventDefault();
  }

  render() {
    return html`
      <h1>Click and Submit Tracking</h1>
      <p>View the console for event logging example</p>
      <form action="" method="GET" @submit=${this.submit} data-event-submit-tracking="ExampleTracker|Submit">
        <fieldset>
          <button @click=${this.click} data-event-click-tracking="ExampleTracker|Click">Track click</button
        </fieldset>
      </form>
    `;
  }
});
