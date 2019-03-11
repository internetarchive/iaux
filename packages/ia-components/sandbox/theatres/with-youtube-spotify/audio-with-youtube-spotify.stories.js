import React from 'react';
import { storiesOf } from '@storybook/react';

import albumData from './utils/data-for-stories/album-private-with-spotify-youtube';
import AudioPlayerWithYoutubeSpotify from './audio-with-youtube-spotify-main';
import style from './audio-with-youtube-spotify.less';
import styles from './utils/data-for-stories/theatre-styling.less';

const { itemInfo, jwplayerPlaylist } = albumData;

storiesOf('Audio Player with Youtube & Spotify', module)
  .addWithJSX('samples only album with youtube & spotify', () => (
    <AudioPlayerWithYoutubeSpotify
      albumMetadata={itemInfo}
      jwplayerPlaylist={jwplayerPlaylist}
    />
  ));
