/**
 * For a given track in an album, it tells you whether or not one should show the track artist
 * This follows the structured metadata for collections in: `acdc`, `album_recordings`, & `78rpm`
 *
 * @param { string } trackArtist - delimited by `;\s|;`;
 * @param { array|string } albumCreator
 * @param { string } albumTitle
 *
 * @returns { bool }
 */
const showTrackArtist = (trackArtist = '', albumCreator = '', albumTitle = '') => {
  const titleHasTrackArtist = albumTitle.includes(trackArtist);
  // if album title has artist name => no
  // we are assuming that this is a "Best of <artist>" album
  if (titleHasTrackArtist) {
    return false;
  }

  if (trackArtist === albumCreator) {
    return false;
  }

  // Track Artists come in a delimited string
  // `;\s` => acdc, album_recordings
  // `;` => 78rpm
  const artistDelimiter = new RegExp(/;\s|;/g);

  const listAlbumArtists = !Array.isArray(albumCreator) ? albumCreator.split(artistDelimiter) : albumCreator;
  const listTrackArtists = trackArtist.split(artistDelimiter);

  /* Compliation Check */
  // check for most general flag for a compilation album
  const [initialArtist = ''] = listAlbumArtists;
  // compilation albums list `Various Artists` as the first value
  const isCompilation = initialArtist.toLowerCase().includes('various artist');
  if (isCompilation) {
    // pop `Various Artists` placeholder to give way to album artists
    listAlbumArtists.shift();
  }
  const trackIsByAlbumArtist = listAlbumArtists.join('') === listTrackArtists.join('');
  // we want to always display when it is a compilation
  if (trackIsByAlbumArtist && !isCompilation) {
    return false;
  }
  /* End Compliation Check */

  // all else, => yes
  return true;
};

export default { showTrackArtist };
