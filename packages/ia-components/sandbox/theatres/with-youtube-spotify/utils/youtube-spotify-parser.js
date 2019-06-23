import { merge } from 'lodash';

/**
 * Gather Youtube & Spotify Info
 * Takes a list of of external identifiers,
 * If it has a Youtube or Spotify ID, then create direct links to the item
 *
 * @param { array } externalIdentifiers
 * @return { object } = {
 *  youtube: { urlPrefix, id },
 *  and/or
 *  spotify: { urlPrefix, id }
 * }
 */
const gatherYoutubeAndSpotifyInfo = (externalIdentifiers = []) => {
  const externalSourceParams = {
    spotify: {
      urlPrefix: 'https://embed.spotify.com/?uri=',
    },
    // note usage
    youtube: {
      urlPrefix: 'https://www.youtube.com/embed/',
      urlExtensions: `?fs=1&rel=0&autoplay=1&origin=${window.location.origin}` // todo: add origin='https://www.archive.org'
    }
  };
  const externalIDs = !Array.isArray(externalIdentifiers)
    ? [externalIdentifiers]
    : externalIdentifiers;
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

export default gatherYoutubeAndSpotifyInfo;
