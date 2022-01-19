import { endsWith, filter } from 'lodash';
import gatherYoutubeAndSpotifyInfo from './youtube-spotify-parser';
import { isValidAudioFile, isValidImageFile } from './utils';

/**
 * Internet Archive Default Album Data Parser
 * This sorts an Audio Item's files and:
 * - connects main track files with their related files (sample mp3, ogg, youtube, spotify, etc.)
 * - identifies possible main photo candidates
 * - flags which files have YouTube, Spotify external identifiers
 *
 * This targets items in this collections:
 *  - https://archive.org/details/acdc
 *  - https://archive.org/details/what_cd

 * To get expected schema, go to: https://archive.org/details/${identifier}?output=json
 * Please note that this schema is different than what metadataAPI produces
 * This choice was made because that is the data schema that /details page uses
 * Instead of making another call to metadata API, we will consume what is available
 *
 * @param { string } fileDirectoryPrefix
 * @param { array } files
 *
 * @returns { object } : tracks, itemPhotoCandidates, trackFilesHaveYoutubeSpotify
 *
 */
const archiveDefaultAlbumParser = ({ fileDirectoryPrefix, files }) => {
  let itemPhoto = '';
  const itemPhotoCandidates = {};
  const trackFilesHaveYoutubeSpotify = [];


  const tracks = files.reduce((neededItems = [], currentFile) => {
    const { source, name: currentFileName } = currentFile;
    const isPrivate = currentFile.private || null;
    let trackYoutubeAndSpotifyInfo = null;
    let flattenedImportantRelatedFiles = null;
    const externalIdentifiers = currentFile['external-identifier'] || null;
    const isOriginal = source === 'original';
    const isAudioFile = isValidAudioFile(currentFileName);
    const isItemImageFile = isOriginal && isValidImageFile(currentFileName);
    const isThumbnail = !!currentFileName.match(/__ia_thumb.jpg$/g);
    // skip unneeded files
    if (isThumbnail || (!isOriginal && !isAudioFile)) return neededItems;

    if (isItemImageFile) {
      itemPhoto = `${fileDirectoryPrefix}${encodeURIComponent(currentFileName)}`;

      const isFormatItemImage = !!currentFileName.match(/_itemimage./g); // can be jpg, png
      const isDesignatedFirstImage = !!currentFileName.match(/IMG_00001.jpg/g);
      const actualFirstImage = !!currentFileName.match(/IMG_0001.jpg/g);

      if (isDesignatedFirstImage) {
        itemPhotoCandidates.designated = itemPhoto;
      } else if (actualFirstImage) {
        itemPhotoCandidates.actual = itemPhoto;
      } else if (isFormatItemImage) {
        itemPhotoCandidates.formattedAsFirst = itemPhoto;
      } else {
        itemPhotoCandidates.actual = itemPhoto;
      }
    }

    if (isOriginal && isAudioFile) {
      // get related files
      const relatedFiles = filter(files, thisFile => thisFile.original === currentFileName);

      // identify the important files and surface them
      flattenedImportantRelatedFiles = relatedFiles.reduce((fetchedData = {}, relatedFile) => {
        const { name } = relatedFile;
        const isSpectrogram = endsWith(name, '.png');
        const isSampleMP3 = endsWith(name, '_sample.mp3');
        const isMP3 = endsWith(name, '.mp3');
        const isOGG = endsWith(name, '.ogg');
        const fullFilePath = `${fileDirectoryPrefix}${encodeURIComponent(name)}`;

        if (isSpectrogram && !name.match(/_spectrogram.png/g)) { fetchedData.waveformURL = fullFilePath; }

        const normalizedAudioFile = Object.assign({}, relatedFile, { fullFilePath });
        if (isPrivate && isSampleMP3) {
          fetchedData.sampleMP3 = normalizedAudioFile;
        }

        if (isMP3 && !isSampleMP3) {
          fetchedData.fullMP3 = normalizedAudioFile;
        }

        if (isOGG) {
          fetchedData.fullOGG = normalizedAudioFile;
        }

        return fetchedData;
      }, {});

      // check for youtube, spotify
      if (externalIdentifiers) {
        trackYoutubeAndSpotifyInfo = gatherYoutubeAndSpotifyInfo(externalIdentifiers);
        Object.keys(trackYoutubeAndSpotifyInfo).forEach(id => trackFilesHaveYoutubeSpotify.push(id));
      }

      // create a URL for this originalFile
      const originalFileFullURL = `${fileDirectoryPrefix}${encodeURIComponent(currentFileName)}`;
      const enhancedOriginalAudioFile = Object.assign({},
        currentFile,
        { relatedFiles, fullFilePath: originalFileFullURL },
        flattenedImportantRelatedFiles,
        trackYoutubeAndSpotifyInfo);
      neededItems.push(enhancedOriginalAudioFile);
    }
    return neededItems;
  }, []);

  return {
    tracks, itemPhotoCandidates, trackFilesHaveYoutubeSpotify
  };
};

export default archiveDefaultAlbumParser;
