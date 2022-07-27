import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsThunk } from '../../store/booking';
import BookedTasks from './BookedTasks'

function Bookings() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);
    const sessionUser = useSelector(state => state.session.user)
    let bookingsArr ;
    if(bookings && sessionUser) {
        bookingsArr = Object.values(bookings).filter(booking => booking.tasker_id === sessionUser.id);
    }


    useEffect(() => {
        dispatch(getBookingsThunk())
    }, [dispatch])

    return (
        <>
        <h1>Current Missions</h1>
        {bookingsArr && bookingsArr.length > 0 && bookingsArr.map(booking => {
          return (
            <div key={booking.id}>
              <BookedTasks task_id={booking.task_id} booking={booking}/>
            </div>
          );
        })}
        </>
    )
}

export default Bookings;
