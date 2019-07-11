import React from 'react';
import PropTypes from 'prop-types';


/**
 * This Third Party Player will render an iFrame to show the player
 * It is responsive by nature and will grow/shrink with the container #iframe-wrapper
 *
 * @param { string } sourceURL
 * @param { string } title
 *
 * @return component
 */

// Rename for spotify?
const ThirdPartyEmbeddedPlayer = ({ sourceURL, title }) => (
  <div className="iframe-wrapper">
    <iframe
      title={title}
      src={sourceURL}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen="allowfullscreen"
      className="iframe"
    />
  </div>
);

ThirdPartyEmbeddedPlayer.defaultProps = {
  title: 'Playing external media source from Archive.org',
};

ThirdPartyEmbeddedPlayer.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ThirdPartyEmbeddedPlayer;
