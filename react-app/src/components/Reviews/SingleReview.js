import React, { useState } from 'react';
import EditReviewForm from './EditReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'
import EditReviewFormModal from './EditFormModal';
//import "./SingleReview.css"

function SingleReview({ review }) {
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
      {sessionUser && review.tasker_id === sessionUser.id ?
        (<div>
          {!showEditForm && (
            <div>
              <div className="rating-text">Rating: {review.rating}</div>
              <div className="rating-text">Comment: {review.comment}</div>
              <div id="edit-review-button">
                <EditReviewFormModal taskId={sessionUser.id} review={review} />
              </div>
              <button id="handle-delete-review" onClick={deleteHandler}>Delete</button>
            </div>
          )}
          {showEditForm && <EditReviewForm toggleShow={setShowEditForm} reviewProp={review} />}
        </div>) :
        (<div>
          <div className="rating-text" >Rating: {review.rating}</div>
          <div className="rating-text" >Comment: {review.comment}</div>
        </div>)
      }
    </div>
  );
}

export default SingleReview;
