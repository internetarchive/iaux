import React from 'react'
import PropTypes from 'prop-types'
import { Item } from 'ia-js-client';
import BookreaderTheatre from './bookreader-theatre/bookreader-theatre';
import Audio1 from './audio-1/audio-1'

/**
 * Uses the Item instance, to detect what theatre to show and shows it.
 */
export default class TheatreSwitcher extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Item).isRequired
  }

  static THEATRE_TYPES = {
    LOADING: 'LOADING',
    NONE: 'NONE',
    AUDIO: 'AUDIO',
    BOOKREADER: 'BOOKREADER',
  }

  constructor (props) {
    super(props)
    this.state = {
      theatreType: TheatreSwitcher.THEATRE_TYPES.LOADING
    }
    this.props.item.getMetadataField('mediatype', true).then(values => {
      let theatreType = {
        'texts': TheatreSwitcher.THEATRE_TYPES.BOOKREADER,
        'audio': TheatreSwitcher.THEATRE_TYPES.AUDIO,
      }[values[0]] || TheatreSwitcher.THEATRE_TYPES.NONE
      this.setState({
        theatreType: theatreType
      })
    })
  }

  render () {
    let theatreEl = <div>No theatre</div>
    switch (this.state.theatreType) {
      case TheatreSwitcher.THEATRE_TYPES.BOOKREADER:
        theatreEl = <BookreaderTheatre item={this.props.item} />
        break;
      case TheatreSwitcher.THEATRE_TYPES.AUDIO:
        theatreEl = <Audio1 identifier={this.props.item.identifier} />
        break;
      case TheatreSwitcher.THEATRE_TYPES.NONE:
        theatreEl = <div style={{
          color: 'grey',
          textAlign: 'center',
          paddingTop: '100px'
        }}>No displayable media.</div>
        break;
      default:
        theatreEl = <div style={{
          color: 'grey',
          textAlign: 'center',
          paddingTop: '100px'
        }}>Loading...</div>
    }
    return theatreEl
  }
}