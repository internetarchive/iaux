import {
  includes,
  reduce,
  endsWith,
  filter,
  merge,
  chain,
} from 'lodash';

/**
 * Returns YouTube & Spotify info if they exist in externalIdentifiers list
 * @param { array } externalIdentifiers
 * @return { object } = {
 *  youtube: { urlPrefix, id },
 *  and/or
 *  spotify: { urlPrefix, id }
 * }
 */
const fetchYoutubeAndSpotifyInfo = (externalIdentifiers = []) => {
  const externalSourceParams = {
    spotify: {
      urlPrefix: 'https://embed.spotify.com/?uri=',
    },
    youtube: {
      urlPrefix: 'https://www.youtube.com/embed/',
      urlExtensions: `?fs=1&rel=0&autoplay=1&origin=${window.location.origin}` // todo: add origin='https://www.archive.org'
    }
  };
  const externalIDs = !Array.isArray(externalIdentifiers) ? [externalIdentifiers] : externalIdentifiers;
  const youtubeAndSpotifyIDs = externalIDs.reduce((allIDs = {}, id) => {
    const isYoutubeOrSpotify = id.match(/(youtube|spotify)/g);
    if (isYoutubeOrSpotify) {
      const externalSource = isYoutubeOrSpotify[0];
      const neededParams = externalSourceParams[externalSource];
      const idSeparator = (externalSource === 'youtube') ? id.lastIndexOf(':') + 1 : id.indexOf(':') + 1;
      const sourceId = id.slice(idSeparator);
      allIDs[isYoutubeOrSpotify[0]] = merge({}, neededParams, { id: sourceId });
    }
    return allIDs;
  }, {});

  return youtubeAndSpotifyIDs;
};

/**
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
  const { collection } = albumMetadata;
  const fileDirectoryPrefix = `https://${server}${directoryPath}/`;
  const fileNames = Object.keys(allFiles);

  /**
   * Take original item's file list & only return the files we are interested in
   */
  const slimFiles = reduce(fileNames, (neededFiles = [], fileName) => {
    const neededExtensions = /(mp3|ogg|flac|m4a|jpg|png|jpeg)$/gi;
    const isNeededFile = fileName.match(neededExtensions);
    const file = allFiles[fileName];
    file.name = fileName.slice(1, fileName.length);
    if (isNeededFile) {
      neededFiles.push(file);
    }
    return neededFiles;
  }, []);

  const playSamples = playFullIAAudio ? false : includes(collection, 'samples_only');
  const albumSpotifyYoutubeInfo = fetchYoutubeAndSpotifyInfo(albumMetadata['external-identifier']) || {};
  const trackFilesHaveYoutubeSpotify = [];
  let itemPhoto = '';

  /**
   * Reduce files.
   * Identify which ones are originals, then nest all related files inside of the original ones
   *
   * @return { array } of original files with related data nested into them
   */
  const tracks = slimFiles.reduce((neededItems = [], currentFile) => {
    const { source, name: currentFileName } = currentFile;
    const isPrivate = currentFile.private || null;
    let trackYoutubeAndSpotifyInfo = null;
    let flattenedImportantRelatedFiles = null;
    const externalIdentifiers = currentFile['external-identifier'] || null;
    const isOriginal = source === 'original';
    const isAudioFile = currentFileName.match(/(mp3|ogg|flac|m4a)$/g);
    const isItemImageFile = isOriginal && currentFileName.match(/(png|jpg|jpeg)$/gi);

    // skip unneeded files
    if (!isOriginal && !isAudioFile) return neededItems;

    if (isItemImageFile && !currentFileName.match(/_thumb/g)) {
      itemPhoto = `${fileDirectoryPrefix}${encodeURIComponent(currentFileName)}`;
    }

    if (isOriginal && isAudioFile) {
      // get related files
      const relatedFiles = filter(slimFiles, thisFile => thisFile.original === currentFileName);

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
        trackYoutubeAndSpotifyInfo = fetchYoutubeAndSpotifyInfo(externalIdentifiers);
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

  const albumData = Object.assign(
    {},
    albumMetadata,
    {
      fileDirectoryPrefix,
      itemPhoto,
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
