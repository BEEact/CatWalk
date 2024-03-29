/* eslint-disable max-len */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import Ratings from './Ratings.jsx';
import Modal from '../../shared-components/Modal.jsx';
import ReviewForm from './ReviewForm.jsx';
import Characteristic from './Characteristic.jsx';
import { ThemeContext } from "../themeContext.jsx"
import { TrackerContext } from '../App.jsx';

export default function ReviewsSection({ reviewsMeta, name, reviewScore }) {
  const clickTracker = useContext(TrackerContext);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(2);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [filters, setFilters] = useState([]);
  const modal = useRef(null);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(async () => {
    try {
      const res = await axios.get(`/reviews?product_id=${id}&count=10000`);
      setReviews(res.data.results);
      setRenderedReviews(res.data.results.slice(0, reviewCount));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const rerenderReviews = () => {
    setRenderedReviews(reviews.slice(0, reviewCount + 2));
    setReviewCount(reviewCount + 2);
    clickTracker(`more reviews button`, 'ratings & reviews');
  };

  const handleSort = async (sortBy) => {
    try {
      const res = await axios.get(`/reviews?product_id=${id}&count=10000&sort=${sortBy}`);
      setReviews(res.data.results);
      setRenderedReviews(res.data.results.slice(0, reviewCount));
    } catch (err) {
      console.log(err);
    }
    clickTracker(`sort reviews by ${sortBy}`, 'ratings & reviews');
  };

  const handleFilter = (filterBy) => {
    let currentFilters = filters.slice();
    if (currentFilters.includes(filterBy)) {
      currentFilters.splice(currentFilters.indexOf(filterBy), 1);
    } else {
      currentFilters = [...filters, filterBy];
    }
    const filteredReviews = currentFilters.length ? reviews.slice().filter((review) => currentFilters.includes(review.rating)) : reviews;
    setRenderedReviews(filteredReviews);
    setFilters(currentFilters);
    clickTracker(`filter by ${filterBy} reviews`, 'ratings & reviews');
  };

  const openModal = () => {
    modal.current.open();
    clickTracker('review form modal', 'ratings & reviews');
  };

  return (
    <>
      <h3 className="ratings-header">Ratings & Reviews</h3>
      <div className="ratings-and-reviews">
        <div className="ratings">
          <Ratings reviewsMeta={reviewsMeta} reviewScore={reviewScore} onFilter={handleFilter} />
          {reviewsMeta.characteristics && (
            Object.keys(reviewsMeta.characteristics).map((key) => (
              <Characteristic average={reviewsMeta.characteristics[key].value} characteristic={key} key={key} />
            )))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <label style={{ marginRight: '5px' }} className="review-summary">
              {reviews.length}
              {' '}
              reviews, sorted by
              <select className={`${theme}-theme-primary review-summary`} style={{ border: 'none', textDecoration: 'underline' }} onChange={(e) => handleSort(e.target.value)}>
                <option value="relevant">relevance</option>
                <option value="helpful">helpfulness</option>
                <option value="newest">newest</option>
              </select>
            </label>
          </div>
          <div className="reviews">
            {reviews
              && renderedReviews.map((review) => (
                <ReviewTile review={review} key={review.review_id} />
              ))}
          </div>
          <div style={{ display: 'flex' }}>
            <button className={`${theme}-theme-secondary show-more-btn`} type="button" onClick={openModal}>
              Add Review
            </button>
            {!filters.length && reviewCount < reviews.length && (
              <button className={`${theme}-theme-secondary show-more-btn`} type="button" onClick={() => rerenderReviews()}>More Reviews</button>
            )}
          </div>
          <Modal ref={modal} fade>
            <ReviewForm name={name} characteristics={reviewsMeta.characteristics} modal={modal} />
          </Modal>
        </div>
      </div>
    </>
  );
}
