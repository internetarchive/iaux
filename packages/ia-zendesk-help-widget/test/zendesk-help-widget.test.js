import {
  html,
  fixture,
  expect,
  oneEvent
} from '@open-wc/testing';
import '../src/ia-zendesk-help-widget';

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
});
