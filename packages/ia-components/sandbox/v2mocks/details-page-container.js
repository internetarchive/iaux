import React from 'react'
import PropTypes from 'prop-types'

import { Item } from 'ia-js-client'

import MockDetailsPage from './details-page'
// import MockDetailsPage from './details-page-reviews-bottom'

export default class extends React.Component {

  static propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
    // ...MockDetailsPage.propTypes // TODO fix obj spread babel
  }

  constructor (props) {
    super(props)

    this.state = {
      metadata: null
    }

    this._isMounted = false

    props.item.getMetadata().then(metadata => {
      if (this._isMounted)
        this.setState({metadata: metadata.data})
      else
        this.state.metadata = metadata.data
    })
  }

  componentDidMount() {
    this._isMounted = true
  }

  render () {
    let childProps = {...this.props}

    if (this.state.metadata) {
      childProps.itemTitle  = this.state.metadata.getSafe('title')[0]
      childProps.itemCreator = this.state.metadata.getSafe('creator')[0]
      childProps.itemCollections = this.state.metadata.getSafe('collection')
    }

    return <MockDetailsPage {...childProps} />
  }
}