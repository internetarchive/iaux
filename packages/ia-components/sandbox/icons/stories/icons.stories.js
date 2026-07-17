import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import ICON from '../icon';
storiesOf('Icons', module)
	.addWithJSX('Icon', () => {
		const type = text('type', '');
		const size = number('size', 60);
		const color = text('color', '')
		const name = text('name', 'archive')

		return <ICON type={type} size={size} color={color} name={name} />
	})
