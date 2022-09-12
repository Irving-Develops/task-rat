import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editReviewThunk } from '../../store/review';
import "./EditReviewForm.css";

function EditReviewForm({ toggleShow, reviewProp }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const task = useSelector(state => state.tasks[reviewProp.task_id])
  const [validationErrors, setValidationErrors] = useState([]);
  const [rating, setRating] = useState(reviewProp.rating);
  const [comment, setComment] = useState(reviewProp.comment);

  const handleCancel = (e) => {
    e.preventDefault();
    setRating(1);
    setComment('');
    toggleShow();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        id: (reviewProp.id),
        rating,
        comment,
        tasker_id: sessionUser.id,
        task_id: (task.id)
      }

      const newReview = await dispatch(editReviewThunk(data));

      if (newReview) {
        setRating(1);
        setComment('');
        toggleShow();

      }
    }
    catch (error) {
      setValidationErrors(error.errors);
    }
  }

  return (
    <>
      <h1>Edit Review</h1>
      {validationErrors && validationErrors.length > 0 && validationErrors.map((error, index) => {
        return <div key={index}>{error}</div>
      })}
      <form className='review-form' onSubmit={handleSubmit}>
        <div className='review-divs'>
          <label>Rating: </label>
          <select className='new-review-form-input' value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className='review-divs'>
          <label>Comment: </label>
          <input
            id="edit-review-form-input"
            value={comment}
            type='text'
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <button className="review-form-btn" type='submit'>Submit</button>
          <button className="review-form-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default EditReviewForm;
