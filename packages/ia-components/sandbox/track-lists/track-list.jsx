import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FlexboxPagination } from '../..';

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
  name = '',
  title = '',
  albumCreator,
  albumName,
  creator = '',
  artist = '',
  isAlbum = false
}) => {
  if (isAlbum) { return 'Full album'; }
  const albumCreatorString = Array.isArray(albumCreator) ? albumCreator.join('; ') : albumCreator;
  const whichArtistVal = creator || artist;
  /* this considers "Best of" albums */
  const titleHasTrackArtist = albumName.includes(whichArtistVal);
  const artistName = titleHasTrackArtist || (whichArtistVal === albumCreatorString) ? '' : whichArtistVal;

  if (title) {
    return (
      <Fragment>
        {`${title}${artistName ? ' - ' : ''}`}
        { !!artistName && <i>{artistName}</i> }
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
const trackButton = (props) => {
  const {
    selected, onSelected, thisTrack, displayTrackNumbers, albumCreator, albumName
  } = props;
  const { trackNumber, length, formattedLength } = thisTrack;
  const key = `individual-track-${trackNumber}`;
  const trackTitle = parseTrackTitle({ ...thisTrack, albumCreator, albumName });
  const track = parseInt(trackNumber, 10);
  const displayNumber = track > 0 ? track : '-';
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
  render() {
    const {
      selectedTrack, onSelected, tracks, displayTrackNumbers, creator: albumCreator, albumName
    } = this.props;

    if (!tracks.length) return <p className="no-tracks">No tracks to display.</p>;

    const [firstTrack = {}] = tracks;
    const { trackNumber: firstTrackNumber } = firstTrack;
    const trackNumberToHighlight = Number.isInteger(selectedTrack)
      ? selectedTrack
      : firstTrackNumber;
    const itemToViewClass = `[data-track-number="${trackNumberToHighlight}"]`;
    return (
      <div className="audio-track-list">
        <FlexboxPagination
          itemInViewClass={itemToViewClass}
          {...this.props}
        >
          {
            tracks.map((thisTrack) => {
              const { trackNumber } = thisTrack;
              const selected = trackNumber === trackNumberToHighlight;
              return trackButton({
                thisTrack, onSelected, selected, displayTrackNumbers, albumCreator, albumName
              });
            })
          }
        </FlexboxPagination>
      </div>
    );
  }
}

TheatreTrackList.defaultProps = {
  tracks: [],
  displayTrackNumbers: true,
  creator: '',
  albumName: '',
};

TheatreTrackList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selectedTrack: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  displayTrackNumbers: PropTypes.bool,
  creator: PropTypes.string,
  albumName: PropTypes.string,
};

export default TheatreTrackList;
