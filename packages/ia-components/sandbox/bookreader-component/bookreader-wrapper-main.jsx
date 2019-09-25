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
 * TODO - someone could merge all or part of BookreaderJSIA into here and obsolete BookreaderJSIA ideally without changing the interface
 * TODO - except Isa doesnt want the Archive's lending logic in here.
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
 *
 * Questions for ISA
 * - why are defaultStartLeaf and titleLeaf not in defaultOptions ? I also moved them to start of list so can be overridden
 * - I reinstated IABookReaderMessageWrapper (just for the JSIA case) which I'm guessing is used by lending tools to put their message
 * - Any reason options.onePage.autofit is defaulting to 'height' not 'auto' (which is what I've seen before
 * - What is going on with the getPgeURI definition, a comment would be good
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
      //TODO-ISA what is going on here, a comment would be useful ? (same on bookreader-wrapper-main and bookreader-wrapper-jsia)
      getPageURI: (index, reduce = 1, rotate = 0) => {
        let uri = originalGetPageURI.call(br, index, reduce, rotate);
        uri += (uri.indexOf('?') > -1 ? '&' : '?');
        uri = `${uri}scale=${reduce}&rotate=${rotate}`;
        return uri;
      },
    };
    const fullOptions = {
      defaultStartLeaf: 0,
      titleLeaf: 0,
      ...defaultOptions,
      ...options,
    };
    // There are two ways to initialize BookReader, eithr through JSIA which includes IA specific lending info
    // or the simpler initialization without IA.
    if (this.props.jsia) {
      BookReaderJSIAinit(this.props.jsia, fullOptions); // Creates window.br
    } else {
      const br = new BookReader(fullOptions);
      window.br = br;
      br.init();
    }
  }

  render() {
    return (
      <section id="IABookReaderWrapper" {...this.props}>
        {!this.props.jsia ? null :
          <div id="IABookReaderMessageWrapper" style={{display: "none"}}></div>
        }
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
