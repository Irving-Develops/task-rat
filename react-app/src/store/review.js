const GET_REVIEWS = 'reviews/GET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review
});

export const getReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews');
  if (response.ok) {
    const data = await response.json()
    dispatch(getReviews(data.reviews));
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const addReviewThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
    return review;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const editReviewThunk = (data) => async(dispatch) => {
  const response = await fetch(`/api/reviews/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const review = await response.json();
    dispatch(editReview(review));
    return review;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const deleteReviewThunk = (data) => async(dispatch) => {
  const response = await fetch(`/api/reviews/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(deleteReview(review));
    return review;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

const initialState = {}

export default function review_reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_REVIEWS:
      action.reviews.forEach((review) => newState[review.id] = review);
      return newState;
    case ADD_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.review.id];
      return newState;
    default:
      return state;
  }
}
