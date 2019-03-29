/**
 * Formats time for audio display
 * @param { string } lengthInSeconds
 */
const formatTime = (lengthInSeconds) => {
  if (!lengthInSeconds) return null;
  const lengthInMS = parseFloat(lengthInSeconds) * 1000;
  const minutes = Math.floor(lengthInMS / 60000);
  const seconds = ((lengthInMS % 60000) / 1000).toFixed(0);
  const secondsDisplay = (seconds < 10 ? '0' : '') + seconds;
  return `${minutes}:${secondsDisplay}`;
};

/**
 * Given a source/channel (archive, youtube, spotify),
 * return all applicable tracks
 *
 * @param { object } albumData (IA Item)
 * @param { string } sourceToPlay (archive, youtube, spotify)
 */
const getTrackListBySource = (albumData, sourceToPlay) => {
  // check to see if samples only
  const { playSamples, tracks, albumSpotifyYoutubeInfo } = albumData;
  const externalSource = sourceToPlay === 'youtube' || sourceToPlay === 'spotify';
  if (sourceToPlay === 'archive') {
    if (playSamples) {
      const sampleMP3s = tracks.map((track, index) => {
        const { sampleMP3 } = track;
        const trackNumber = index + 1;
        return Object.assign({}, sampleMP3, { trackNumber });
      });

      return sampleMP3s;
    }

    return tracks.map((track, index) => {
      const { fullMP3, length = '' } = track;
      const trackToUse = fullMP3 || track;
      const trackLengthNeedsFormatting = !!length.indexOf(':');
      const formattedLength = trackLengthNeedsFormatting ? formatTime(length) : length;
      const trackNumber = index + 1;
      return Object.assign({}, trackToUse, { trackNumber, formattedLength });
    });
  }

  if (externalSource) {
    const albumPlaceholder = {
      trackNumber: 0,
      youtube: albumSpotifyYoutubeInfo.youtube || null,
      spotify: albumSpotifyYoutubeInfo.spotify || null,
      isAlbum: true
    };
    const tracksToReturn = [];
    const tracksWithExternalSource = tracks.reduce((allTracks = [albumPlaceholder], track, index) => {
      const { length = '' } = track;
      const trackLengthNeedsFormatting = !!length.indexOf(':');
      const formattedLength = trackLengthNeedsFormatting ? formatTime(length) : length;
      const trackNumber = index + 1;
      const formattedTrack = Object.assign({}, track, { formattedLength, trackNumber });
      if (track.hasOwnProperty(sourceToPlay)) { allTracks.push(formattedTrack); }
      return allTracks;
    }, []);
    if (albumSpotifyYoutubeInfo[sourceToPlay]) {
      tracksToReturn.push(albumPlaceholder);
    }

    return tracksToReturn.concat(tracksWithExternalSource);
  }

  return [];
};

export default getTrackListBySource;
