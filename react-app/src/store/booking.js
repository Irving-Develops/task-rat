const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const ADD_BOOKING = 'bookings/ADD_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings
});

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
})

const editBooking = (booking) => ({
  type: EDIT_BOOKING,
  booking
})

const deleteBooking = (booking) => ({
  type: DELETE_BOOKING,
  booking
})

export const getBookingsThunk = () => async (dispatch) => {
    const res = await fetch('/api/bookings');
    if (res.ok) {
        const data = await res.json()
        dispatch(getBookings(data.bookings))
      }
    else {
      const err = await res.json();
      throw err;
    }
}

export const addBookingThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const booking = await response.json();
    dispatch(addBooking(booking));
    return booking;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const editBookingThunk = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const booking = await response.json();
    dispatch(editBooking(booking));
    return booking;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const deleteBookingThunk = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(deleteBooking(booking));
    return booking;
  }
  else {
    const err = await response.json();
    throw err;
  }
}
const initialState = {}

export default function booking_reducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_BOOKINGS:
            action.bookings.forEach((booking) => newState[booking.id] = booking);
            return newState;
        case ADD_BOOKING:
          newState[action.booking.id] = action.booking;
          return newState;
        case EDIT_BOOKING:
          newState[action.booking.id] = action.booking;
          return newState;
        case DELETE_BOOKING:
          delete newState[action.booking.id];
          return newState;
        default:
        return state;
    }
}
