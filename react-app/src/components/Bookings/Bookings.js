import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsThunk } from '../../store/booking';
import BookedTasks from './BookedTasks'

function Bookings({reviewArr}) {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);
    const sessionUser = useSelector(state => state.session.user)
    let completedBookings;
    let currentBookings;

    if(bookings && sessionUser) {
        completedBookings = Object.values(bookings).filter(booking => booking.tasker_id === sessionUser.id && booking.completed);
        currentBookings = Object.values(bookings).filter(booking => booking.tasker_id === sessionUser.id && !booking.completed);
    }


    useEffect(() => {
        dispatch(getBookingsThunk())
    }, [dispatch])

    return (
        <>
        <h1>Completed Missions</h1>
        {completedBookings && completedBookings.length > 0 && completedBookings.map(booking => {
          return (
            <div key={booking.id}>
              <BookedTasks taskId={booking.task_id} booking={booking} reviewArr={reviewArr}/>
            </div>
          );
        })}
        <h1>Current Missions</h1>
        {currentBookings && currentBookings.length > 0 && currentBookings.map(booking => {
          return (
            <div key={booking.id}>
              <BookedTasks taskId={booking.task_id} booking={booking}/>
            </div>
          );
        })}
        </>
    )
}

export default Bookings;
