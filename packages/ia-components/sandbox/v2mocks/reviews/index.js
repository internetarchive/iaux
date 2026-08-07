import React from 'react';
import {Component} from 'react';
import StarRating from './StarRating';
import propTypes from 'prop-types';

/**
 * Review component takes in a review object.
 * choice is available to disable the toggle button
 *<Review review={review_object} disabled={bool} />
 * @params - see Props
 * @return component
 */
class Review extends Component{
    constructor(props){
      super(props);
      this.state={
        isOpened:true
      };
      this.toggleContent = this.toggleContent.bind(this);
      this.content = this.content.bind(this);
      this.btn = React.createRef();
    }

    	componentDidMount(){

    		const reference = this.btn.current;
    		reference.hidden = (this.props.disabled) ? true : false
    		reference.className=reference.innerHTML
    	}
    	componentDidUpdate(){
         	const reference = this.btn.current;
    		reference.className=reference.innerHTML 
    	}

    content(review){
      if(!this.state.isOpened){return null}
      return(
          <div className="reviewcontent">
            <h4 className="reviewtitle">Subject: {review.reviewtitle}</h4>
            <div className="flexbody-star">
            <p className="reviewbody">{review.reviewbody}</p>
            <StarRating editing={true} name="starRates" disabled={true} size={20} rating={Number(review.stars)} />
       	 	</div> 
          </div>
      )
    }

    toggleContent(){
      this.setState({isOpened:!this.state.isOpened});
    }

    render(){
      const {review} = this.props;
      return(
        <div className="rev-container">
        <div className="reviewer">
          <h3 >Reviewer: {review.reviewer_itemname}</h3>
          <button onClick={this.toggleContent} ref={this.btn}>{this.state.isOpened ? 'close':'open'}</button>
        </div>
        {this.content(review)}
      </div>
      )
    }
}

Review.defaultProps={
	disabled:true
}

Review.propTypes={
	review:propTypes.object.isRequired,
	disabled:propTypes.bool
}

export default Review;
