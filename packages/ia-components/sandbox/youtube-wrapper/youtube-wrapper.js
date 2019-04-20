import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YoutubePlayer from '../theatres/components/audio-player/players_by_type/youtube-player';

class YoutubeWrapper extends Component {
  render() {
    return (
      <div className="YoutubeWrapper">
        <YoutubePlayer
          videoId={this.props.videoId} 
          height={this.props.height}
          width={this.props.width}/>
      </div>
    );
  }
}

YoutubeWrapper.propTypes = {
  videoId: PropTypes.string.required,
  width: PropTypes.number,
  height: PropTypes.number
};

export default YouTubeWrapper;