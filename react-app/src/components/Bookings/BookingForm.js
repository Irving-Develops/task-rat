import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookingThunk } from '../../store/booking';
import { editTaskThunk } from '../../store/tasks';

function BookingForm({task}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);


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
      }
      console.log(payload, 'this is the payload')
      const newBooking = await dispatch(addBookingThunk(booking));
      const editedTask = await dispatch(editTaskThunk(payload))
      // task update goes here

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
      <button onClick={handleBooking}>Claim Task</button>
    )}
    </>
  );
}

export default BookingForm;
