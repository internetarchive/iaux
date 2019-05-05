import React, { Component} from 'react'
import PropTypes from 'prop-types'

/**
 * Youtube Player to stream video build on top of iframe using Iframe API
 * Props:
 * @param {number}  selectedTrack
 * @param function  playNextTrack
 * @param {arrayOf.string} tracklistToShow
 */
const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};
const ErrorState = {
  INVALIDVIDEOID: 2,
  HTML5ERROR: 5,
  VIDEONOTFOUND: 100,
  NOTALLOWEDBYOWNER: 101||105
};

 export default class YoutubePlayer extends Component {

  constructor(props){
    super(props);
    for (let index = 0; index < this.props.tracklistToShow.length; index++) {
      if (this.props.tracklistToShow[index].trackNumber===this.props.selectedTrack) {
        var currentVideoId=this.props.tracklistToShow[index].youtube.id
      }
    } 
    this.state={
      playerAnchor:React.createRef(),
      tracklistToShow:this.props.tracklistToShow,
      selectedTrack:this.props.selectedTrack,
      currentVideoId:currentVideoId
    }
    
    this.loadAPI=this.loadAPI.bind(this);
    this.loadPlayer=this.loadPlayer.bind(this);
    this.onPlayerStateChange=this.onPlayerStateChange.bind(this);
    this.onPlayerReady=this.onPlayerReady.bind(this);
    this.onPlayerError=this.onPlayerError.bind(this);
  }

  componentDidMount(){
      this.loadAPI();
      this.loadPlayer();
  }
/**
 * State of current video id and selected track updated when receive props
 * @param {number} nextProps.Number
 */
  componentWillReceiveProps(nextProps){
    if (nextProps.selectedTrack!==this.state.selectedTrack) { 
      let currentVideoId;
      for (let index = 0; index < this.state.tracklistToShow.length; index++) {
        if (this.state.tracklistToShow[index].trackNumber===nextProps.selectedTrack) {
            currentVideoId=this.state.tracklistToShow[index].youtube.id;
        }
      }     
      
      this.setState({
              currentVideoId,
              selectedTrack:nextProps.selectedTrack})       
    }
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
 * Updates the video player with new track selected
 */
  componentDidUpdate(){
    this.player.loadVideoById(this.state.currentVideoId, 0, "large")
  }
/**
 * Loads iframe API to build Youtube Player
 */
  loadAPI(){
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
/**
 * Builds Youtube Player using iframe API
 */
  loadPlayer(){
    window.onYouTubeIframeAPIReady=()=>{
      this.player=new window.YT.Player(this.state.playerAnchor.current,{
        height:'390',
        width:'640',
        videoId:this.state.currentVideoId,
        playerVars:{
          modestbranding:1,
          enablejsapi:1,
          rel:0
        },
        events:{
          'onReady':this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange,
          'onError': this.onPlayerError
        }
      })
    } 
  }
  
  onPlayerStateChange(event){
    switch (event.target.getPlayerState()) {
      case PlayerState.ENDED:
          this.props.playNextTrack(this.state.selectedTrack);
        break;
    
      default:
        break;
    }
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerError(event){
    switch (event.data) {
      case ErrorState.INVALIDVIDEOID:
          alert('Invalid VideoID')
          event.target.stopVideo();
        break;
      case ErrorState.VIDEONOTFOUND:
          alert('Video not found')
          event.target.stopVideo();
        break;
      case ErrorState.NOTALLOWEDBYOWNER:
          alert('Not allowed by User')
          event.target.stopVideo();
          break;
      case ErrorState.HTML5ERROR:
          alert('HTML5 Error')
          event.target.stopVideo();
          break;
      default:
          alert('Video Unavailable')
          event.target.stopVideo();
        break;
    }
  }

  render () {
     
    return (
      <div className='YoutubePlayer'>
        <div ref={ this.state.playerAnchor}></div>
      </div>
    )
  }
}

 YoutubePlayer.propTypes = {
  tracklistToShow: PropTypes.arrayOf(PropTypes.string),
  selectedTrack: PropTypes.number,
  playNextTrack: PropTypes.func
}