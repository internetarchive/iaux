import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * BookReaderWrapper wraps globally accessible BookReader to create an instance
 *
 * This component is client-side only.
 * This component expects all necessary scripts for BookReader to be pre-loaded onto the page before use.
 * Please see https://github.com/internetarchive/bookreader for more instructions & examples.
 *
 * If jsia is specified then it adds Internet Archive specific stuff via the BookreaderJSIA function
 * the script BookreaderJSIA should previously have been loaded.
 *
 * The BookreaderJSIA code cant go in here, because it is InternetArchive specific,
 * future development could be a wrapper, for this, that includes BookreaderJSIA
 *
 * Note this component is used by dweb-archive for offline and dweb versions.
 *
 * global: BookReader
 * Creates a global: window.br (which Search will need)
 *
 * <BookReaderWrapper
 *   jsia={ options returned by JSIA call}  optional
 *   options={ options to override default bookreader options}
 *   />
 *
 * Note will almost certainly need a AJS.theatresize() in caller after this.
 */
export default class BookReaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.BookReaderRef = React.createRef();
    this.bookreader = {};
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
      useSrcSet: false,
      /**
       * Needed bypass to generate Image URL with scale factor.
       * We must eliminate sooner than later to allow BookReader full image fetching control
       * @param {Number} index - page index
       * @param {Number} reduce - image size scale factor
       * @param {Number} rotate - degrees of rotation
       */
      getPageURI: (index, reduce = 1, rotate = 0) => {
        const brReduce = this.bookreader.reduce || reduce;
        let uri = originalGetPageURI.call(this.bookreader, index, brReduce, rotate);
        uri += (uri.indexOf('?') > -1 ? '&' : '?');
        uri = `${uri}scale=${brReduce}&rotate=${rotate}`;
        return uri;
      },
      controls: {
        twoPage: { visible: false },
        viewmode: { visible: false },
      },
      bookType: 'linerNotes', // bookType: linerNotes, book 
    };
    const fullOptions = {
      ...defaultOptions,
      ...options,
    };
    // There are two ways to initialize BookReader, eithr through JSIA which includes IA specific lending info
    // or the simpler initialization without IA.
    if (this.props.jsia) {
      BookReaderJSIAinit(this.props.jsia, fullOptions); // Creates window.br
    } else {
      this.bookreader = new BookReader(fullOptions);
      window.br = this.bookreader; // keep for legacy
      this.bookreader.init();
    }
  }

  render() {
    return (
      <section className="bookreader-wrapper" {...this.props}>
        {!this.props.jsia ? null :
          <div id="IABookReaderMessageWrapper" style={{display: "none"}}></div>
        }
        <div id="bookreader" ref={this.BookReaderRef} style={{ height: '100%', width: '100%' }} />
      </section>
    );
  }
}

BookReaderWrapper.displayName = 'BookReaderWrapper';

BookReaderWrapper.defaultProps = {
  options: {},
};

BookReaderWrapper.propTypes = {
  options: PropTypes.object,
};
