import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IAAudioPlayer from './players_by_type/archive-audio-with-waveform';
import ThirdPartyEmbededPlayer from './players_by_type/third-party-embed';
import { HorizontalRadioGroup } from '../../../../index';

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

    this.showMedia = this.showMedia.bind(this);
    this.createTabs = this.createTabs.bind(this);
  }

  /**
   * Render function - Choose player according to `source
   */
  showMedia() {
    const {
      source, sourceData, urlExtensions = ''
    } = this.props;
    const { urlPrefix, id, mediaName } = sourceData;
    const isExternal = source === 'youtube' || source === 'spotify';
    let mediaElement = <IAAudioPlayer {...this.props} />;
    if (isExternal) {
      // make iframe with URL
      const sourceURL = `${urlPrefix}${id}${urlExtensions}`;
      mediaElement = (
        <ThirdPartyEmbededPlayer
          sourceURL={sourceURL}
          title={mediaName}
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
      label: customSourceLabel
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
          { this.showMedia() }
          { /* todo: add liner notes book reader here */ }
        </div>
        <div className="tabs">
          { this.createTabs() }
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
    'archive'
  ]).isRequired,
  sourceData: PropTypes.shape({
    urlPrefix: PropTypes.string,
    id: PropTypes.string,
    mediaName: PropTypes.string
  }).isRequired,
  urlExtensions: PropTypes.string,
  backgroundPhoto: PropTypes.string,
  photoAltTag: PropTypes.string,
  customSourceLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object // React component
  ]).isRequired,
};
