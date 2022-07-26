const GET_REVIEWS = 'reviews/GET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
})

export const getReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews/');
  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      return data.errors;
    }
    dispatch(getReviews(data.reviews));
  }
}

export const addReviewThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/reviews/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addReview(data));
  }
}

export const editReviewThunk = (data) => async(dispatch) => {
  console.log("data in edit thunk => ", data)
  const response = await fetch(`/api/reviews/${data.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log("response ===>", response)
  if (response.ok) {
    const review = await response.json();
    if (review.errors) {
      return;
    }
  console.log("data", data)
  dispatch(editReview(data));
  }
}

const initialState = {}

export default function review_reducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case GET_REVIEWS:
      newState = {...state}
      action.reviews.forEach((review) => newState[review.id] = review)
      return newState;
    case ADD_REVIEW:
      newState = {...state}
      newState[action.review.id] = action.review
      return newState;
    case EDIT_REVIEW:
      newState = {...state}
      newState[action.review.id] = action.review
      return newState;
    default:
      return state
  }
}
