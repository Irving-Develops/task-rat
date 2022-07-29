import React, { useState } from 'react';
import EditReviewForm from './EditReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'

function SingleReview({review}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const [showEditForm, setShowEditForm] = useState(false);

  const editHandler = () => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true)
  }

  const deleteHandler = async () => {
    await dispatch(deleteReviewThunk(review))
  }

  return (
    <div>
        {review.tasker_id === sessionUser.id ?

          ( <div>
              {!showEditForm && (
                <div>
                  <div>Rating: {review.rating}</div>
                  <div>Comment: {review.comment}</div>
                  <button onClick={editHandler}>Edit</button>
                  <button onClick={deleteHandler}>Delete</button>
                </div>
              )}
              {showEditForm && <EditReviewForm toggleShow={setShowEditForm} reviewProp={review}/>}
            </div> ) :
          (<div>
            <div>Rating: {review.rating}</div>
            <div>Comment: {review.comment}</div>
          </div>)
        }
    </div>
  );
}

export default SingleReview;
