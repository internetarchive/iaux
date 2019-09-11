import { endsWith, filter } from 'lodash';
import gatherYoutubeAndSpotifyInfo from './youtube-spotify-parser';
import { isValidAudioFile, isValidImageFile } from './utils';

/**
 * Internet Archive LP Album Data Parser
 * This sorts an LP Item's files and:
 * - connects main track files with their related files (sample mp3, ogg, youtube, spotify info)
 * - identifies possible main photo candidates
 * - flags which files have YouTube, Spotify external identifiers
 *
 * This targets items in this collection: https://archive.org/details/album_recordings
 * To get expected schema, go to: https://archive.org/details/${identifier}?output=json
 * Please note that this schema is different than what metadataAPI produces
 * This choice was made because that is the data schema that /details page uses
 * Instead of making another call to metadata API, we will consume what is available
 *
 * Note: schemas and file extensions may differ between the first
 * wave of LP scans (in 2010) and current process
 *
 * @param { string } fileDirectoryPrefix
 * @param { array } files
 * @param { string } identifier
 *
 * @returns { object } : tracks, itemPhotoCandidates, trackFilesHaveYoutubeSpotify
 *
 */
const archiveLPAlbumParser = ({ fileDirectoryPrefix, files, itemIdentifier }) => {
  let itemPhoto = '';
  const itemPhotoCandidates = {};
  const trackFilesHaveYoutubeSpotify = [];

  const tracks = files.reduce((neededItems = [], currentFile) => {
    const { source, original = '', name: currentFileName } = currentFile;
    const isPrivate = currentFile.private || null;
    let trackYoutubeAndSpotifyInfo = null;
    let flattenedImportantRelatedFiles = null;
    const externalIdentifiers = currentFile['external-identifier'] || null;
    const isOriginal = source === 'original';
    const isMainTrackItem = original.match(`${itemIdentifier}_segments.`);
    const fileToSkip = `${itemIdentifier}.mp3`; // phantom audio file to map to full album
    const isAudioFile = isValidAudioFile(currentFileName);
    const isItemImageFile = isOriginal && isValidImageFile(currentFileName);
    // skip unneeded files
    if ((!isOriginal && !isAudioFile) || (fileToSkip === currentFileName)) return neededItems;

    if (isItemImageFile) {
      itemPhoto = `${fileDirectoryPrefix}${encodeURIComponent(currentFileName)}`;

      const isFormatItemImage = !!currentFileName.match(/_itemimage./g); // can be jpg, png
      const isDesignatedFirstImage = !!currentFileName.match(/IMG_00001.jpg/g);
      const actualFirstImage = !!currentFileName.match(/IMG_0001.jpg/g);
      if (isDesignatedFirstImage) {
        itemPhotoCandidates.designated = itemPhoto;
      }
      if (actualFirstImage) {
        itemPhotoCandidates.actual = itemPhoto;
      }
      if (isFormatItemImage) {
        itemPhotoCandidates.formattedAsFirst = itemPhoto;
      }
    }

    if (isMainTrackItem && isAudioFile) {
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
  const returnItems = {
    tracks, itemPhotoCandidates, trackFilesHaveYoutubeSpotify
  };

  return returnItems;
};

export default archiveLPAlbumParser;
