import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review';
import SingleReview from './SingleReview'

function Reviews({ reviewArr, user, reviewsAboutMeArr }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      {sessionUser && !user && <h2>Heres what you have to say about previous missions</h2>}

      {sessionUser && !user && reviewArr.length > 0 && reviewArr.map(review => {
        return (
          <SingleReview key={review.id} review={review} />
        )
      })}

      <h2>Reputation</h2>
      {reviewsAboutMeArr && reviewsAboutMeArr.length > 0 && reviewsAboutMeArr.map(review => {
        return (
          <SingleReview key={review.id} review={review} />
        )
      })}
    </>
  );
}

export default Reviews;
