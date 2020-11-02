import {
  html,
  fixture,
  expect
} from '@open-wc/testing';
import '../src/ia-zendesk-help-widget';

const testwidgetSrc = '/base/test/mock-zen-desk.js';

const component = (properties = {
  widgetSrc: testwidgetSrc
}) => (
  html`
    <ia-zendesk-help-widget
      widgetSrc=${properties.widgetSrc}
    ></ia-zendesk-help-widget>`
);

let testableVariable = false;
function testableCode() {
  let counter = 1;
  const interval = setInterval(() => {
    counter += 1;

    if (counter >= 5) {
      testableVariable = true;
      clearInterval(interval);
    }
  }, 200);

  return interval;
}

describe('<zendesk-help-widget>', () => {
  it('renders help button texts', async () => {
    const el = await fixture(component());
    const span = el.shadowRoot.querySelector('span');
    expect(span.innerText).to.contain('Help');
  });

  it('change isLoading state on button click', async () => {
    const el = await fixture(component());
    el.widgetSrc = testwidgetSrc;
    el.buttonVisible = true;

    el.shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.isLoading).to.be.true;
  });

  it('get visibilityState on initial props', async () => {
    const el = await fixture(component());

    el.widgetSrc = testwidgetSrc;
    el.buttonVisible = false;

    await el.updateComplete;

    expect(el.buttonVisibilityState).to.equal('hidden');
  });

  it('terminate before completing interval', (done) => {
    testableCode();
    setTimeout(() => {
      expect(testableVariable).to.be.true;
      done();
    }, 1000);
  });
});
