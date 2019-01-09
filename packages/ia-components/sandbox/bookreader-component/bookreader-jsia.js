import React from 'react'
import PropTypes from 'prop-types';


/**
 * A less-generic bookreader that is initialized from archive.org jsia api
 */
export default class BookReaderJsIa extends React.Component {

  static propTypes = {
    // Data from the jsia api
    data: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false;
  }

  constructor (props) {
    super(props);
    this.state = {}
    this.isBookReaderInitialized = false;
  }

  componentDidMount () {
    if (this.isBookReaderInitialized === false) {
      window.BookReader.optionOverrides.imagesBaseURL = 'https://www-richard.archive.org/bookreader/BookReader/images/'
      window.BookReaderJSIAinit(this.props.data)
      this.isBookReaderInitialized = true;
    }
  }

  render () {
    return <div>
      <div id="IABookReaderMessageWrapper"></div>
      <div
        id="BookReader"
        className="bookreader-component"
        ref="bookreader"
      ></div>
    </div>
  }
}