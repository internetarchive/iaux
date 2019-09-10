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

  expect(dataFlattened).toBeInstanceOf(Object);

  describe('has main image file', () => {
    test('when `*_itemimage.png` is available, it uses it as the image to display', () => {
      expect(itemPhoto).toContain('_itemimage.png');
    });
  });

  describe('should always have certain keys at the top level', () => {
    test('has albumSpotifyYoutubeInfo', () => {
      expect(dataFlattened).toHaveProperty('albumSpotifyYoutubeInfo');
      expect(albumSpotifyYoutubeInfo).toBeInstanceOf(Object);
    });
    test('has tracks', () => {
      expect(dataFlattened).toHaveProperty('tracks');
      expect(tracks).toBeInstanceOf(Array);
    });
    test('has albumMetadaToDisplay', () => {
      expect(dataFlattened).toHaveProperty('albumMetadaToDisplay');
      expect(albumMetadaToDisplay).toBeInstanceOf(Object);
    });
    test('has identifier', () => {
      expect(dataFlattened).toHaveProperty('identifier');
      expect(identifier).toBeInstanceOf(Array);
    });
    test('has itemPhoto', () => {
      expect(dataFlattened).toHaveProperty('itemPhoto');
      expect(itemPhoto).toBeDefined();
      expect(itemPhoto).toBeTruthy();
    });
    test('has title', () => {
      expect(dataFlattened).toHaveProperty('title');
      expect(title).toBeInstanceOf(Array);
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
      expect(albumMetadaToDisplay).toHaveProperty('creator');
      expect(stringifiedCreator).toBeDefined();
      expect(stringifiedCreator).toBeTruthy();
    });
    test('has title', () => {
      expect(albumMetadaToDisplay).toHaveProperty('title');
      expect(stringifiedTitle).toBeDefined();
      expect(stringifiedTitle).toBeTruthy();
    });
    test('has identifier', () => {
      expect(albumMetadaToDisplay).toHaveProperty('identifier');
      expect(stringifiedID).toEqual(dataFlattened.identifier[0]);
      expect(stringifiedID).toBeDefined();
      expect(stringifiedID).toBeTruthy();
    });
    test('has collection', () => {
      expect(albumMetadaToDisplay).toHaveProperty('collection');
      expect(collection.split(',').length).toEqual(dataFlattened.collection.length);
      expect(collection).toBeDefined();
      expect(collection).toBeTruthy();
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
      expect(firstTrack).toHaveProperty('sampleMP3');
      expect(sampleMP3).toBeInstanceOf(Object);
    });
    test('has fullMP3', () => {
      expect(firstTrack).toHaveProperty('fullMP3');
      expect(fullMP3).toBeInstanceOf(Object);
    });
    test('has fullFilePath', () => {
      expect(firstTrack).toHaveProperty('fullFilePath');
      expect(fullFilePath).toBeDefined();
      expect(fullFilePath).toBeTruthy();
    });
    test('has relatedFiles', () => {
      expect(firstTrack).toHaveProperty('relatedFiles');
      expect(relatedFiles).toBeInstanceOf(Object);
    });
    test('has waveformURL', () => {
      expect(firstTrack).toHaveProperty('waveformURL');
      expect(waveformURL).toBeDefined();
      expect(waveformURL).toBeTruthy();
    });
    test('has spotify if available', () => {
      expect(firstTrack).toHaveProperty('spotify');
      expect(spotify).toBeInstanceOf(Object);
    });
    test('has youtube if available', () => {
      expect(firstTrack).toHaveProperty('youtube');
      expect(youtube).toBeInstanceOf(Object);
    });
  });
});
