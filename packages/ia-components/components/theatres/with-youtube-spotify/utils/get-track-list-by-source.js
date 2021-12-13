/**
 * Formats time for audio display
 * @param { string } lengthInSeconds
 */
const formatTime = (lengthInSeconds) => {
  if (!lengthInSeconds) return null;
  const lengthInMS = parseFloat(lengthInSeconds) * 1000;
  const minutes = Math.floor(lengthInMS / 60000);
  const seconds = ((lengthInMS % 60000) / 1000).toFixed(0); // becomes a string, thanks JS math
  const extraMinute = seconds === '60';
  const secondsDisplay = extraMinute ? '00' : (seconds < 10 ? '0' : '') + seconds;
  let minutesDisplay = minutes !== 0 ? `${minutes}` : '00';
  if (extraMinute) {
    minutesDisplay = `${minutes + 1}`;
  }
  return `${minutesDisplay}:${secondsDisplay}`;
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
        const {
          sampleMP3, title = '', creator = '', artist = ''
        } = track;
        const { length } = sampleMP3;
        const trackLengthFormatted = length.indexOf(':') > 0;
        const formattedLength = !trackLengthFormatted ? formatTime(length) : length;
        const trackDetails = {
          title, creator, artist, formattedLength
        };
        const trackNumber = index + 1;
        return Object.assign({}, sampleMP3, { trackNumber, ...trackDetails });
      });
      return sampleMP3s;
    }

    return tracks.map((track, index) => {
      const { fullMP3, length = '' } = track;
      const trackToUse = fullMP3 || track;
      const trackLengthFormatted = length.indexOf(':') > 0;
      const formattedLength = !trackLengthFormatted ? formatTime(length) : length;
      const trackNumber = index + 1;
      return Object.assign({}, trackToUse, { trackNumber, formattedLength });
    });
  }

  if (externalSource) {
    const albumPlaceholder = {
      youtube: albumSpotifyYoutubeInfo.youtube || null,
      spotify: albumSpotifyYoutubeInfo.spotify || null,
      isAlbum: true,
      trackNumber: 0,
    };
    const tracksToReturn = [];
    const tracksWithExternalSource = tracks.reduce((allTracks = [albumPlaceholder], track, index) => {
      const {
        length = '', title, creator, artist = ''
      } = track;
      const trackDetails = { title, creator, artist };
      const trackLengthFormatted = length.indexOf(':') > 0;
      const formattedLength = !trackLengthFormatted ? formatTime(length) : length;
      const trackNumber = index + 1;
      const formattedTrack = Object.assign({}, track, { formattedLength, trackNumber, ...trackDetails });
      if (track.hasOwnProperty(sourceToPlay)) { allTracks.push(formattedTrack); }
      return allTracks;
    }, []);
    if (albumSpotifyYoutubeInfo.hasOwnProperty(sourceToPlay)) {
      tracksToReturn.push(albumPlaceholder);
    }

    return tracksToReturn.concat(tracksWithExternalSource);
  }

  return [];
};

export default getTrackListBySource;
