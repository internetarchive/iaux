import React from 'react'
import PropTypes from 'prop-types';

import TheatreHamburger from '../../theatre-hamburger/theatre-hamburger'
import BookReaderComponent from '../../bookreader-component/bookreader'
import BookReaderJsIaComponent from '../../bookreader-component/bookreader-jsia'

import { Item, BookController, BookReaderJsIaService } from 'ia-js-client'

export default class extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Item).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      jsIaData: null,
      brOptions: null
    }
  }

  componentDidMount() {
    let bookReaderJsIaService = new BookReaderJsIaService()
    bookReaderJsIaService.get({identifier: this.props.item.identifier}).then((jsIaData => {
      this.setState({jsIaData: jsIaData.data})
    }))

  }

  render() {
    let bookReaderComponent = null
    if (this.state.jsIaData) {
      bookReaderComponent = <BookReaderJsIaComponent data={this.state.jsIaData} />
    }
    return (
      <div className="theatre--bookreader">
        {bookReaderComponent}
        {/* <TheatreHamburger/> */}
      </div>
    )
  }
}