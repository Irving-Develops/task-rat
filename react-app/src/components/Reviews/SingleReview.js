import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditReviewForm from './EditReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'
import EditReviewFormModal from './EditFormModal';
import "./SingleReview.css"

function SingleReview({ review }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showEditForm, setShowEditForm] = useState(false);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) await dispatch(deleteReviewThunk(review));
  }

  return (
    <div>
      {sessionUser && review.tasker_id === sessionUser.id ?
        (<div>
          {!showEditForm && (
            <div className='profile-review'>
              <div className='review-rating'>Rating: {review.rating}</div>
              <div className='review-comment'>Comment: {review.comment}</div>
              <Link className='view-task' to={`/tasks/${review.task_id}`}>View Task</Link>
              <div className='review-profile-btn-div'>
                <EditReviewFormModal review={review} />
                <button className='review-profile-btns' onClick={deleteHandler}>Delete</button>
              </div>
            </div>
          )}
          {showEditForm && <EditReviewForm toggleShow={setShowEditForm} reviewProp={review} />}
        </div>) :
        (<div className='profile-review'>
          <div className='review-rating'>Rating: {review.rating}</div>
          <div className='review-comment'>Comment: {review.comment}</div>
        </div>)
      }
    </div>
  );
}

export default SingleReview;
