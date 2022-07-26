import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review';
import EditReviewForm from './EditReviewForm'

function SingleReview({review}) {
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState("false");

  const editHandler =  async(e) => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true)
  }

//   useEffect(() => {
//     dispatch(getReviewsThunk())
//   }, [dispatch])

  return (
    <div>
        <div>{review.rating}</div>
        <div>{review.comment}</div>
        <button
        onClick={editHandler}
        >Edit</button>
        {showEditForm && <EditReviewForm toggleShow={setShowEditForm} reviewProp={review}/>}
    </div>
  );
}

export default SingleReview;
