import React, { Component } from 'react';

export default class IAUXExampleComponent extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="example-react-component">
        <h5>Greetings from the Archive's IAUX repo.</h5>
        {
          children &&
          <div>
            <p>Here are the component's children:</p>
            { children }
          </div>
        }
      </div>
    );
  }
}
