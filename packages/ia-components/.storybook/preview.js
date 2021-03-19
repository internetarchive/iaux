const { addDecorator } = require('@storybook/react');
const { jsxDecorator } = require('storybook-addon-jsx');

addDecorator(jsxDecorator);

import '!style-loader!css-loader!less-loader!../index.less';
import '!style-loader!css-loader!less-loader!./theatre-styling.less';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}