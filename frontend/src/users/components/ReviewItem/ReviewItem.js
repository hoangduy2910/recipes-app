import React from "react";
import { Link } from "react-router-dom";

import StarRating from "../../../shared/components/UI/StarRating/StarRating";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  return (
    <div className="review">
      <div className="review__user">
        <div className="review__user-image">
          <img
            src={`http://localhost:5000/${props.image}`}
            alt={props.username}
          />
        </div>
        <Link to={`/${props.userId}/recipes`}>{props.username}</Link>
      </div>
      <div className="review__rating">
        <div className="review__rating-star">
          <StarRating initialRating={props.rating} isShow />
        </div>
        <div className="review__rating-date">{props.date}</div>
      </div>
      <div className="review__content">{props.content}</div>
    </div>
  );
};

export default React.memo(ReviewItem);
