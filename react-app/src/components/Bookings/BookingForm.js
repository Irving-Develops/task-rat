import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBookingThunk } from '../../store/booking';
import { editTaskThunk } from '../../store/tasks';

function BookingForm({task}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);
  // const [completed, setCompleted] = useState(false);
  // const [tasker, setTasker] = useState(sessionUser.id);
  // const [task, setTask] = useState(s)

  const handleBooking = async (e) => {
    try {
      e.preventDefault();

      const booking = {
        completed: false,
        tasker_id: sessionUser.id,
        task_id: task.id
      }

      const newBooking = await dispatch(addBookingThunk(booking));

      // task update goes here

      if (newBooking) {
        
      }
    }
    catch (error) {
      setValidationErrors(error.errors)
    }
  }
  return (
    <>
    <button onClick={handleBooking}></button>
    </>
  );
}

export default BookingForm;
