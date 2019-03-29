import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FlexboxPagination } from '../../../..';

/**
 * Creates the track title to display based on track object
 *
 * @param { string } name
 * @param { string } title
 * @param { string } artist
 * @param { string } creator
 * @param { boolean } isAlbum
 *
 * @return { string or react fragment } trackTitle
 */
const parseTrackTitle = ({
  name,
  title,
  albumCreator,
  creator,
  isAlbum
}) => {
  if (isAlbum) { return 'Full album'; }

  const artistName = creator !== albumCreator ? creator : '';

  if (title) {
    return (
      <Fragment>
        {`${title}${artistName ? ' - ' : ''}`}
        <i>{artistName}</i>
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
const trackButton = ({
  selected, onSelected, thisTrack, displayTrackNumbers, albumCreator
}) => {
  const { trackNumber, length, formattedLength } = thisTrack;
  const key = `individual-track-${trackNumber}`;
  const trackTitle = parseTrackTitle({ ...thisTrack, albumCreator });
  const displayNumber = parseInt(trackNumber, 10) || '-';
  const displayLength = formattedLength || length || '-- : --';

  const trackButtonClass = `${selected ? 'selected ' : ''}track${!displayTrackNumbers ? ' no-track-number' : ''}`;
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

/**
 * Makes tracklist
 * Creates elements and feeds it into pagination component
 *
 * @param - see Props
 * @return component
 */
class TheatreTrackList extends Component {
  componentDidUpdate() {
    // make sure focus stays on highlighted track;
    const selected = document.querySelector('button.selected.track');
    if (selected) {
      selected.focus();
    }
  }

  render() {
    const {
      selectedTrack, onSelected, tracks, displayTrackNumbers, creator: albumCreator
    } = this.props;

    return (
      <div className="audio-track-list">
        <FlexboxPagination
          itemInViewClass={`[data-track-number="${selectedTrack}"]`}
          {...this.props}
        >
          {
            tracks.map((thisTrack) => {
              const { trackNumber } = thisTrack;
              const selected = trackNumber === selectedTrack;
              return trackButton({
                thisTrack, onSelected, selected, displayTrackNumbers, albumCreator
              });
            })
          }
        </FlexboxPagination>
      </div>
    );
  }
}

TheatreTrackList.defaultProps = {
  selectedTrack: null,
  tracks: null,
  displayTrackNumbers: true,
  creator: ''
};

TheatreTrackList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selectedTrack: PropTypes.number,
  tracks: PropTypes.array,
  displayTrackNumbers: PropTypes.bool,
  creator: PropTypes.string,
};

export default TheatreTrackList;
