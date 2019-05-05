import React from 'react';
import { storiesOf } from '@storybook/react';
import YoutubeWrapper from '../youtube-wrapper';
import albumMetaData from '../../theatres/with-youtube-spotify/utils/data-for-stories/album-private-with-spotify-youtube';


const {itemInfo}=albumMetaData;

 storiesOf('Youtube', module)
  .addWithJSX('Youtube Wrapper', () => {
      
     return <YoutubeWrapper
                albumMetaData={itemInfo}/>

  })
