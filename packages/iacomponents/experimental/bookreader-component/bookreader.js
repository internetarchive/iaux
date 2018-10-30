import React from 'react'
import PropTypes from 'prop-types';

// BookReader Imports

// const jQuery = require("./bookreader/BookReader/jquery-1.10.1")

// console.log(jQuery)
// window.jQuery = window.$ = jQuery

// import "./bookreader/BookReader/jquery-ui-1.12.0.min.js"
// import "./bookreader/BookReader/jquery.browser.min.js"
// import "./bookreader/BookReader/dragscrollable-br.js"
// import "./bookreader/BookReader/jquery.colorbox-min.js"
// import "./bookreader/BookReader/jquery.bt.min.js"
// import "./bookreader/BookReader/soundmanager/script/soundmanager2.js"


// import "./bookreader/BookReader/BookReader.js"
// import "./bookreader/BookReader/plugins/plugin.tts.js"
// import "./bookreader/BookReader/plugins/plugin.search.js"

export default class extends React.Component {

  static propTypes = {
    options: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false;
  }

  constructor (props) {
    super(props);
    this.state = {
      related: []
    }
  }

  componentDidMount () {
    // Create the BookReader object
    const defaultOptions = {
      el: '#' + this.refs.bookreader.id
    }

    let options = { ...defaultOptions, ...this.props.options }
    var br = new BookReader(options);
    br.init();
  }

  render () {
    return <div id="BookReader" className="bookreader-component" ref="bookreader">BOOKREADER</div>
  }
}