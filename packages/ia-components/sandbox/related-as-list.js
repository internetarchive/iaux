import React from 'react'
import PropTypes from 'prop-types'

import { RelatedService } from 'ia-js-client'

// TODO separate the data fetching from the presentation

export default class extends React.Component {

  static propTypes = {
    identifier: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      related: []
    }

    const relatedService = new RelatedService()
    relatedService.get({identifier: this.props.identifier}).then((results) => {
      this.setState({related: results.hits.hits})
    })
  }

  render () {
    const horizontalScrollStyling = {
      width: '100%',
      overflowX: 'scroll',
      margin: 'auto',
      whiteSpace: 'nowrap'
    }
    let children = this.state.related.map((row) => {
      return <li style={{display: 'inline-block', margin: '1rem', maxWidth: 200}}>
        <a href={`?identifier=${row._id}`}>
          <img src={`https://archive.org/services/img/${row._id}`} />
          <p>{ row._source.title[0] }</p>
        </a>
      </li>
    })
    if (children.length === 0) {
      children.push(<li>[related]</li>)
    }
    return <div>
      <h2>Related</h2>
      <ul style={horizontalScrollStyling}>{children}</ul>
    </div>
  }
}