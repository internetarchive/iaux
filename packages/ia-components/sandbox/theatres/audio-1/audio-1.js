import React from 'react'
import PropTypes from 'prop-types';

import { MetadataService, Item } from 'ia-js-client'

import SpotifyIcon from './spotify-icon.svg'
import SpotifyIconWithBorder from './spotify-icon-with-border.svg'

import YoutubeIcon from './youtube-icon.svg'
import YoutubeIconWithBorder from './youtube-icon-with-border.svg'
import BrNavImg from './br-nav.png'
import PlayTriangle from './play-triangle.svg'

// import JwNavImg from './jw-screenshot2.png'

import AudioNavigation from './audio-nav'
import TheatreHamburger from '../../theatre-hamburger/theatre-hamburger'

import JWPlayerContainer from '../../jwplayer-comp/jwplayer-comp'

// TODO
// iterate over all tracks
// implement rough design


// These get set as inline styles
// TODO figure out better css architecture for components
// const styles = {
//   minHeight: '200px'
// }

export default class extends React.Component {
  static propTypes = {
    identifier: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      mediaFiles: [],
      title: '',
      creator: '',
      primaryImageUrl: null,
      allSpotifyIds: []
    }

    const mdClient = new MetadataService()

    mdClient.get({identifier: this.props.identifier}).then((md) => {
      this.setState({
        title: md.data.getSafe('title')[0],
        creator: md.data.getSafe('creator')[0]
      })
    })

    let item = new Item(this.props.identifier)

    item.getAudioTracks().then((mediaFiles) => {
      let allSpotifyIds = []

      mediaFiles.map((track, idx) => {
        if (track.spotifyId) {
          allSpotifyIds.push(track.spotifyId)
        }
      })
      this.setState({mediaFiles, allSpotifyIds})
    })

    item.getDetailsData().then(detailsResponse => {
      this.setState({primaryImageUrl: detailsResponse.theatreMainImageUrl})
    })
  }

  render() {

    let trackRows = this.state.mediaFiles.map((track, idx) => {
      let spotify = null
      let youtube = null
      if (track.spotifyId) {
        spotify = <a href={`https://open.spotify.com/track/${track.spotifyId}`} target="_blank"><img src={SpotifyIcon} /></a>
      }
      if (track.youtubeId) {
        youtube = <a href={`https://youtube.com/watch?v=${track.youtubeId}`} target="_blank"><img src={YoutubeIcon} /></a>
      }

      let seconds = String(Math.floor(track.length % 60))
      if (seconds.length == 1)
        seconds = seconds + '0'

      let len = `${Math.floor(track.length / 60)}:${seconds}`

      return (<tr>
        <td>{idx + 1}</td>
        <td>{track.name}</td>
        <td>{track.artist}</td>
        <td>{len}</td>
        <td>
          <span className="streamLinkWrapper">{youtube}</span>
          <span className="streamLinkWrapper">{spotify}</span>
        </td>
      </tr>)
    })



    let imgUrl = this.state.primaryImageUrl

    let playlist = []
    playlist = this.state.mediaFiles.map((audioFile, idx) => {
      return {
        //image: `https://archive.org${audioFile.waveformUrl}`,
        sources: audioFile.sources.map(source => {
          return {...source, file: `https://archive.org${source.file}` }
        })
      }
    })

    let playerEl
    let waveformImgUrl, JwNavImgEl

    if (this.state.mediaFiles.length) {
      playerEl = <JWPlayerContainer playlist={playlist}/>
      waveformImgUrl = 'https://archive.org' + this.state.mediaFiles[0].waveformUrl
      JwNavImgEl = <DwebImg className="audio__waveform__image" src={waveformImgUrl} fileObj={theFileRecord} />
    }


    ///
class DwebableImg {

  render() {
    // if in dweb context
    //return <DwebImgRaw>
    //
    //return <img src="">
  }
  // else


}
    ///

    return (
      <div className="theatre--audio1">
        <div className="audio-top-row">
          <div className="">

          </div>
          <div className="audio__flex">
            <div className="audio__images">
              <div className="audio__images__image__wrapper" style={{backgroundImage: `url("${imgUrl}")`}}>
              </div>
                <img
                  src={BrNavImg}
                  className="audio__images__nav"
                />
            </div>
            <div className="audio__tracks">
              <div className="audio__title__creator">
                <span className="title">{this.state.title}</span>
                {' by '}
                <span className="creator">{this.state.creator}</span>
                {/*<button className="play-all-button">
                  <img src={PlayTriangle} />
                  Play All Samples
                </button>
                <button className="play-all-button youtube">
                  <img src={YoutubeIcon} />
                  Play All with Youtube
                </button>
                <button className="play-all-button spotify">
                  <img src={SpotifyIcon} />
                  Play All with Spotify
                </button> */}
              </div>

              {JwNavImgEl}

              <div className="audio__player__wrapper">
                {playerEl}
              </div>

              <div className="audio__table__wrapper">
                <table className="table table-responsive white audio-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Artist</th>
                      <th>Time</th>
                      <th>Stream</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackRows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <AudioNavigation waveformImgUrl={waveformImgUrl} /> */}
        <TheatreHamburger/>
    </div>
    )
  }
}