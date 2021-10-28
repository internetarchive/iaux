import getTracklistBySource from './get-track-list-by-source';


const albumSampleStub = {
  playSamples: true,
  tracks: [
    {
      sampleMP3: {
        name: 'disc1/01. William Hanna; Joseph Barbera - Top Ten Famous Sound Effects_sample.mp3',
        source: 'derivative',
        creator: 'William Hanna; Joseph Barbera',
        title: 'Top Ten Famous Sound Effects',
        track: '1',
        album: 'Hanna-Barbera Cartoon Sound Fx',
        bitrate: '123',
        length: '00:30',
        format: 'MP3 Sample',
        original: 'disc1/01. William Hanna; Joseph Barbera - Top Ten Famous Sound Effects.flac',
        mtime: '1507873008',
        size: '540160',
        md5: '346e68690c19cae8d2451237cb1d874b',
        crc32: 'ba0ce6d5',
        sha1: '188c34165cb01c1e4b77b9d3c2533bd8b18d5b40',
        height: '0',
        width: '0',
        fullFilePath: 'https://ia800103.us.archive.org/29/items/cd_hanna-barbera-ca…arbera%20-%20Top%20Ten%20Famous%20Sound%20Effects_sample.mp3'
      }
    },
    {
      sampleMP3: {
        name: 'disc1/01. William Hanna; Joseph Barbera - Top Ten Famous Sound Effects_sample.mp3',
        source: 'derivative',
        creator: 'William Hanna; Joseph Barbera',
        title: 'Top Ten Famous Sound Effects',
        track: '1',
        album: 'Hanna-Barbera Cartoon Sound Fx',
        bitrate: '123',
        length: '22.6',
        format: 'MP3 Sample',
        original: 'disc1/01. William Hanna; Joseph Barbera - Top Ten Famous Sound Effects.flac',
        mtime: '1507873008',
        size: '540160',
        md5: '346e68690c19cae8d2451237cb1d874b',
        crc32: 'ba0ce6d5',
        sha1: '188c34165cb01c1e4b77b9d3c2533bd8b18d5b40',
        height: '0',
        width: '0',
        fullFilePath: 'https://ia800103.us.archive.org/29/items/cd_hanna-barbera-ca…arbera%20-%20Top%20Ten%20Famous%20Sound%20Effects_sample.mp3'
      }
    }
  ]
};

describe('Music Player - parse tracklist by source', () => {
  describe('source: archive', () => {
    it('displays pre-formatted time', () => {
      const [firstTrack, secondTrack] = getTracklistBySource(albumSampleStub, 'archive');
      // sample track length has been pre-set. we will use that
      expect(firstTrack.formattedLength).toEqual(albumSampleStub.tracks[0].sampleMP3.length);
      // sample track length has NOT been set, it is by seconds.  we will format
      expect(secondTrack.formattedLength).not.toBe(albumSampleStub.tracks[1].sampleMP3.length);
      expect(secondTrack.formattedLength).toEqual('0:23');
    });
  });
});
