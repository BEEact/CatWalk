import React, {useState, useEffect} from 'react';
import sum from '../helperFunctions/sum';
import axios from 'axios';

export default function App(props) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let reviews = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews?product_id=13023', {
      headers: {'Authorization': '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'}
    })
    let reviewsMeta = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta?product_id=13023', {
      headers: {'Authorization': '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'}
    })

    Promise.all([reviews, reviewsMeta])
      .then(res => {
        let reviewsData = res.map(item => item.data)
        setReviews(reviewsData)
      })
      .catch(err => console.log('err', err));
  }, [])

  return(
    <div>Hello World</div>
  )
}