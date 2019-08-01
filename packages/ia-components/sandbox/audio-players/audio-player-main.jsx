import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ArchiveAudioPlayer from './archive-audio-jwplayer-wrapper';
import ThirdPartyEmbeddedPlayer from './third-party-embed';
import { HorizontalRadioGroup } from '../../index';
import BookReaderWrapper from '../bookreader-component/bookreader-wrapper-main';
import YoutubePlayer from './youtube-player';

/**
 * Draw background photo
 * if none, then show media icon
 */
const drawBackgroundPhoto = ({ backgroundPhoto, photoAltTag }) => {
  const mediaIcon = <i className="no-photo iconochive-audio" />;
  const image = backgroundPhoto
    ? (
      <img
        className="background-photo"
        src={backgroundPhoto}
        alt={photoAltTag}
      />
    )
    : mediaIcon;
  return image;
};

/**
 * Theatre Audio Player
 * This is the main controller or the audio player
 * It will toggle between IA player & third party player
 *
 * When we have liner notes, this will also be responsible for
 * toggling between liner notes & player while continuing to play audio
 *
 * Props:
 * @param array availableMedia
 */
export default class TheatreAudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaSource: 'player'
    };

    this.showMedia = this.showMedia.bind(this);
    this.createTabs = this.createTabs.bind(this);
    this.toggleMediaSource = this.toggleMediaSource.bind(this);
    this.showLinerNotes = this.showLinerNotes.bind(this);
  }

  /**
   * Toggles between available tabs, currently: player, liner notes
   *
   * @param { object } event - React Synthetic event
   */
  toggleMediaSource(event) {
    const mediaSource = event.target.value;
    this.setState({ mediaSource });
  }

  /**
   * Render function - Choose player according to `source
   */
  showMedia() {
    const { source, sourceData, playlist } = this.props;
    const isExternal = source === 'youtube' || source === 'spotify';
    let mediaElement = null;
    const externalSourceDetails = sourceData[source] || {};
    const {
      urlPrefix = '', id = '', urlExtensions = '', name = ''
    } = externalSourceDetails;
    if (source === 'youtube') {
      const { trackNumber } = sourceData;
      mediaElement = (
        <YoutubePlayer
          selectedTrack={trackNumber}
          id={id}
          playlist={playlist}
          {...this.props}
        />
      );
    } else if (source === 'spotify') {
      const sourceURL = `${urlPrefix}${id}${urlExtensions}`;
      mediaElement = (
        <ThirdPartyEmbeddedPlayer
          sourceURL={sourceURL}
          title={name}
        />
      );
    }
    const archiveStyle = isExternal ? { visibility: 'hidden' } : { visibility: 'visible' };
    return (
      <Fragment>
        <ArchiveAudioPlayer
          {...this.props}
          style={archiveStyle}
        />
        { mediaElement }
      </Fragment>
    );
  }


  /**
   * Render function - create tabs that live under the main content area
   */
  createTabs() {
    const { customSourceLabels, linerNotes } = this.props;
    const { mediaSource } = this.state;
    const sourceLabel = {
      value: 'player',
      label: customSourceLabels.player,
    };

    const options = [sourceLabel];
    if (linerNotes) {
      options.push({
        value: 'liner-notes',
        label: customSourceLabels.linerNotes,
      });
    }
    return (
      <HorizontalRadioGroup
        options={options}
        onChange={this.toggleMediaSource}
        selectedValue={mediaSource}
        wrapperStyle="tab-bottom"
      />
    );
  }

  /**
   * Render function - determines whether or not we render liner notes
   */
  showLinerNotes() {
    const { linerNotes } = this.props;
    const { mediaSource } = this.state;

    if (!linerNotes) return null;

    const bookReaderStyle = mediaSource === 'liner-notes'
      ? { visibility: 'visible' }
      : { visibility: 'hidden' };

    return (
      <div style={bookReaderStyle}>
        <BookReaderWrapper
          options={linerNotes.data.brOptions}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
          }}
        />
      </div>
    );
  }

  render() {
    // Make sure content window stays the same when toggling between sources
    // the JWplayer controls sit UNDER the album photo
    // while the other players overtake the whole content-window
    // We will have to accomodate the window's fixed height here.
    const { backgroundPhoto, playlist } = this.props;
    let mediaPlayerClass = '';
    const hasTracks = !!playlist.length;
    if (hasTracks) {
      mediaPlayerClass = backgroundPhoto ? 'no-waveform' : 'with-waveform';
    }

    return (
      <section className="theatre__audio-player">
        <div className="content-window">
          <div className="album-cover">
            {drawBackgroundPhoto(this.props)}
          </div>
          <div className={`media-player ${mediaPlayerClass}`}>
            {this.showMedia()}
            {this.showLinerNotes()}
          </div>
        </div>
        <div className="tabs">
          {this.createTabs()}
        </div>
      </section>
    );
  }
}

TheatreAudioPlayer.defaultProps = {
  backgroundPhoto: '',
  photoAltTag: '',
  urlExtensions: '',
  linerNotes: null,
};

TheatreAudioPlayer.propTypes = {
  source: PropTypes.oneOf([
    'youtube',
    'spotify',
    'archive',
  ]).isRequired,
  sourceData: PropTypes.shape({
    urlPrefix: PropTypes.string,
    id: PropTypes.string,
    mediaName: PropTypes.string,
  }).isRequired,
  urlExtensions: PropTypes.string,
  backgroundPhoto: PropTypes.string,
  photoAltTag: PropTypes.string,
  customSourceLabels: PropTypes.object,
  linerNotes: PropTypes.object,
  playlist: PropTypes.array.isRequired,
};
