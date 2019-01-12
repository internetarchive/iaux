import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';

import { IAExampleComponent } from '../../index';
import style from './styles.less';

/**
 * Here are some examples of how to create a story and use add-ons
 */
storiesOf('Examples', module)
  .addWithJSX('IA Example ReactJS Component', () => (
    <IAExampleComponent>
      <p>We are live from the archive.</p>
    </IAExampleComponent>
  ))
  .add('A11y - Accessible element', () => (
    <button>
      This button element passes accessibility
    </button>
  ))
  .add('A11y - Inaccessible element', () => (
    <button style={{ backgroundColor: 'red', color: 'darkRed' }}>
      Inaccessible button
    </button>
  ))
  .add('Knobs - dynamically update props & variables', () => {
    const name = text('Name', 'Ar Chive');
    const age = number('Age', 89);
    const boolz = boolean('Like Ice Cream', false);
  
    const content = `I am ${name} and I'm ${age} years old. It is ${boolz} that I like ice cream`;
    return (<div>{content}</div>);
  })


