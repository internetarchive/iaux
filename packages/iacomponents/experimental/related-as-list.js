import React from 'react'
import PropTypes from 'prop-types'

import { RelatedService } from 'iajs'

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
    let children = this.state.related.map((row) => {
      return <li style={{display: 'inline-block', margin: '1rem'}}>
        <a href={`?identifier=${row._id}`}>
          <img src={`https://archive.org/services/img/${row._id}`} />
        </a>
      </li>
    })
    if (children.length === 0) {
      children.push(<li>[related]</li>)
    }
    return <div>
      <h2>Related</h2>
      <ul>{children}</ul>
    </div>
  }
}