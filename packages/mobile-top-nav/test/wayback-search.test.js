import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/wayback-search';

describe('<wayback-search>', () => {
  xit('redirects on submit', async () => {
    const waybackInstance = await fixture(html`<wayback-search></wayback-search>`);
    // For some reason, even if the contents of the original method are commented out,
    // the redirect occurs when running tests
    const submitCallback = sinon.stub(waybackInstance, 'redirectToWayback').callsFake(() => {});

    waybackInstance.shadowRoot.getElementById('url').value = 'archive.org';
    waybackInstance.shadowRoot.querySelector('form').submit();
    expect(submitCallback).to.have.been.called;
  });
});
