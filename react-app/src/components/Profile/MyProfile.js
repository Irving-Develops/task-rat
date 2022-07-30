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
import { getBookingsThunk } from '../../store/booking';

const profileButtons = ['Account', 'My Tasks', 'Reviews', 'Current Missions', 'Reputation'];
const taskButtons = ['Available', 'Pending', 'Completed'];

function MyProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings);
  const tasks = useSelector(state => state.tasks);
  const reviews = useSelector((state) => state.reviews);
  const [selectedButton, setSelectedButton] = useState([0]);
  const [selectedTaskButton, setSelectedTaskButton] = useState([0]);

  useEffect(() => {
    dispatch(getTasksThunk())
    dispatch(getReviewsThunk())
    dispatch(getBookingsThunk())
  }, [dispatch])

  let myTasks;
  if (sessionUser && tasks) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === sessionUser.id);
  }
  let myAvailableTasks;
  let notAvailableTasks;
  if (sessionUser && myTasks && tasks) {
    myAvailableTasks = myTasks.filter(task => task.available === true);
    notAvailableTasks = myTasks.filter(task => task.available === false);
  }

  let reviewArr;
  let notSessionUsersReviews;
  if (reviews && sessionUser) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === sessionUser.id);
    notSessionUsersReviews = Object.values(reviews).filter(review => review.tasker_id !== sessionUser.id);
  }

  const reviewsAboutMeArr = [];
  if (notSessionUsersReviews && sessionUser) {
    for (let i = 0; i < myTasks.length; i++) {
      for (let j = 0; j < notSessionUsersReviews.length; j++) {
        if (myTasks[i].id === notSessionUsersReviews[j].task_id) {
          reviewsAboutMeArr.push(notSessionUsersReviews[j]);
        }
      }
    }
  }

  const completedTasks = [];
  let bookingsArr;
  if (myTasks && bookings) {
    bookingsArr = Object.values(bookings)
    for (let i = 0; i < myTasks.length; i++) {
      for (let j = 0; j < bookingsArr.length; j++) {
        if (myTasks[i].id === bookingsArr[j].task_id && bookingsArr[j].completed === false) {
          completedTasks.push(myTasks[i]);
        }
      }
    }
  }
  if (completedTasks) console.log(completedTasks, 'completed tasks;')

  const handleClick = (index) => {
    setSelectedButton([index]);
  }

  const handleTaskClick = (index) => {
    setSelectedTaskButton([index]);
  }


  return (
    <div id="profile-page">
      {sessionUser && (
        <div id="profile-container">
          <h1 id="profile-h1">Mercenary: {sessionUser.first_name}</h1>
          <AverageRating reviewsAboutMeArr={reviewsAboutMeArr}/>
          <div id='p-btns-div'>
            <p id='profile-welcome'>Welcome!</p>
          <div id="btns-div">
            {profileButtons.map((label, index) => {
              return <button className={selectedButton.includes(index) ? 'profile-btns active' : 'profile-btns'} onClick={() => handleClick(index)}>{label}</button>
            })}
          </div>
          </div>
          <div id='show-profile'>
            <div id="profile-account" style={{ display: selectedButton.includes(0) ? 'grid' : 'none' }}>
              <div id="name-img-div">
                <p className='profile-p' id="profile-name">{sessionUser.first_name} {sessionUser.last_name}</p>
                <img id="profile-pic" src={sessionUser.pic_url} alt="User's Icon"/>
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
            <div id="profile-tasks" style={{ display: selectedButton.includes(1) ? 'grid' : 'none' }}>
              <div id='tasks-title'>
                <h2 id='tasks-h2'>My Task's:</h2>
                <div id='task-btns-div'>
                  {taskButtons.map((label, index) => {
                    return <button className={selectedTaskButton.includes(index) ? 'task-btns active' : 'task-btns'} onClick={() => handleTaskClick(index)}>{label}</button>
                  })}
                </div>
              </div>
              <div id='show-tasks'>
                <div id='available-task-container' style={{ display: selectedTaskButton.includes(0) ? 'grid' : 'none' }}>
                  {myAvailableTasks.length > 0 && myAvailableTasks.map(task => {
                    return (
                      <div> Available Tasks
                        <Link key={task.id} to={`/tasks/${task.id}`}>
                          <div>{task.title}</div>
                          <div>Danger Level: {task.danger_level}</div>
                          <div>Reward: {task.price}</div>
                          <div>Description: {task.description}</div>
                          <button>Details</button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div id='pending-task-container' style={{ display: selectedTaskButton.includes(1) ? 'grid' : 'none' }}>
                  {notAvailableTasks.length > 0 && notAvailableTasks.map(task => {
                    return (
                      <div> Pending Tasks
                        <Link key={task.id} to={`/tasks/${task.id}`}>
                          <div>{task.title}</div>
                          <div>Danger Level: {task.danger_level}</div>
                          <div>Reward: {task.price}</div>
                          <div>Description: {task.description}</div>
                          <button>Details</button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div id='completed-task-container' style={{ display: selectedTaskButton.includes(2) ? 'grid' : 'none' }}>
                  {completedTasks.length > 0 && completedTasks.map(task => {
                    return (
                      <div> Completed Tasks
                        <Link key={task.id} to={`/tasks/${task.id}`}>
                          <div>{task.title}</div>
                          <div>Danger Level: {task.danger_level}</div>
                          <div>Reward: {task.price}</div>
                          <div>Description: {task.description}</div>
                          <button>Details</button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div id="profile-reviews" style={{ display: selectedButton.includes(2) ? 'grid' : 'none' }}>
              <Reviews myTasks={myTasks} reviewArr={reviewArr} reviewsAboutMeArr={reviewsAboutMeArr}/>
            </div>
            <div id="profile-current-missions" style={{ display: selectedButton.includes(3) ? 'grid' : 'none' }}>
              {bookings && (<Bookings reviewArr={reviewArr} bookings={bookings}/>)}
            </div>
            <div id="profile-reputation" style={{ display: selectedButton.includes(4) ? 'grid' : 'none' }}>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
