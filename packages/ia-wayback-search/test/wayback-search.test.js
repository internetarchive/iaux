import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/ia-wayback-search';

const component = (properties = {
  waybackPagesArchived: '32 trillion pages',
  waybackHost: 'archive.org',
}) => (
  html`
    <ia-wayback-search
      waybackPagesArchived=${properties.waybackPagesArchived}
      waybackHost=${properties.waybackHost}
    ></ia-wayback-search>
  `
);

describe('<wayback-search>', () => {
  it('redirects on submit', async () => {
    const query = 'archive.org';
    const submitEvent = {
      type: 'submit',
      preventDefault: () => {}
    };
    const locationHandler = sinon.fake();
    const el = await fixture(component());
    el.locationHandler = locationHandler;

    submitEvent.target = el.shadowRoot.querySelector('form');
    el.shadowRoot.getElementById('url').value = query;
    el.handleSubmit(submitEvent);
    expect(locationHandler.callCount).to.equal(1);
    expect(locationHandler.firstArg).to.contain(query);
  });

  it('renders the Wayback pages count', async () => {
    const config = { waybackPagesArchived: 42 };
    const waybackInstance = await fixture(component(config));
    const p = waybackInstance.shadowRoot.querySelector('p');

    expect(p.innerText).to.contain(config.waybackPagesArchived);
  });
});
