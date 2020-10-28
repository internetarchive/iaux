import {
  html,
  fixture,
  expect,
  oneEvent
} from '@open-wc/testing';
import '../src/ia-zendesk-help-widget';

const container = (config = {}) => (
  html`<ia-zendesk-help-button .config=${config}></ia-zendesk-help-button>`
);
const component = (properties = {
  widgetSrc: 'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d',
  buttonVisible: true
}) => (
  html`
    <ia-zendesk-help-widget
      widgetSrc=${properties.widgetSrc}
      buttonVisible=true
    ></ia-zendesk-help-widget>`
);

describe('<zendesk-help-widget>', () => {
  it('renders help button texts', async () => {
    const el = await fixture(component());
    const span = el.shadowRoot.querySelector('span');
    expect(span.innerText).to.contain('Help');
  });

  it('change isLoading state on button click', async () => {
    const el = await fixture(component());

    el.widgetSrc = 'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d';
    el.buttonVisible = true;
    el.isLoading = false;
    el.shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.isLoading).to.be.true;
  });

  it('get visibilityState on initial props', async () => {
    const el = await fixture(component());

    el.widgetSrc = 'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d';
    el.buttonVisible = false;
    el.isLoading = false;
    await el.updateComplete;

    expect(el.buttonVisibilityState).to.equal('hidden');
  });
});
