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

    this.bindEventListeners = this.bindEventListeners.bind(this);
    this.loadBookReader = this.loadBookReader.bind(this);

    this.bindEventListeners();
  }

  componentDidMount() {
    console.log('RX bookreader mounted');
  }

  bindEventListeners() {
    console.log('BINDING EV LIS ----');
    window.addEventListener('BrBookNav:PostInit', () => {
      debugger;
      console.log('IN BrBookNav:PostInit');

      this.loadBookReader();
    });
  }

  loadBookReader() {
    const { options } = this.props;

    const originalGetPageURI = window.BookReader.prototype.getPageURI;
    const defaultOptions = {
      el: `#${this.BookReaderRef.current.id}`,
      enableMobileNav: false,
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
        // IA only supports power of 2 reduces
        const brReduce = Math.pow(2, Math.floor(Math.log2(Math.max(1, reduce))));
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
    this.bookreader = new window.BookReader(fullOptions);
    window.br = this.bookreader; // keep for legacy
    this.bookreader.init();
  }

  render() {
    return (
      <section className="bookreader-wrapper" {...this.props}>
        {!this.props.jsia ? null
          : <div id="IABookReaderMessageWrapper" style={{ display: 'none' }} />
        }
        <ia-bookreader baseHost="https://archive.org">
          <div id="IABookReaderWrapper" slot="bookreader">
            <div id="BookReader" className="BookReader" ref={this.BookReaderRef} />
          </div>
        </ia-bookreader>
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
