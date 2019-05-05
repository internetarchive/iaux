import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Tracklist component listing all available array of tracks.
 * @param {array} tracks
 * @param {number}  selectedTrack
 * @param function  onSelected  // callback on selecting track
 */
class YoutubeTracklist extends Component {
  constructor(props){
    super(props);
    const {selectedTrack, onSelected, tracks} = props;
    this.state={
      selectedTrack,
      tracks,
      onSelected
    } 
  }
 /**
  * State of track updated during lifecycle when props received
  * nextProps:
  * @param {number} nextProps.selectedTrack
  */
  componentWillReceiveProps(nextProps){
    this.setState({selectedTrack:nextProps.selectedTrack})
  }
/**
 * Maintaining lifecycle
 * Restricting rendering of component without any change in state
 * Or when same track selected to play
 * @param {number} nextProps.selectedTrack
 * @return boolean
 */
  shouldComponentUpdate(nextProps){
    return this.state.selectedTrack!==nextProps.selectedTrack
  }
  
/**
 * Draws track info as button
 *
 * @param {number} selectedTrack
 * @param function onSelected
 * @param object thisTrack
 *
 * @return component
 */
  trackButton = (selectedTrack, thisTrack, onSelected) => {
    const { trackNumber, formattedLength, title } = thisTrack;
    let trackButtonClass="track-button";
    if (trackNumber===selectedTrack) {
      trackButtonClass="track-button-selected"
    }
    return (
      <button
        type="button"
        trackNumber={trackNumber}
        className={trackButtonClass}
        onClick={(e)=>{onSelected(trackNumber)}}
      >
        <span className="track-number">{trackNumber}</span>
        <span className="track-title">{title}</span>
        <span className="track-length">{formattedLength}</span>
      </button>
    );
  };
  
  render() {
  if (!this.state.tracks.length) return <p className="no-tracks">No tracks to display.</p>;

  return (
    <div className="youtube-tracklist">
        {
          this.state.tracks.map((thisTrack) => {
            return this.trackButton(this.state.selectedTrack,thisTrack,this.state.onSelected)
          })
        }
    </div>
  );
  }
}

YoutubeTracklist.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selectedTrack: PropTypes.number.isRequired,
  tracks: PropTypes.array
};

export default YoutubeTracklist;