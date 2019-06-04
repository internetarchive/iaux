import style from './track-list.less';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import TrackList from './track-list';

 storiesOf('Theatres', module)
  .addWithJSX('Tract List', () => {
    const tracks = [
      {
        source: 'derivative',
        creator: 'Willie Nelson',
        title: 'Night Life',
        track: '1',
        album: 'The Essential Willie Nelson',
        bitrate: '108',
        length: '00:30',
        format: 'MP3 Sample',
        original: 'disc1/01.01. Willie Nelson - Night Life.flac',
        mtime: '1510662255',
        size: '514560',
        md5: '6beff838f9805e0e53d661cdc7f58325',
        crc32: '447db8a5',
        sha1: 'ac10d01321a3aba6d359657b7a849b01735769e8',
        height: '0',
        width: '0',
        name: 'disc1/01.01. Willie Nelson - Night Life_sample.mp3',
        fullFilePath: 'https://ia600103.us.archive.org/16/items/cd_the-essential-willie-nelson_willie-nelson-aerosmith-emmylou-harris-jul/disc1%2F01.01.%20Willie%20Nelson%20-%20Night%20Life_sample.mp3',
        trackNumber: 1
      }
    ];
    
     return <TrackList 
                selectedTrack={1}
                tracks={tracks}
                displayTrackNumbers={true}
                creator="Willie Nelson"
                onSelected={()=>{alert('track clicked')}}/>
  })
