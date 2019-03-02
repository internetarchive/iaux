import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import IAJSTestComponent from './index';

/**
 * Here are some examples of how to create a story and use add-ons
 */
storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('IAJS Test Component', () => {
    const identifier = text('identifier', '@rchrd2');

    return <IAJSTestComponent identifier={identifier} />
  })

