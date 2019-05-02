import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import YoutubeWrapper from '../youtube-wrapper';
import albumMetaData from '../../theatres/with-youtube-spotify/utils/data-for-stories/album-private-with-spotify-youtube';


const {itemInfo, jwplayerPlaylist}=albumMetaData;

 storiesOf('Youtube', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Youtube Wrapper', () => {
      
     return <YoutubeWrapper
                albumMetaData={itemInfo}/>

  })
