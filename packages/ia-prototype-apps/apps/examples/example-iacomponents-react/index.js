import * as React from 'react';
import ReactDOM from 'react-dom';
import ExampleReactComponent from 'ia-components/example-react-component/index'


const App = () => (
  <div className="App">
    <ExampleReactComponent />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));