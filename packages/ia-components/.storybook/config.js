import { configure, addDecorator, setAddon } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'
import JSXAddon from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import { withTests } from '@storybook/addon-jest';
import results from '../jest-test-utils/jest-test-results.json';

import style from './archive-cf7f2eh.less'

/**
 * pick all *.stories.js files within the ia-components directory
 */
const allStories = require.context('../', true, /(\.\/)(live|sandbox)([\w\d\/\-\_]+)(\.stories\.js)/)

/**
 * Set all globally used add-ons here
 */
addDecorator(checkA11y)
setAddon(JSXAddon)
addDecorator(withKnobs)
addDecorator(withTests({ results }))

/**
 * Dynamically load all stories.
 * A story file must have the following suffix: *.stories.js
 */
const loadStories = () => {
  allStories.keys().forEach(storyToRead => allStories(storyToRead));
}

configure(loadStories, module)
