import React from 'react';
import PropTypes from 'prop-types';
import FlexboxPagination from '../pagination/pagination-with-flexbox';
import OneTrack from './track';
/**
 * Makes tracklist
 * Creates elements and feeds it into pagination component
 *
 * @param - see Props
 * @return component
 */
const TheatreTrackList = (props) => {
  const {
    selectedTrack, onSelected, tracks, displayTrackNumbers, creator: albumCreator, albumName
  } = props;

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
        {...props}
      >
        {
          tracks.map((thisTrack) => {
            const { trackNumber } = thisTrack;
            const selected = trackNumber === trackNumberToHighlight;
            const key = `individual-track-${trackNumber}`;
            const trackProps = {
              thisTrack, onSelected, selected, displayTrackNumbers, albumCreator, albumName
            };
            return <OneTrack {...trackProps} key={key} />;
          })
        }
      </FlexboxPagination>
    </div>
  );
};

TheatreTrackList.defaultProps = {
  tracks: [],
  displayTrackNumbers: true,
  creator: '',
  albumName: '',
  selectedTrack: null,
};

TheatreTrackList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selectedTrack: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.object),
  displayTrackNumbers: PropTypes.bool,
  creator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  albumName: PropTypes.string,
};

export default TheatreTrackList;
