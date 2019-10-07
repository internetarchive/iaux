import { storiesOf, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import IAMobileTopNav from '../index';

storiesOf('IAMobileTopNav', module)
  .addDecorator(withKnobs)
  .add('Scrubber Bar Options', () => withClassPropertiesKnobs(IAMobileTopNav));
