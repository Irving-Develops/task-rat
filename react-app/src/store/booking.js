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
    if(res.ok) {
        const data = await res.json()
        console.log(data, 'data inside getbthunk')
        dispatch(getBookings(data.bookings))
    }
    else {
      const err = await res.json();
      throw err;
    }
}

export const addBookingThunk = (data) => async (dispatch) => {
  console.log(data, 'data line 40')
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const data = await response.json();
    console.log(data, 'data line 50')
    dispatch(addBooking(data));
    return data;
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
    const data = await response.json();
    dispatch(editBooking(data));
    return data;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const deleteReviewThunk = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBooking(data));
    return data;
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
            console.log(action.bookings, 'action bookings')
            action.bookings.forEach(booking => newState[booking.id] = booking);
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
