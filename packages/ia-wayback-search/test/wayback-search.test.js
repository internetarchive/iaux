import {
  html,
  fixture,
  expect,
  oneEvent
} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/ia-wayback-search';

const component = (properties = {
  waybackPagesArchived: '32 trillion pages'
}, baseHost = 'archive.org') => (
  html`
    <ia-wayback-search
      .baseHost=${baseHost}
      waybackPagesArchived=${properties.waybackPagesArchived}
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
    const performQuery = sinon.fake();
    const el = await fixture(component());
    el.queryHandler = { performQuery };

    submitEvent.target = el.shadowRoot.querySelector('form');
    el.shadowRoot.getElementById('url').value = query;
    el.handleSubmit(submitEvent);
    expect(performQuery.callCount).to.equal(1);
    expect(performQuery.firstArg).to.contain(query);
  });

  it('renders the Wayback pages count', async () => {
    const config = { waybackPagesArchived: 42 };
    const el = await fixture(component(config));
    const p = el.shadowRoot.querySelector('p');

    expect(p.innerText).to.contain(config.waybackPagesArchived);
  });

  it('emits an event when Wayback logo clicked', async () => {
    const el = await fixture(component());

    setTimeout(() => el.emitWaybackMachineLogoLinkClicked());
    const response = await oneEvent(el, 'waybackMachineLogoLink');

    expect(response).to.exist;
  });

  it('emits an event when machine stats link clicked', async () => {
    const el = await fixture(component());

    setTimeout(() => el.emitWaybackMachineStatsLinkClicked());
    const response = await oneEvent(el, 'waybackMachineStatsLinkClicked');

    expect(response).to.exist;
  });

  it('emits an event when form submitted', async () => {
    const el = await fixture(component());

    setTimeout(() => el.emitWaybackSearchSubmitted());
    const response = await oneEvent(el, 'waybackSearchSubmitted');

    expect(response).to.exist;
  });

  it('uses the baseHost property when setting the logo anchor\'s href', async () => {
    const host = 'archive.onion';
    const el = await fixture(component({}, host));

    expect(el.shadowRoot.querySelector('fieldset a').getAttribute('href')).to.contain(host);
  });
});
