import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import MultimodeImageViewer from './multimode-image-viewer';

storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Multimode Image Viewer Component', () => {
    const imageLink='https://ia802606.us.archive.org/13/items/brooklynmuseum-o450-george-washington/brooklynmuseum-o450i000-34.1178_SL1.jpg';
    const imageURL=text('imageURL',imageLink);
    return <MultimodeImageViewer imageURL={imageURL} />
  })

