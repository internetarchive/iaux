import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import YoutubePlayerTestComponent from './YoutubePlayer';

storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Youtube Player Test Component', () => {
    const videoId = text('videoId', '9QbltzIUV6w');
    const height = number('height',400);
    const width = number('width', 600);

    return <YoutubePlayerTestComponent 
                videoId={videoId} 
                height={height}
                width={width}
                />
  })

