import {
  includes,
  reduce,
  chain,
} from 'lodash';

import archiveDefaultAlbumParser from './archive-default-album-parser';
import archiveDerivedAlbumParser from './archive-derived-album-parser';
import gatherYoutubeAndSpotifyInfo from './youtube-spotify-parser';
import { isValidAudioFile, isValidImageFile } from './utils';

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
  const { collection, identifier: itemIdentifier } = albumMetadata;
  const fileDirectoryPrefix = `${server.includes('://') ? '' : 'https://'}${server}${directoryPath}/`

  let countSampleMP3 = 0;
  let countFullMP3 = 0;
  let countOriginalAudioFiles = 0;
  /**
   * Take original item's file list
   * & only return the files we are interested in
   */
  const slimFiles = allFiles.reduce((acc = [], file) => {
    const { name: fileName, source = '' } = file;
    const isValidAudio = isValidAudioFile(fileName);
    const isValidImage = isValidImageFile(fileName);
    const isNeededFile = isValidAudio || isValidImage;
    const fileIsDerived = source === 'derivative';
    const isSampleMP3 = fileName.match('_sample.mp3');
    const isMP3 = fileName.match('.mp3');

    if (!isNeededFile) {
      return acc;
    }

    if (isValidAudio) {
      if (isSampleMP3) {
        countSampleMP3 += 1;
      }

      if (isMP3 && fileIsDerived && !isSampleMP3) {
        countFullMP3 += 1;
      }

      if (source === 'original') {
        countOriginalAudioFiles += 1;
      }
    }

    acc.push(file);
    return acc;
  }, []);

  const playSamples = playFullIAAudio ? false : includes(collection, 'samples_only');
  const albumSpotifyYoutubeInfo = gatherYoutubeAndSpotifyInfo(albumMetadata['external-identifier']) || {};
  const trackFilter = ((countOriginalAudioFiles < countSampleMP3) || (countOriginalAudioFiles < countFullMP3))
    ? archiveDerivedAlbumParser
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
