import React from 'react';
import PropTypes from 'prop-types';

const button = props => {
  let buttonStyle={
    marginTop:'30px',
    marginLeft:'400px'
  }
  return(  
        <div >
          <button style={buttonStyle}>{props.value}</button>
        </div>
      )
};

button.propTypes = {
  value:PropTypes.string.isRequired
};

export default button;