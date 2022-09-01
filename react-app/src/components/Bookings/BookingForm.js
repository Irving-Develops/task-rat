import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookingThunk } from '../../store/booking';
import { editTaskThunk } from '../../store/tasks';
import LoginFormModal from '../auth/LoginFormModal';
import "./BookingForm.css"

function BookingForm({ task, modalCheck }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let tags;
  if (task) {
    tags = Object.values(task.tags).map(tag => tag.id.toString())
  }

  const [setValidationErrors] = useState([]);


  const handleBooking = async (e) => {
    try {
      e.preventDefault();

      const booking = {
        completed: false,
        tasker_id: sessionUser.id,
        task_id: task.id
      }
      const payload = {
        ...task,
        available: false,
        tags
      }
      const newBooking = await dispatch(addBookingThunk(booking));
      const editedTask = await dispatch(editTaskThunk(payload))

      if (newBooking && editedTask) {
        window.alert('You have picked up this task. To view it visit your profile.')
      }
    }
    catch (error) {
      setValidationErrors(error.errors)
    }
  }
  return (
    <>
      {task && task.available === true && sessionUser && sessionUser.id !== task.poster_id && (
        modalCheck ?
        <button id="booking-form-button" onClick={handleBooking}>[Claim Task]</button>
        :
        <button
          id="booking-form-button"
          // className='profile-btns'
          onClick={handleBooking}>Claim Task</button>
      )}
      {task && task.available === true && !sessionUser && (
        <LoginFormModal task={task} modalCheck={modalCheck}/>
      )}

    </>
  );
}

export default BookingForm;
