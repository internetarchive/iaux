import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import { ScrubberBar } from '../src/scrubber-bar.js';

storiesOf('scrubber-bar', module)
  .addDecorator(withKnobs)
  .add('Scrubber Bar Options', () => withClassPropertiesKnobs(ScrubberBar))
  .add(
    'Scrubber Bar Styling',
    () => html`
      <style>
        scrubber-bar {
          --thumbColor: ${color('Thumb Color', 'red', 'Colors')};
          --thumbBorder: ${text('Thumb Border', '1px solid black', 'Colors')};
          --trackFillColor: ${color('Track Fill Color', 'blue', 'Colors')};
          --trackColor: ${color('Track Color', 'black', 'Colors')};
          --trackBorder: ${text('Track Border', '1px solid black', 'Colors')};
          --trackBorderRadius: ${text('Track Border Radius', '5px', 'Layout')};
          --trackHeight: ${text('Track Height', '10px', 'Layout')};
          --thumbDiameter: ${text('Thumb Diameter', '20px', 'Layout')};
          --scrubberBarHeight: ${text('Scrubber Bar Height', '20px', 'Layout')};
          --thumbBorderRadius: ${text('Thumb Border Radius', '10px', 'Layout')};
          --webkitThumbTopMargin: ${text('Webkit Thumb Top Margin', '-6px', 'Layout')};
        }
      </style>
      <scrubber-bar></scrubber-bar>
    `,
  );
