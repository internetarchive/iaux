import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import ArchiveAudioPlayer from './players_by_type/archive-audio-jwplayer-wrapper';
import ThirdPartyEmbeddedPlayer from './players_by_type/third-party-embed';
import { HorizontalRadioGroup } from '../../../../index';

/**
 * Creates the warning display on the music section
 *
 * @param { string } source - Can be: archive, youtube, spotify
 * @param { function } clickCB
 */
const showWarning = (source, clickCB) => {
  const sourceDisplay = source === 'youtube' ? 'YouTube' : startCase(source);
  const titleText = `About ${sourceDisplay} content`;
  const helperText = `If you have an ad-blocker or privacy plugin installed, you may need to adjust your settings to allow content from ${sourceDisplay}`;
  return (
    <div className="third-party-warning">
      <div className="warning-text">
        <h4>
          <i className="iconochive-info" />
          {titleText}
        </h4>
        <p className="helper-text">{helperText}</p>
        <button className="continue-button" type="button" onClick={clickCB}>Continue</button>
      </div>
    </div>
  );
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
      spotifyHasBeenLoaded: false,
      spotifyWarningShown: false,
      youtubeHasBeenLoaded: false,
      youtubeWarningShown: false
    };

    this.iframeRef = React.createRef();

    this.showMedia = this.showMedia.bind(this);
    this.createTabs = this.createTabs.bind(this);
    this.checkIfWeNeedToShowWarning = this.checkIfWeNeedToShowWarning.bind(this);
    this.warningContinue = this.warningContinue.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      spotifyHasBeenLoaded: prevSpotifyLoad,
      youtubeHasBeenLoaded: prevYoutubeLoad,
    } = prevState;
    const { source } = this.props;

    if (source === 'spotify' && !prevSpotifyLoad) {
      this.setState({ spotifyHasBeenLoaded: true });
    }

    if (source === 'youtube' && !prevYoutubeLoad) {
      this.setState({ youtubeHasBeenLoaded: true });
    }
  }

  /**
   * Confirms that user sees the warning text.
   * Sets state to ensure that eser does not see it again.
   *
   * @param { object } event - React synthetic event
   */
  warningContinue(event) {
    const { source } = this.props;
    const captureContinue = {};
    captureContinue[`${source}WarningShown`] = true;
    this.setState(captureContinue);
  }

  /**
   * Does logic to see if the user needs to see the warning notice
   */
  checkIfWeNeedToShowWarning() {
    const { source } = this.props;
    const {
      spotifyHasBeenLoaded,
      spotifyWarningShown,
      youtubeHasBeenLoaded,
      youtubeWarningShown
    } = this.state;

    const showSpotifyWarning = source === 'spotify' && spotifyHasBeenLoaded && !spotifyWarningShown;
    const showYoutubeWarning = source === 'youtube' && youtubeHasBeenLoaded && !youtubeWarningShown;

    return showSpotifyWarning || showYoutubeWarning;
  }

  /**
   * Render function - Choose player according to `source
   */
  showMedia() {
    const { source, sourceData } = this.props;

    if (this.checkIfWeNeedToShowWarning()) {
      return showWarning(source, this.warningContinue);
    }

    const isExternal = source === 'youtube' || source === 'spotify';
    let mediaElement = <ArchiveAudioPlayer {...this.props} />;
    if (isExternal) {
      // make iframe with URL
      const externalSourceDetails = sourceData[source] || {};
      const {
        urlPrefix = '', id = '', urlExtensions = '', name = ''
      } = externalSourceDetails;

      const sourceURL = `${urlPrefix}${id}${urlExtensions}`;
      mediaElement = (
        <ThirdPartyEmbeddedPlayer
          sourceURL={sourceURL}
          title={name}
        />
      );
    }

    return mediaElement;
  }

  /**
   * Render function - create tabs that live under the main content area
   */
  createTabs() {
    const { customSourceLabel } = this.props;
    const sourceLabel = {
      value: 'player',
      label: customSourceLabel,
    };

    return (
      <HorizontalRadioGroup
        options={[sourceLabel]}
        onChange={this.toggleMediaSource}
        selectedValue="player"
        wrapperStyle="tab-bottom"
      />
    );
  }

  render() {
    const { backgroundPhoto, photoAltTag } = this.props;

    let bgPhotoStyle = '';
    let contentWindowStyle = {};
    if (backgroundPhoto && this.checkIfWeNeedToShowWarning()) {
      bgPhotoStyle = 'blur';
      const contentWindow = document.querySelector('.content-window');
      const height = contentWindow.clientHeight;
      if (height) {
        contentWindowStyle = { height: parseInt(height, 10) };
      }
    }

    return (
      <section className="theatre__audio-player">
        <div className="content-window" style={contentWindowStyle}>
          { backgroundPhoto
            && (
              <img
                className={`background-photo ${bgPhotoStyle}`}
                src={backgroundPhoto}
                alt={photoAltTag}
              />
            )
          }

          {this.showMedia()}
          { /* todo: add liner notes book reader here */ }
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
  customSourceLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // React component
  ]).isRequired,
};
