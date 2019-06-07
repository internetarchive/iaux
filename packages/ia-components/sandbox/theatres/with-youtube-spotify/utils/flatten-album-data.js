import {
  includes,
  reduce,
  chain,
  head,
} from 'lodash';

import archiveDefaultAlbumParser from './archive-default-album-parser';
import archiveLPAlbumParser from './archive-lp-album-parser';
import gatherYoutubeAndSpotifyInfo from './youtube-spotify-parser';

/**
 * Stringify Album details
 * This takes an album item's metadata and returns a stringified version or display purposes
 *
 * @param { object } albumMetadata
 * @returns { object } of stringified metadata values, including needed `creator` field
 */
const stringifyAlbumDetails = (albumMetadata) => {
  const { creator, artist } = albumMetadata;
  let normalizedMetadata = albumMetadata;

  // `creator` field is in all items that are scanned by the Internet Archive
  // let's make sure all audio items have a creator field,
  // to match internal scanned audio schema
  if (!creator) {
    const creatorVal = creator || artist || [''];
    const creatorFill = { creator: creatorVal };
    normalizedMetadata = Object.assign({}, albumMetadata, creatorFill);
  }

  const constructedData = reduce(normalizedMetadata, (stringifiedInfo, value, key) => {
    stringifiedInfo = stringifiedInfo || {};
    const isArray = Array.isArray(value);
    const delimiter = key === 'creator' ? '; ' : ', ';
    const newValue = isArray ? value.join(delimiter) : (value || '');
    stringifiedInfo[key] = newValue;
    return stringifiedInfo;
  }, {});
  return constructedData;
};

/**
 * Flatten Album Data
 * Reorganizes an album's metadata files by connecting files
 * according to the original uploaded tracks
 *
 * @param { object } metadata - return response from metadata API
 * @returns { array } of original tracks with nested related data
 */
const flattenAlbumData = (metadata, playFullIAAudio) => {
  const {
    dir: directoryPath,
    server,
    metadata: albumMetadata,
    files: allFiles
  } = metadata;
  const { collection, identifier } = albumMetadata;
  const fileDirectoryPrefix = `https://${server}${directoryPath}/`;
  const fileNames = Object.keys(allFiles);
  const itemIdentifier = head(identifier);

  /**
   * Take original item's file list
   * & only return the files we are interested in
   */
  const slimFiles = reduce(fileNames, (neededFiles = [], fileName) => {
    const neededExtensions = /(mp3|ogg|flac|m4a|jpg|png|jpeg|wma)$/gi;
    const isNeededFile = fileName.match(neededExtensions);
    const file = allFiles[fileName];
    file.name = fileName.slice(1, fileName.length);
    if (isNeededFile) {
      neededFiles.push(file);
    }
    return neededFiles;
  }, []);

  const playSamples = playFullIAAudio ? false : includes(collection, 'samples_only');
  const albumSpotifyYoutubeInfo = gatherYoutubeAndSpotifyInfo(albumMetadata['external-identifier']) || {};
  const trackFilter = includes(collection, 'album_recordings')
    ? archiveLPAlbumParser
    : archiveDefaultAlbumParser;

  const {
    tracks,
    itemPhotoCandidates,
    trackFilesHaveYoutubeSpotify
  } = trackFilter({ fileDirectoryPrefix, files: slimFiles, itemIdentifier });

  // What we need for display:
  const externalSourcesDisplayValues = {
    spotify: 'Spotify',
    youtube: 'YouTube'
  };

  const aggregatedExternalSources = chain([
    trackFilesHaveYoutubeSpotify,
    Object.keys(albumSpotifyYoutubeInfo)
  ])
    .flatten().uniq().value();

  const albumMetadaToDisplay = stringifyAlbumDetails(albumMetadata);
  const { designated, actual, formattedAsFirst } = itemPhotoCandidates;
  const albumData = Object.assign(
    {},
    albumMetadata,
    { albumMetadaToDisplay },
    {
      fileDirectoryPrefix,
      itemPhoto: designated || formattedAsFirst || actual || '',
      playSamples,
      tracks,
      albumSpotifyYoutubeInfo,
      externalSources: aggregatedExternalSources,
      externalSourcesDisplayValues
    },
  );
  return albumData;
};

export default flattenAlbumData;
