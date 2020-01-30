import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlexboxPagination } from '../..';
import oneTrack from './track';
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
              return oneTrack({
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
  selectedTrack: null,
};

TheatreTrackList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selectedTrack: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.object),
  displayTrackNumbers: PropTypes.bool,
  creator: PropTypes.string,  // Note that creator is a repeatable metadata field so caller will have to coerce it into a string!
  albumName: PropTypes.string,
};

export default TheatreTrackList;
