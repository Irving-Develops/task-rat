import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import Bookings from '../Bookings/Bookings';
import EditProfileFormModal from './EditProfileModal';
import AverageRating from './AverageRating';
import './profile.css';

function MyProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);
  const [showProfileSection, setShowProfileSection] = useState(false)
  const [buttonStyle, setButtonStyle] = useState(false);

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

  const handleClick = (e) => {
    setButtonStyle ? setButtonStyle(false) : setButtonStyle(true);
    if (setButtonStyle) {
      e.currentTarget.style.backgroundColor = '#0067b1';
      e.currentTarget.style.color = '#ffee43';
      e.currentTarget.style.borderRadius = '15px';
    }
    else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#063f67';
      e.currentTarget.style.borderRadius = '15px';
    }
  }


  return (
    <div id="profile-page">
      {sessionUser && (
        <div id="profile-container">
          <h1 id="profile-h1">Mercenary: {sessionUser.first_name}</h1>
          <AverageRating reviewsAboutMeArr={reviewsAboutMeArr}/>
          <div id="btns-div">
            <button className='profile-btns' onClick={handleClick}>Account</button>
            <button className='profile-btns' onClick={handleClick}>My Tasks</button>
            <button className='profile-btns' onClick={handleClick}>Reviews</button>
            <button className='profile-btns' onClick={handleClick}>Current Missions</button>
            <button className='profile-btns' onClick={handleClick}>Reputation</button>
          </div>
          <div id='showProfile'>
            <div id="profile-account">
              <div id="name-img-div">
                <p className='profile-p'>{sessionUser.first_name} {sessionUser.last_name}</p>
                <img src={sessionUser.pic_url} alt="User's Icon"/>
              </div>
              <div id="email-user-div">
                <p className='profile-p'>{sessionUser.username}</p>
                <p className='profile-p'>{sessionUser.email}</p>
              </div>
              <p className='profile-p' id="profile-bio">{sessionUser.bio}</p>
              <div id="location-edit-div">
                <div id="profile-location">
                  <p className='profile-p'>Located in...</p>
                  <p className='profile-p'>{sessionUser.city} {sessionUser.state}</p>
                  <p className='profile-p'>{sessionUser.country}</p>
                </div>
                <EditProfileFormModal user={sessionUser} />
              </div>
            </div>
            {/* <div id="profile-tasks">
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
            <div id="profile-reviews">
              <Reviews myTasks={myTasks} reviewArr={reviewArr} reviewsAboutMeArr={reviewsAboutMeArr}/>
            </div>
            <div id="profile-current-missions">
              <Bookings reviewArr={reviewArr} />
            </div>
            <div id="profile-reputation">

            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
