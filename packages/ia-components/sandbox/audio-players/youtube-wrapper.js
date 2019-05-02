import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, flatten, head } from 'lodash';
import flattenAlbumData from '../theatres/with-youtube-spotify/utils/flatten-album-data';
import getTrackListBySource from '../theatres/with-youtube-spotify/utils/get-track-list-by-source';
import YoutubePlayer from './players-by-type/YoutubePlayer';
import YoutubeTracklist from './youtube-tracklist/youtube-tracklist';
import styles from './styles/youtube-wrapper.less';
/**
 * Youtube Wrapper
 * Props:
 * @param object albumMetaData
 */

class YoutubeWrapper extends Component {
  constructor(props) {
    super(props);

    const { albumMetaData} = props;
    const albumData = flattenAlbumData(albumMetaData);
    const tracklistToShow=getTrackListBySource(albumData, "youtube");

    this.state = {
      albumData,
      tracklistToShow,
      channelToPlay: 'youtube',
      selectedTrack:1
    };
    this.onTrackSelected=this.onTrackSelected.bind(this);
  }

  onTrackSelected(trackNumber){
    this.setState({selectedTrack:trackNumber});    
  }

  playNextTrack(currentTrack){
    let newTrack;
    for (let index = 0; index < this.state.tracklistToShow.length; index++) {
      if (this.state.tracklistToShow[index].trackNumber===currentTrack) {
          const nextTrack=index+1;
          newTrack=this.state.tracklistToShow[nextTrack].trackNumber;
      }
    }  
    this.setState({selectedTrack:newTrack})    
  }

  render() {
    return (
      <div className="YoutubeWrapper">
        <YoutubePlayer
          tracklistToShow={this.state.tracklistToShow}
          selectedTrack={this.state.selectedTrack}
          playNextTrack={(currentTrack)=>this.playNextTrack(currentTrack)}
          />
        <YoutubeTracklist
            selectedTrack={this.state.selectedTrack}
            tracks={this.state.tracklistToShow}
            onSelected={(tn)=>{this.onTrackSelected(tn)}}
            />
      </div>
    );
  }
}

YoutubeWrapper.propTypes = {
  albumMetaData: PropTypes.object.isRequired
};

export default YoutubeWrapper