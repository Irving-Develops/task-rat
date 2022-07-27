import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review';
import SingleReview from './SingleReview'

function Reviews({myTasks}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);

  let reviewArr;
  if (reviews && sessionUser) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === sessionUser.id);
  }

  const reviewsAboutMeArr = [];
  if (reviews && sessionUser) {
    const allReviews = Object.values(reviews);
    for (let i = 0; i < myTasks.length; i++)  {
      for (let j = 0; j < allReviews.length; j++) {
        if (myTasks[i].id === allReviews[j].task_id && allReviews[j].tasker_id !== sessionUser.id) {
          reviewsAboutMeArr.push(allReviews[j]);
        }
      }
    }
  }

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      <h2>Heres what you have to say about previous missions</h2>
      {reviewArr.length > 0 && reviewArr.map(review => {
        return (
          <SingleReview key={review.id} review={review}/>
        )
      })}
      <h2>Heres what people have to say about me</h2>
      {reviewsAboutMeArr.length > 0 && reviewsAboutMeArr.map(review => {
        return (
          <SingleReview key={review.id} review={review}/>
        )
      })}
    </>
  );
}

export default Reviews;
