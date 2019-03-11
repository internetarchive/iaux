import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MetadataService } from '@internetarchive/ia-js-client'

/**
 * An example component that shows how to use the IAJS library
 */
export default class extends Component {
  static displayName = "IAJSTestComponent"

  static propTypes = {
    identifier: PropTypes.string,
  }

  static defaultProps = {
    identifier: '@rchrd2',
  }

  constructor(props) {
    super(props)
    this.state = { metadata: { metadata: {} } }
    this.fetchMetadata(props.identifier)
  }

  componentDidUpdate(prevProps) {
    if (this.props.identifier !== prevProps.identifier) {
      this.fetchMetadata(this.props.identifier);
    }
  }

  fetchMetadata(identifier) {
    let metadataService = new MetadataService()
    metadataService.get({identifier: identifier}).then(metadata => {
      this.setState({metadata: metadata.data})
    })
  }

  render () {
    return (
      <div className="iajs-test-component">
        <h5>My identifier is {this.props.identifier}</h5>
        <img
          style={{maxWidth: '300px', height: 'auto'}}
          src={`https://archive.org/services/img/${this.props.identifier}`}
        />
        <p>My server is {this.state.metadata.d1}</p>
        <p>{this.state.metadata.metadata.description}</p>
      </div>
    )
  }
}
