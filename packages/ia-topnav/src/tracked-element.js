import { LitElement } from 'lit';

class TrackedElement extends LitElement {
  trackClick(e) {
    const event = e.currentTarget.dataset.eventClickTracking;
    this.dispatchEvent(
      new CustomEvent('trackClick', {
        bubbles: true,
        composed: true,
        detail: {
          event,
        },
      }),
    );
  }

  trackSubmit(e) {
    const event = e.currentTarget.dataset.eventSubmitTracking;
    this.dispatchEvent(
      new CustomEvent('trackSubmit', {
        bubbles: true,
        composed: true,
        detail: {
          event,
        },
      }),
    );
  }
}

export default TrackedElement;
