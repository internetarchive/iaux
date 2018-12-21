import React from 'react'
import PropTypes from 'prop-types';

import SpotifyIcon from './spotify-icon.svg'
import YoutubeIcon from './youtube-icon.svg'
import PlayTriangleSvg from './nav-assets/nav-play.svg'
import PrevSvg from './nav-assets/nav-backward.svg'
import NextSvg from './nav-assets/nav-forward.svg'

import WaveFormSvg from './nav-assets/waveform.svg'


export default class extends React.Component {
  static PropTypes = {
    waveformImgUrl: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      showWaveForm: false,
    }
    this.toggleWaveform = this.toggleWaveform.bind(this)
  }

  toggleWaveform() {
    this.setState({
      showWaveForm: !this.state.showWaveForm
    })
  }

  render () {
    console.log(this.props)
    let waveformEl
    if (this.props.waveformImgUrl && this.state.showWaveForm) {
      waveformEl = <div className="audio-navigation-waveform-wrapper">
        <div className="audio-navigation-waveform" style={{backgroundImage: `url(${this.props.waveformImgUrl})`}}></div>
      </div>
    }
    return <div>
        {waveformEl}
        <div className="audio-navigation">
        <div className="left">
          <button className="nav-button"><img src={PlayTriangleSvg} /></button>
          <button className="nav-button"><img src={PrevSvg} /></button>
          <button className="nav-button"><img src={NextSvg} /></button>
        </div>
        <div className="scrubber"></div>
        <div className="right">
          <div className="progress-txt">00:00 / 04:33</div>
          <button className="nav-button" onClick={this.toggleWaveform}>
            <img src={WaveFormSvg} />
          </button>
        </div>
      </div>
    </div>
  }
}