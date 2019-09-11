import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * BookReaderWrapper wraps globally accessible BookReader to create an instance
 *
 * This component is client-side only.
 * This component expects all necessary scripts for BookReader to be pre-loaded onto the page before use.
 * Please see https://github.com/internetarchive/bookreader for more instructions & examples.
 *
 * global: BookReader
 * Creates a global: window.br (which Search will need)
 *
 */
export default class BookReaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.BookReaderRef = React.createRef();
  }

  componentDidMount() {
    const { options } = this.props;

    const originalGetPageURI = BookReader.prototype.getPageURI;
    const defaultOptions = {
      el: `#${this.BookReaderRef.current.id}`,
      mobileNavFullscreenOnly: true,
      onePage: { autofit: 'height' }, // options: auto, width, height
      ui: 'full',
      enablePageResume: false,
      enableTtsPlugin: false,
      enableUrlPlugin: false,
      defaults: 'mode/1up',
      enableSearch: true,
      searchInsideUrl: '/fulltext/inside.php',
      initialSearchTerm: null,
      imagesBaseURL: '/bookreader/BookReader/images/',
      getPageURI: (index, reduce = 1, rotate = 0) => {
        let uri = originalGetPageURI.call(br, index, reduce, rotate);
        uri += (uri.indexOf('?') > -1 ? '&' : '?');
        uri = `${uri}scale=${reduce}&rotate=${rotate}`;
        return uri;
      },
    };
    const fullOptions = {
      ...defaultOptions,
      ...options,
      defaultStartLeaf: 0,
      titleLeaf: 0,
    };
    const br = new BookReader(fullOptions);
    window.br = br;
    br.init();
  }

  render() {
    return (
      <section id="IABookReaderWrapper" {...this.props}>
        <div id="bookreader" ref={this.BookReaderRef} style={{ height: '100%', width: '100%' }} />
      </section>
    );
  }
}

BookReaderWrapper.defaultProps = {
  options: {},
};

BookReaderWrapper.propTypes = {
  options: PropTypes.object,
};
