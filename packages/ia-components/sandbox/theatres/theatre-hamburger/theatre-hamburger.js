import React from 'react'
import PropTypes from 'prop-types';

import HamburgerSvg from './hamburger1.svg'

export default class extends React.Component {
  render () {
    return <div className="theatre-hamburger">
      <img src={HamburgerSvg} />
    </div>
  }
}