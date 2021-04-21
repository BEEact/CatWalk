import React from 'react';
import { FaCheck, FaRegStar, FaStar } from 'react-icons/fa';

export default function ReviewTile({ review }) {
  const buildStars = (rating) => {
    let total = 5;
    let stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(true);
    }
    for (let i = 0; i < total - rating; i++) {
      stars.push(false);
    }
    return stars;
  };

  const stars = buildStars(review.rating);

  return (
    <div className="review-tile">
      <div className="rating-wrapper">
        <div style={{display: 'flex', justifyContent: 'start'}}>
          {stars.map((star) => {
            if (star) {
              return <FaStar color="gold" />;
            }
            return <FaRegStar />;
          })}
        </div>
        <div className="user">{review.reviewer_name}, {review.date} </div>
      </div>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      {review.recommend && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FaCheck size={12} color="green" />
          <div style={{ marginLeft: '5px', fontSize: 'small' }}>I recommend this product</div>
        </div>
      )}
      {review.response && (
        <div className="response">
          <div style={{fontWeight: 'bold', marginBottom: '10px'}}>Response: </div>
          <div>{review.response}</div>
        </div>
      )}
    </div>
  );
};