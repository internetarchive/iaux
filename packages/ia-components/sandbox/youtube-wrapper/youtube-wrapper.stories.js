import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import YoutubePlayerTestComponent from '../theatres/components/audio-player/players_by_type/youtube-player';

storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Youtube Wrapper', () => {
    const videoId = text('videoId', '9QbltzIUV6w');
    const height = number('height',400);
    const width = number('width', 600);

    return <YoutubePlayerTestComponent 
                videoId={videoId} 
                height={height}
                width={width}
                />
  })

