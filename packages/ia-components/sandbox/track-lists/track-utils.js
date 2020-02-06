/**
 * For a given track in an album, it formats the track title value
 * @param { string } trackTitle
 * @param { string } fileName
 */
const formatTrackTitle = (trackTitle = '', fileName = '') => {
  if (trackTitle) {
    return trackTitle;
  }
  // strip file extension from its name and return
  return fileName.replace(/.mp3/, '');
};

/**
 * For a given track in an album, it formats the track artist value
 * This follows the structured metadata for collections in: `acdc`, `album_recordings`, & `78rpm`
 *
 * @param { string } trackArtist - delimited by `;\s|;`;
 * @param { array|string } albumCreator
 * @param { string } albumTitle
 *
 * @returns { string }
 */
const formatTrackArtist = (trackArtist = '', albumCreator = '', albumTitle = '') => {
  const titleHasTrackArtist = albumTitle.includes(trackArtist);

  // if album title has artist name => no
  // we are assuming that this is a "Best of <artist>" album
  if (titleHasTrackArtist) {
    return '';
  }

  if (trackArtist === albumCreator) {
    return '';
  }

  // Track Artists come in a delimited string
  // `;\s` => acdc, album_recordings
  // `;` => 78rpm
  const parseArtistDelimiter = new RegExp(/;\s|;/g);
  const joinArtistDelimiter = '; ';

  const listAlbumArtists = !Array.isArray(albumCreator) ? albumCreator.split(parseArtistDelimiter) : albumCreator;
  const listTrackArtists = trackArtist.split(parseArtistDelimiter);

  /* Compliation Check */
  // check for most general flag for a compilation album
  const [initialArtist = ''] = listAlbumArtists;
  // compilation albums list `Various Artists` as the first value
  const isCompilation = initialArtist.toLowerCase().includes('various artist');
  if (isCompilation) {
    // pop `Various Artists` placeholder to give way to album artists
    listAlbumArtists.shift();
  }
  const formattedTrackArtists = listTrackArtists.join(joinArtistDelimiter);
  const trackIsByAlbumArtist = listAlbumArtists.join(joinArtistDelimiter) === formattedTrackArtists;
  // we want to always display when it is a compilation
  if (trackIsByAlbumArtist && !isCompilation) {
    return '';
  }
  /* End Compliation Check */

  // all else, => yes
  return formattedTrackArtists;
};

export { formatTrackArtist, formatTrackTitle };
