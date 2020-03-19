export default {
  trackEvent({ eventName, eventCategory, eventAction }) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        eventCategory,
        eventAction,
      },
    }));
  }
};
