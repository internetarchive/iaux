import { LitElement } from "lit";

export default class TrackedElement extends LitElement {
  trackClick(e: Event) {
    const event = (e.currentTarget as HTMLElement)?.dataset?.eventClickTracking;
    if (event === undefined) return;
    this.dispatchEvent(
      new CustomEvent("trackClick", {
        bubbles: true,
        composed: true,
        detail: {
          event,
        },
      }),
    );
  }

  trackSubmit(e: Event) {
    const event = (e.currentTarget as HTMLElement)?.dataset
      ?.eventSubmitTracking;
    if (event === undefined) return;
    this.dispatchEvent(
      new CustomEvent("trackSubmit", {
        bubbles: true,
        composed: true,
        detail: {
          event,
        },
      }),
    );
  }
}
