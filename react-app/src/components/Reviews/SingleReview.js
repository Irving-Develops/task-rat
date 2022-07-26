import React, { useState } from 'react';
import EditReviewForm from './EditReviewForm';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'

function SingleReview({review}) {
  const dispatch = useDispatch();

  const [showEditForm, setShowEditForm] = useState(false);

  const editHandler =  async () => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true)
  }

  const deleteHandler = async () => {
    dispatch(deleteReviewThunk(review))
    
  }

  return (
    <div>
        {!showEditForm &&  (
          <div>
            <div>Rating: {review.rating}</div>
            <div>Comment: {review.comment}</div>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        )}

        {showEditForm && <EditReviewForm toggleShow={setShowEditForm} reviewProp={review}/>}
    </div>
  );
}

export default SingleReview;
