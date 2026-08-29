import {
  storiesOf,
  withKnobs,
  html,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import LyricsModal from '../index';

storiesOf('<lyrics-modal>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(LyricsModal, {
    template: html`
      <lyrics-modal artist='King Crimson' song='I Talk to the Wind' visible=${true}></lyrics-modal>
    `
  }));
// .add('Styling', () => (
//   html`
//     <style>
//       lyrics-modal {
//         --buttonText: ${color('Button text', '#ffffff')};
//         --defaultBG: ${color('Button BG', '#0066cc')};
//         --activeBG: ${color('Button active BG', '#333333')};
//       }
//     </style>
//     <hello-component></hello-component>
//   `
// ));
