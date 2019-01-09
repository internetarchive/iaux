import React from 'react'
import PropTypes from 'prop-types';

import { Item, MetadataService } from '../ia-js-client'

import SpotifyIcon from './spotify-icon.svg'
import YoutubeIcon from './youtube-icon.svg'
import BrNavImg from './br-nav.png'


import AudioNavigation from './audio-nav'

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
      tracks: [],
      title: '',
      creator: '',
    }

    const mdClient = new MetadataService()

    mdClient.get({identifier: this.props.identifier}).then((md) => {
      this.setState({
        title: md.data.getSafe('title')[0],
        creator: md.data.getSafe('creator')[0]
      })
    })

    let item = new Item(this.props.identifier)

    item.getAudioTracks().then((tracks) => {
      this.setState({tracks: tracks})
    })

  }

  render() {
    let trackRows = this.state.tracks.map((track, idx) => {
      let spotify = null
      let youtube = null
      if (track.spotifyId) {
        spotify = <a href="https://spotify.com"><img src={SpotifyIcon} /></a>
      }
      if (track.youtubeId) {
        youtube = <a href={`https://youtube.com/watch?v=${track.youtubeId}`}><img src={YoutubeIcon} /></a>
      }

      let len = `${Math.floor(track.length / 60)}:${Math.floor(track.length % 60)}`

      return (<tr>
        <td>{idx + 1}</td>
        <td>{track.name}</td>
        <td>{track.artist}</td>
        <td>{len}</td>
        <td>
          {spotify} {youtube}
        </td>
      </tr>)
    })

    let imgUrl;

    // this is how AO pulls full images
    imgUrl = "https://ia800506.us.archive.org/26/items/cd_point-of-departure_andrew-hill/Andrew%20Hill%20%281999%29%20-%20Point%20of%20Departure%20%5BFLAC%5D/IMG_00001.jpg?cnt=0"

    // This is a shortcut to get the shorter image
    imgUrl = `https://archive.org/services/img/${this.props.identifier}`

    return (
      <div className="theatre--audio1">
        <div className="row audio-top-row">
          <div className="xs-col-12">
            <div className="center white">{this.state.title} {this.state.creator}</div>
          </div>
          <div className="xs-col-12 ">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 audio__images">
                <div className="audio__images__wrapper">
                  <img
                  src={imgUrl}
                  className="audio__images__image"
                  />
                </div>
                  <img
                    src={BrNavImg}
                    className="audio__images__nav"
                  />
              </div>
              <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                <div className="row">
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
            </div>{/*/.row*/}
          </div>
        </div>
        <AudioNavigation/>
    </div>
    )
  }
}