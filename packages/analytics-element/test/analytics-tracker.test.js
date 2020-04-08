import { html, fixture, expect } from '@open-wc/testing';
import '../src/example-component';

describe('AnalyticsTracker', () => {
  it('fires click and submit events when button clicked', async () => {
    const actions = ['foo'];
    let clickFired = false;
    let submitFired = false;
    const buttonClicked = () => {
      clickFired = true;
    };
    const formSubmitted = () => {
      submitFired = true;
    };
    const el = await fixture(html`
      <example-component
        .eventCategory='Events'
        .eventActions=${actions}
        @buttonClicked=${buttonClicked}
        @formSubmitted=${formSubmitted}></example-component>`);

    el.addEventListener('trackEvent', () => {
      clickFired = true;
    });

    el.addEventListener('trackSubmit', () => {
      submitFired = true;
    });

    setTimeout(el.shadowRoot.querySelector('button').click());
    expect(clickFired).to.be.true;
    expect(submitFired).to.be.true;
  });
});
