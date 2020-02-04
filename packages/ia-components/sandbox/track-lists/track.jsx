import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import trackUtils from './track-utils';

const { showTrackArtist } = trackUtils;
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
const parseTrackTitle = ({
  name = '',
  title = '',
  albumCreator,
  albumName,
  creator = '',
  artist = '',
  isAlbum = false
}) => {
  if (isAlbum) {
    return 'Full album';
  }
  const trackArtist = creator || artist;
  const displayTrackArtist = showTrackArtist(trackArtist, albumCreator, albumName);
  const titleArtistDelimiter = displayTrackArtist ? ' - ' : null;
  const artistName = displayTrackArtist ? <i>{trackArtist}</i> : null;

  if (title) {
    return (
      <Fragment>
        {title}
        {titleArtistDelimiter}
        {artistName}
      </Fragment>
    );
  }

  return name.split('.')[0].replace(/[-_]/g, ' ') || '';
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
const oneTrack = (props) => {
  const {
    selected,
    onSelected,
    thisTrack,
    displayTrackNumbers,
    albumCreator = [],
    albumName = ''
  } = props;
  const { trackNumber, length, formattedLength } = thisTrack;

  const key = `individual-track-${trackNumber}`;
  const trackTitle = parseTrackTitle({ ...thisTrack, albumCreator, albumName });
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
      data-track-number={trackNumber}
      className={trackButtonClass}
      onClick={onSelected}
      key={key}
      data-event-click-tracking="TrackList|Item"
    >
      <span className="track-number">{displayNumber}</span>
      <span className="track-title">{trackTitle}</span>
      <span className="track-length">{displayLength}</span>
    </button>
  );
};

oneTrack.defaultProps = {
  selected: false,
  displayTrackNumbers: false,
  albumCreator: '',
  albumName: ''
};

oneTrack.propTypes = {
  selected: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
  thisTrack: PropTypes.shape({}).isRequired,
  displayTrackNumbers: PropTypes.string,
  albumCreator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape([])
  ]),
  albumName: PropTypes.string
};

export default oneTrack;
