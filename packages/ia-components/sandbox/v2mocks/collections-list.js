import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {

  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  renderCollection (identifier, name) {
    // TODO also render the name of the collection
    name = identifier
    return <div className="collection-item">
      <a
        href={`/details/${identifier}`}
        data-event-click-tracking={`CollectionList|${identifier}`}>
          {identifier}
      </a>
      <div className="item-img">
        <a
          href={`/details/${identifier}`}
          style={{backgroundImage: `url(https://archive.org/services/img/${identifier})`}} aria-hidden="true"
          data-event-click-tracking={`CollectionList|${identifier}`}
        />
      </div>
    </div>
  }

  render () {
    return <div className="boxy collection-list">
      <section className="collection-list">
        <h5 className="collection-title">IN COLLECTIONS</h5>
        {this.props.collections.map((identifier, idx) => {
          return this.renderCollection(identifier)
        })}
      </section>
    </div>
  }
}