import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../store/review';
function Reviews() {

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  let reviewArr;
  if (reviews) {
    reviewArr = Object.values(reviews);
  }
  console.log(reviews, 'this is reviews')
  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      <h1>Reviews</h1>
      {reviewArr && reviewArr.map(review => {
        return (
          <div key={review.id}>
            <div>{review.rating}</div>
            <div>{review.comment}</div>
          </div>
        )
      })}
    </>
  );
}

export default Reviews;
