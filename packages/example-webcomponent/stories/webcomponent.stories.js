import {
  html,
  storiesOf,
  withKnobs,
  color,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import HelloComponent from '../index';

storiesOf('<hello-component>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(HelloComponent))
  .add('Styling', () => (
    html`
      <style>
        hello-component {
          --buttonText: ${color('Button text', '#ffffff')};
          --defaultBG: ${color('Button BG', '#0066cc')};
          --activeBG: ${color('Button active BG', '#333333')};
        }
      </style>
      <hello-component></hello-component>
    `
  ));
