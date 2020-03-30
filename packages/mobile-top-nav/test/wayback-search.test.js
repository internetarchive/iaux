import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/wayback-search';

describe('<wayback-search>', () => {
  it('redirects on submit', async () => {
    const query = 'archive.org';
    const submitEvent = {
      type: 'submit',
      preventDefault: () => {}
    };
    const locationHandler = sinon.fake();
    const waybackInstance = await fixture(html`<wayback-search .locationHandler=${locationHandler}></wayback-search>`);

    submitEvent.target = waybackInstance.shadowRoot.querySelector('form');
    waybackInstance.shadowRoot.getElementById('url').value = query;
    waybackInstance.handleSubmit(submitEvent);
    expect(locationHandler.callCount).to.equal(1);
    expect(locationHandler.firstArg).to.contain(query);
  });
});
