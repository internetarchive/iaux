import {
  html,
  fixture,
  expect,
  oneEvent
} from '@open-wc/testing';
import '../src/ia-zendesk-help-widget';

const testwidgetSrc = '/base/test/mock-zendesk/iframe-loader.js';

const component = (properties = {
  widgetSrc: testwidgetSrc
}) => (
  html`
    <ia-zendesk-help-widget
      widgetSrc=${properties.widgetSrc}
    ></ia-zendesk-help-widget>`
);

describe('<zendesk-help-widget>', () => {
  it('renders help button texts', async () => {
    const el = await fixture(component());
    const span = el.shadowRoot.querySelector('span');
    expect(span.innerText).to.contain('Help');
  });

  it('clicks on the iframe button to activate the zendesk window', async () => {
    const el = await fixture(component());
    const button = el.shadowRoot.querySelector('button');
    button.click();
    const response = await oneEvent(window, 'message');
    expect(el.buttonVisible).to.equal(false);
    expect(response).to.exist;
    expect(response.data).to.equal('button clicked');
  });

  it('emits an event when help button clicked', async () => {
    const el = await fixture(component());

    setTimeout(() => el.emitZendeskHelpButtonClicked());
    const response = await oneEvent(el, 'zendeskHelpButtonClicked');
    expect(response).to.exist;
  });

  it('get visibilityState on initial props', async () => {
    const el = await fixture(component());

    el.widgetSrc = testwidgetSrc;
    el.buttonVisible = false;

    await el.updateComplete;

    expect(el.buttonVisibilityState).to.equal('hidden');
  });
});
