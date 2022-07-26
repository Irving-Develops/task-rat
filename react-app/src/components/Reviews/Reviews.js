import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review';
import SingleReview from './SingleReview'

function Reviews() {

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  let reviewArr;
  if (reviews) {
    reviewArr = Object.values(reviews);
  }

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      <h1>Reviews</h1>
      {reviewArr && reviewArr.map(review => {
        return (
          <SingleReview key={review.id } review={review}/>
        )
      })}
    </>
  );
}

export default Reviews;
