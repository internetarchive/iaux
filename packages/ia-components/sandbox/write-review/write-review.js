import React, { Component } from 'react';
import Button from './button/button';

export default class WriteReview extends Component {

  render() {
    return (
      <div className="writeReview">
        <h3>Write review for <span id="bookName">{this.props.bookName}</span></h3>
        <form action="javascript:void(0);">
         <lable for="title">Title of review:</lable> 
         <input type="text" id="title"></input><br/>
         <lable for="review">Review:</lable> 
         <textarea id="review"></textarea><br/>
         <lable for="rating">Rating(Optional):</lable>
         <div id="rating">
         <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
         </div>
         
        <br/>
        <Button value="Submit"/>
        </form>
      </div>
    );
  }
}
