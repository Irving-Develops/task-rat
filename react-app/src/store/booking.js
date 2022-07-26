const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const ADD_BOOKING = 'bookings/ADD_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings
});

export const getBookingsThunk = () => async(dispatch) => {
    const res = await fetch('/api/bookings');

    if(res.ok) {
        const data = res.json()
        if(data.errors) {
            return data.errors;
        }
        dispatch(getBookings(data.bookings))
    }
}

export default function booking_reducer(state = {}, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_BOOKINGS:
            action.bookings.forEach(booking => newState[booking.id] = booking)
            return newState;
        default: 
        return state
    }
}