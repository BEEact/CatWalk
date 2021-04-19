import React, {useState, useEffect} from 'react';
import sum from '../helperFunctions/sum';
import axios from 'axios';
import ReviewsSection from './Reviews/ReviewsSection.jsx';

export default function App(props) {
  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);
  useEffect(() => {
    let reviews = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews?product_id=13023', {
      headers: {'Authorization': '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'}
    })
    let reviewsMeta = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta?product_id=13023', {
      headers: {'Authorization': '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'}
    })

    Promise.all([reviews, reviewsMeta])
      .then(res => {
        setReviews(res[0].data)
        setReviewsMeta(res[1].data)
      })
      .catch(err => console.log('err', err));
  }, [])

  return(
    <>
      <ReviewsSection reviews={reviews} reviewsMeta={reviewsMeta} />
    </>
  )
}