import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsThunk } from '../../store/booking';
// import SingleReview from './SingleReview'

function Bookings() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);

    let bookingsArr ;
    if(bookings) {
        bookingsArr = Object.values(bookings)
    }

    useEffect(() => {
        dispatch(getBookingsThunk())
    }, [dispatch])

    return (
        <>
        </>
    )
}