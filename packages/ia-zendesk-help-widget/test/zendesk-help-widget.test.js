import {
  html,
  fixture,
  expect,
  oneEvent
} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/ia-zendesk-help-widget';

const component = (properties = {
  widgetSrc: 'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d'
}) => (
  html`
    <ia-zendesk-help-widget
      widgetSrc=${properties.widgetSrc}
    ></ia-zendesk-help-widget>`
);
