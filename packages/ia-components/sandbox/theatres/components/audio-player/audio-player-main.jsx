import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArchiveAudioPlayer from './players_by_type/archive-audio-jwplayer-wrapper';
import ThirdPartyEmbeddedPlayer from './players_by_type/third-party-embed';
import { HorizontalRadioGroup } from '../../../../index';

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
      urlSetterFN: null,
    };

    this.showMedia = this.showMedia.bind(this);
    this.createTabs = this.createTabs.bind(this);
    this.receiveURLSetter = this.receiveURLSetter.bind(this);
  }

  /**
   * Save URL Setter function that comes back from Play8 instantiation
   */
  receiveURLSetter(urlSetterFN) {
    this.setState({ urlSetterFN });
  }

  /**
   * Render function - Choose player according to `source
   */
  showMedia() {
    const { source, sourceData } = this.props;
    const isExternal = source === 'youtube' || source === 'spotify';
    let mediaElement = (
      <ArchiveAudioPlayer
        {...this.props}
        onRegistrationComplete={this.receiveURLSetter}
        needsURLSettingAccess
      />
    );
    if (isExternal) {
      // make iframe with URL
      const { urlSetterFN } = this.state;
      const externalSourceDetails = sourceData[source] || {};
      const {
        urlPrefix = '', id = '', urlExtensions = '', name = ''
      } = externalSourceDetails;

      const { trackNumber = 1 } = sourceData;

      const sourceURL = `${urlPrefix}${id}${urlExtensions}`;
      mediaElement = (
        <ThirdPartyEmbeddedPlayer
          sourceURL={sourceURL}
          title={name}

        />
      );
      // updateURL
      if (urlSetterFN) {
        urlSetterFN(trackNumber);
      }
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
    return (
      <section className="theatre__audio-player">
        <div className="content-window">
          {drawBackgroundPhoto(this.props)}
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
