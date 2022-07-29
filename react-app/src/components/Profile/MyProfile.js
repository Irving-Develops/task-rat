import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import Bookings from '../Bookings/Bookings';
import EditProfileFormModal from './EditProfileModal';
import AverageRating from './AverageRating';


function MyProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  let myTasks;
  if (sessionUser && tasks) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === sessionUser.id);
  }

  let reviewArr;
  let notSessionUsersReviews;
  if (reviews && sessionUser) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === sessionUser.id);
    notSessionUsersReviews = Object.values(reviews).filter(review => review.tasker_id !== sessionUser.id);
  }

  const reviewsAboutMeArr = [];
  if (notSessionUsersReviews && sessionUser) {
    for (let i = 0; i < myTasks.length; i++)  {
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
      {sessionUser && (
        <div>
          <h1>Mercenary: {sessionUser.first_name}</h1>
          <EditProfileFormModal user={sessionUser} />
          <img src={sessionUser.pic_url} alt="User's Icon"/>
          <AverageRating reviewsAboutMeArr={reviewsAboutMeArr}/>
          <div>
            <h2>Task's I created:</h2>
            {myTasks.length > 0 && myTasks.map(task => {
              return (
                <Link key={task.id} to={`/tasks/${task.id}`}>
                  <div>{task.title}</div>
                  <div>Danger Level: {task.danger_level}</div>
                  <div>Reward: {task.price}</div>
                  <div>Description: {task.description}</div>
                  <button>View Task</button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <Bookings reviewArr={reviewArr} />
      <Reviews myTasks={myTasks} reviewArr={reviewArr} reviewsAboutMeArr={reviewsAboutMeArr}/>
    </>
  );
}

export default MyProfile;
