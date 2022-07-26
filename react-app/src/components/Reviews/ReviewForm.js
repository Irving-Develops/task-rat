import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addReviewThunk } from '../../store/review';

function ReviewForm() {

  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const taskId = 1;
  // const task = useSelector(state => state.tasks[taskId])
  // const [validationErrors, setValidationErrors]
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleCancel = (e) => {
    e.preventDefault();
    setRating(1);
    setComment('');
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      rating,
      comment,
      tasker_id: sessionUser.id,
      task_id: taskId
    }

    const newReview = await dispatch(addReviewThunk(data));

    if (newReview) {
      setRating(1);
      setComment('');
      window.alert('WOOO!')
    }
  }

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div>
          <label>Comment</label>
          <input
            value={comment}
            required
            type='text'
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
