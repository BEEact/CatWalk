import getReviewData from './getReviewData.js';
import axios from '../axios';


it('returns the review data fro a given id', async () => {
  axios.get.mockResolvedValue({
    data: {
      "review_id": 288448,
      "rating": 5,
      "summary": "Makes me smile",
      "recommend": true,
      "response": null,
      "body": "This product is great because it puts a little smile on my face!",
      "date": "2021-03-08T00:00:00.000Z",
      "reviewer_name": "SmilingSean",
      "helpfulness": 42,
      "photos": [
          {
              "id": 496602,
              "url": "https://i.ibb.co/5xbC4Xk/happy-Monkey.jpg"
          }
      ]
    }
  })

  const reviews = await getReviewData(13023, (res) => res)
  const firstReview = reviews[0].results[0];
  console.log(firstReview)

  expect(reviews.length).toEqual(2);
  expect(firstReview.review_id).toEqual(288448)
})

