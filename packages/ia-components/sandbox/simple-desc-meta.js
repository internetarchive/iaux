import React from 'react'
import PropTypes from 'prop-types'
import { Item } from 'ia-js-client'

export default class extends React.Component {

  static propTypes = {
    item: PropTypes.instanceOf(Item).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      metadata: null
    }

    this._isMounted = false

    props.item.getMetadata().then(metadata => {
      if (this._isMounted) {
        this.setState({metadata: metadata})
      } else {
        this.state.metadata = metadata
      }
    })
  }

  componentDidMount() {
    this._isMounted = true
  }

  render () {
    if (!this.state.metadata) {
      return <div>Loading...</div>
    }
    let displayableMetadata = {... this.state.metadata.data.metadata}

    // ['description'].forEach(key => {
    //   console.log(key)
    //   // if (typeof displayableMetadata[key] !== undefined)
    //   //   delete displayableMetadata[key]
    // })

    delete displayableMetadata.description

    let description = ''
    if (this.state.metadata.data.metadata.description) {
      description = this.state.metadata.data.metadata.description.join(' ')
    }
    // TODO sort metadata alphabetically

    return <div>
      <div
      dangerouslySetInnerHTML={{__html: description}}
      />
      <div className="simple-desc-meta__meta">
        <h3>Metadata</h3>
        <table className="table">
          <tbody>
          {Object.keys(displayableMetadata).map((key) => {
            return <tr>
              <td>{key}</td>
              <td>{displayableMetadata[key].join('; ')}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    </div>
  }
}