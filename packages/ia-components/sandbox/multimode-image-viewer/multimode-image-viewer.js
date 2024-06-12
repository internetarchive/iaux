import React, { Component } from 'react';

class MultimodeImageViewer extends Component {
  
  render() {
    return (
      <div style={{
              backgroundColor:'black',
              height:'300px',width:"100%", 
              padding:'10px 0 0 10px',
              display:'flex', 
              justifyContent:'center'}}>
      <div>
        <div><img 
                src={this.props.imageURL} 
                alt={this.props.imageURL}
                style={{height:'70px',width:'50px'}}/></div>
        <div><img 
                src={this.props.imageURL} 
                alt={this.props.imageURL}
                style={{height:'70px',width:'50px'}}/></div>
        <div><img 
                src={this.props.imageURL} 
                alt={this.props.imageURL}
                style={{height:'70px',width:'50px'}}/></div>
        <div><img 
                src={this.props.imageURL} 
                alt={this.props.imageURL}
                style={{height:'70px',width:'50px'}}/></div>
      </div>
      <img 
            style={{height:'280px',borderLeft:'2px solid white'}}
            src={this.props.imageURL} 
            alt={this.props.imageURL}
            />
        
      </div>
    );
  }
}

export default  MultimodeImageViewer;