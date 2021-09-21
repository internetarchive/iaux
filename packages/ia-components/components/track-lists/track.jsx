import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatTrackArtist, formatTrackTitle } from './track-utils';

/**
 * Creates the track title to display based on track object
 *
 * @param { string } name
 * @param { string } title
 * @param { string } artist
 * @param { string } creator
 * @param { boolean } isAlbum
 *
 * @return { react fragment } trackTitle
 */
const TrackTitle = ({
  name: fileName,
  title,
  albumCreator,
  albumName,
  creator,
  artist,
  isAlbum
}) => {
  if (isAlbum) {
    return 'Full album';
  }
  const trackArtist = creator || artist;
  const displayArtist = formatTrackArtist(trackArtist, albumCreator, albumName);
  const titleArtistDelimiter = displayArtist ? ' - ' : null;
  const artistName = displayArtist ? <i className="track-artist">{displayArtist}</i> : null;

  return (
    <Fragment>
      {formatTrackTitle(title, fileName)}
      {titleArtistDelimiter}
      {artistName}
    </Fragment>
  );
};

TrackTitle.defaultProps = {
  name: '',
  title: '',
  albumCreator: '',
  albumName: '',
  creator: '',
  artist: '',
  isAlbum: false
};

TrackTitle.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  albumCreator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape([])
  ]),
  albumName: PropTypes.string,
  creator: PropTypes.string,
  artist: PropTypes.string,
  isAlbum: PropTypes.bool
};

/**
 * Draws track info as button
 *
 * @param bool selected
 * @param function onSelected
 * @param object track
 *
 * @return component
 */
const OneTrack = ({
  selected,
  onSelected,
  thisTrack,
  displayTrackNumbers,
  albumCreator,
  albumName
}) => {
  const { trackNumber, length, formattedLength } = thisTrack;
  const trackProps = { ...thisTrack, albumCreator, albumName };
  const track = parseInt(trackNumber, 10);
  const displayNumber = track > 0 ? track : '-';
  const displayLength = formattedLength || length || '-- : --';

  const trackButtonClass = [
    selected ? 'selected' : '',
    'track',
    displayTrackNumbers ? '' : 'no-track-number'
  ].join(' ').trim();

  return (
    <button
      type="button"
      data-track-number={trackNumber || 0}
      className={trackButtonClass}
      onClick={onSelected}
      data-event-click-tracking="TrackList|Item"
    >
      <span className="track-number">{displayNumber}</span>
      <span className="track-title"><TrackTitle {...trackProps} /></span>
      <span className="track-length">{displayLength}</span>
    </button>
  );
};

OneTrack.defaultProps = {
  selected: false,
  displayTrackNumbers: false,
  albumCreator: '',
  albumName: ''
};

OneTrack.propTypes = {
  selected: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
  thisTrack: PropTypes.shape({}).isRequired,
  displayTrackNumbers: PropTypes.bool,
  albumCreator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  albumName: PropTypes.string,
  trackIdx: PropTypes.number
};

export default OneTrack;
