import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import { Link } from 'react-router-dom';
import BookingForm from '../Bookings/BookingForm';
import AverageRating from './AverageRating';
import './UsersProfiles.css'

const UsersProfiles = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);

  let myTasks;
  if (tasks && user) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === user.id);
  }

  let reviewArr;
  let notSessionUsersReviews;
  if (reviews && user) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === user.id);
    notSessionUsersReviews = Object.values(reviews).filter(review => review.tasker_id !== user.id);
  }

  const reviewsAboutMeArr = [];
  if (notSessionUsersReviews && user) {
    for (let i = 0; i < myTasks.length; i++) {
      for (let j = 0; j < notSessionUsersReviews.length; j++) {
        if (myTasks[i].id === notSessionUsersReviews[j].task_id) {
          reviewsAboutMeArr.push(notSessionUsersReviews[j]);
        }
      }
    }
  }
  
  useEffect(() => {
    dispatch(getTasksThunk())
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      {user && (
        <div>
          <h1>Mercenary: {user.first_name}</h1>
          <AverageRating reviewsAboutMeArr={reviewsAboutMeArr} />
          <img src={user.pic_url} alt="User's Icon" />
          <div>
            <h2>Their Tasks:</h2>
            {myTasks.length > 0 && myTasks.map(task => {
              return (
                <div key={task.id} className="user-profile-tasks">
                  <div>
                    <div>{task.title}</div>
                    <div>Danger Level: {task.danger_level}</div>
                    <div>Reward: {task.price}</div>
                  </div>
                  <Link to={`/tasks/${task.id}`} onClick={() => setShowModal(false)}><button id="details-button">Details</button>
                  </Link>
                  <BookingForm task={task} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Reviews myTasks={myTasks} reviewArr={reviewArr} user={user} reviewsAboutMeArr={reviewsAboutMeArr} />
    </>
  );
}

export default UsersProfiles;
