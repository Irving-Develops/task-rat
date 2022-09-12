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
  //pass down to bookingform, checks if modal
  const modalCheck = true;

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
          <h1 id="user-name">Mercenary: {user.first_name}</h1>
          <div className='user-profile-modal-info'>
            <div className='user-profile-pic'>
              <img src={user.pic_url} alt="User's Icon" />
            </div>
            <AverageRating reviewsAboutMeArr={reviewsAboutMeArr} />
          </div>
          <div>
            <h3 id="their-tasks-header">Their Tasks:</h3>
            {myTasks.length > 0 ? myTasks.map(task => {
              return (
                <div key={task.id} className="user-profile-tasks">
                  <div className='task-modal-info-holder'>
                    <div>{task.title}</div>
                    <div>Danger Level: {task.danger_level}</div>
                    <div>Reward: {task.price} caps</div>
                  </div>
                  <div className='user-modal-task-button-holder'>
                    <Link id='details-link' to={`/tasks/${task.id}`} onClick={() => setShowModal(false)}>
                      <button id="details-button">[Details]</button>
                    </Link>
                    <div id="user-task-button">
                      <BookingForm task={task} modalCheck={modalCheck}/>
                    </div>
                  </div>
                </div>
              );
            }) : <p>{user.first_name} currently doesn't have any tasks for you to pick up.</p>}
          </div>
        </div>
      )}
      <Reviews myTasks={myTasks} reviewArr={reviewArr} user={user} reviewsAboutMeArr={reviewsAboutMeArr} />
    </>
  );
}

export default UsersProfiles;
