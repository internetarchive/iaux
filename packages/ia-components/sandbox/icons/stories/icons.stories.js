import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import ICON from '../icon';
import IconLogo from '../customsvg/ia-logo-white-icon';

storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Icon', () => {
    const type = text('type', 'notavatar');
    const size = number('size',400);
    const color= text('color','red')
    const name= text('name','home')
    
    return <ICON
              type={type}
              size={size}
              color={color}
              name={name}/>
  })
  .addWithJSX('Icon logo',()=>{
    return <IconLogo/>
})