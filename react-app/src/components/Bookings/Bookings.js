import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsThunk } from '../../store/booking';

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
        {bookingsArr && bookingsArr.map(booking => {
          return (
            <div key={booking.id}>
              {booking}
            </div>
          );
        })}
        </>
    )
}

export default Bookings;
