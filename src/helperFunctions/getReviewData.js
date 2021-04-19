export default function getReviewData(id, callback) {
  let reviews = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews?product_id=${id}`, {
      headers: {'Authorization': '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'}
    })
    let reviewsMeta = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta?product_id=${id}`, {
      headers: {'Authorization': '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'}
    })

    Promise.all([reviews, reviewsMeta])
      .then(res => {
        callback(null, res)
      })
      .catch(err => callback(err));
}