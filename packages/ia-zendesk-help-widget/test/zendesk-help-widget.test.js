import {
  html,
  fixture,
  expect
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

let testableVariable = false;
function testableCode() {
  let counter = 1;
  const interval = setInterval(() => {
    if (counter === 5) {
      testableVariable = true;
      clearInterval(interval);
    }

    counter++;
  }, 500);

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

  it('terminate before completing interval', (done) => {
    testableCode();

    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const element = '<body><button id="launcher">help</button></body>';
    iframe.setAttribute('id', 'launcher');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(element);
    iframe.contentWindow.document.close();

    setTimeout(() => {
      expect(testableVariable).to.be.false;
      done();
    }, 1000);
  });

  it('Hide the button after click event', async () => {
    const widgetSrc = 'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d';
    const el = await fixture(html`<ia-zendesk-help-widget .widgetSrc=${widgetSrc} .buttonVisible></ia-zendesk-help-widget>`);
    el.shadowRoot.querySelector('.help-widget').click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.help-widget').classList.contains('hidden')).to.be.true;
  });
});
