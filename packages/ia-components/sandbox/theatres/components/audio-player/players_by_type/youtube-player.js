import React, { Component} from 'react'
import PropTypes from 'prop-types'

export default class YoutubePlayer extends Component {
  state={
    playerAnchor:React.createRef(),
    YTPlayer:null
  }
  componentDidMount () {
       this.loadAPI();

        window.onYouTubeIframeAPIReady=()=>{
          let YTPlayer=new window.YT.Player(this.state.playerAnchor.current,{
            height: this.props.height || 390,
            width: this.props.width || 640,
            videoId: this.props.videoId,
            playerVars:{
              controls:'1',
              autoplay:false
            },
            events: {
              onReady: this.onPlayerReady,
            }
          })
          this.setState({
            YTPlayer:YTPlayer
          })
        }
  }
  loadAPI(){
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
  onPlayerReady(e) {
    // e.target.playVideo();
    // alert('video is on...');
  }

  render () {
    return (
      <div className='YoutubePlayer'>
        <div ref={this.state.playerAnchor}></div>
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  videoId: PropTypes.string.required,
  width: PropTypes.number,
  height: PropTypes.number
}