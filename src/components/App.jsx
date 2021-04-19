import React, {useState, useEffect} from 'react';
import sum from '../helperFunctions/sum';
import axios from 'axios';
import ReviewsSection from './Reviews/ReviewsSection.jsx';
import getReviewData from '../helperFunctions/getReviewData.js';

export default function App(props) {
  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);

  useEffect(() => {
    getReviewData(13023, (err, res) => {
      if (err) {
        console.log('err', err);
      } else {
        setReviews(res[0].data);
        setReviewsMeta(res[1].data);
      }
    })
  }, [])

  return(
    <>
      <ReviewsSection reviews={reviews} reviewsMeta={reviewsMeta} />
    </>
  )
}