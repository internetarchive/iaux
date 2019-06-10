import assert from 'assert';

import flattenAlbumData from './flatten-album-data';
import albumData from '../../../data-for-stories/album-private-with-spotify-youtube';

const { itemInfo } = albumData;

describe('Music Player Util - Flatten Album Data', () => {
  const dataFlattened = flattenAlbumData(itemInfo);
  const {
    tracks,
    albumSpotifyYoutubeInfo,
    albumMetadaToDisplay,
    identifier,
    itemPhoto,
    title,
  } = dataFlattened;
  const [firstTrack] = tracks;

  assert(dataFlattened instanceof Object);

  describe('should always have certain keys at the top level', () => {
    test('has albumSpotifyYoutubeInfo', () => {
      assert('albumSpotifyYoutubeInfo' in dataFlattened);
      assert(albumSpotifyYoutubeInfo instanceof Object);
    });
    test('has tracks', () => {
      assert('tracks' in dataFlattened);
      assert(tracks instanceof Array);
    });
    test('has albumMetadaToDisplay', () => {
      assert('albumMetadaToDisplay' in dataFlattened);
      assert(albumMetadaToDisplay instanceof Object);
    });
    test('has identifier', () => {
      assert('identifier' in dataFlattened);
      assert(identifier instanceof Array);
    });
    test('has itemPhoto', () => {
      assert('itemPhoto' in dataFlattened);
      assert.equal(typeof itemPhoto, 'string');
    });
    test('has title', () => {
      assert('title' in dataFlattened);
      assert(title instanceof Array);
    });
  });

  describe('albumMetadaToDisplay - string values of metadata', () => {
    const {
      title: stringifiedTitle,
      collection,
      creator: stringifiedCreator,
      identifier: stringifiedID,
    } = albumMetadaToDisplay;
    test('has creator', () => {
      assert('creator' in albumMetadaToDisplay);
      assert.equal(typeof stringifiedCreator, 'string');
    });
    test('has title', () => {
      assert('title' in albumMetadaToDisplay);
      assert.equal(typeof stringifiedTitle, 'string');
    });
    test('has identifier', () => {
      assert('identifier' in albumMetadaToDisplay);
      assert.equal(typeof stringifiedID, 'string');
      assert.equal(stringifiedID, dataFlattened.identifier[0]);
    });
    test('has collection', () => {
      assert('collection' in albumMetadaToDisplay);
      assert.equal(typeof collection, 'string');
      assert.equal(collection.split(',').length, dataFlattened.collection.length);
    });
  });

  describe('a track object', () => {
    const {
      fullMP3,
      fullFilePath,
      relatedFiles,
      sampleMP3,
      waveformURL,
      spotify,
      youtube,
    } = firstTrack;
    test('has sampleMP3', () => {
      assert('sampleMP3' in firstTrack);
      assert(sampleMP3 instanceof Object);
    });
    test('has fullMP3', () => {
      assert('fullMP3' in firstTrack);
      assert(fullMP3 instanceof Object);
    });
    test('has fullFilePath', () => {
      assert('fullFilePath' in firstTrack);
      assert.equal(typeof fullFilePath, 'string');
    });
    test('has relatedFiles', () => {
      assert('relatedFiles' in firstTrack);
      assert(relatedFiles instanceof Object);
    });
    test('has waveformURL', () => {
      assert('waveformURL' in firstTrack);
      assert.equal(typeof waveformURL, 'string');
    });
    test('has spotify if available', () => {
      assert('spotify' in firstTrack);
      assert(spotify instanceof Object);
    });
    test('has youtube if available', () => {
      assert('youtube' in firstTrack);
      assert(youtube instanceof Object);
    });
  });
});
