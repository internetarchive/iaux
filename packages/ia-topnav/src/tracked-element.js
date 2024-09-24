import { LitElement } from 'https://offshoot.prod.archive.org/lit.js';

class TrackedElement extends LitElement {
  trackClick(e) {
    const event = e.currentTarget?.dataset?.eventClickTracking;
    if (event === undefined) return;
    this.dispatchEvent(new CustomEvent('trackClick', {
      bubbles: true,
      composed: true,
      detail: {
        event
      },
    }));
  }

  trackSubmit(e) {
    const event = e.currentTarget?.dataset?.eventSubmitTracking;
    if (event === undefined) return;
    this.dispatchEvent(new CustomEvent('trackSubmit', {
      bubbles: true,
      composed: true,
      detail: {
        event
      },
    }));
  }
}

export default TrackedElement;
