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

const profileButtons = ['Account', 'My Tasks', 'Reviews', 'Current Missions', 'Reputation'];

function MyProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);
  const [selectedButton, setSelectedButton] = useState([0]);

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

  const handleClick = (index) => {
    setSelectedButton([index]);
    console.log(selectedButton, 'button style')
    console.log(selectedButton.includes(0), 'this is zerro')
  }


  return (
    <div id="profile-page">
      {sessionUser && (
        <div id="profile-container">
          <h1 id="profile-h1">Mercenary: {sessionUser.first_name}</h1>
          <AverageRating reviewsAboutMeArr={reviewsAboutMeArr}/>
          <div id='p-btns-div'>
            <p id='profile-welcome'>Welcome back adventurer!</p>
          <div id="btns-div">
            {profileButtons.map((label, index) => {
              return <button className={selectedButton.includes(index) ? 'profile-btns active' : 'profile-btns'} onClick={() => handleClick(index)}>{label}</button>
            })}
          </div>
          </div>
          <div id='showProfile' >
            <div id="profile-account" style={{ display: selectedButton.includes(0) ? 'grid' : 'none' }}>
              <div id="name-img-div">
                <p className='profile-p' id="profile-name">{sessionUser.first_name} {sessionUser.last_name}</p>
                <img src={sessionUser.pic_url} alt="User's Icon"/>
              </div>
              <div id="email-user-div">
                <p className='profile-p'>{sessionUser.username}</p>
                <p className='profile-p'>{sessionUser.email}</p>
              </div>
              <p className='profile-p' id="profile-bio">{sessionUser.bio}</p>
              <div id="location-edit-div">
                <div id="profile-location">
                  <p className='profile-p' id="profile-located">Located in...</p>
                  <p className='profile-p'>{sessionUser.city} {sessionUser.state}</p>
                  <p className='profile-p'>{sessionUser.country}</p>
                </div>
                <EditProfileFormModal user={sessionUser} />
              </div>
            </div>
            <div id="profile-tasks" style={{ visibility: selectedButton.includes(1) ? 'visible' : 'hidden' }}>
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
            <div id="profile-reviews" style={{ visibility: selectedButton.includes(2) ? 'visible' : 'hidden' }}>
              <Reviews myTasks={myTasks} reviewArr={reviewArr} reviewsAboutMeArr={reviewsAboutMeArr}/>
            </div>
            <div id="profile-current-missions" style={{ visibility: selectedButton.includes(3) ? 'visible' : 'hidden' }}>
              <Bookings reviewArr={reviewArr} />
            </div>
            <div id="profile-reputation" style={{ visibility: selectedButton.includes(4) ? 'visible' : 'hidden' }}>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
