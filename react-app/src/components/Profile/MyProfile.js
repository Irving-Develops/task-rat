import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import Bookings from '../Bookings/Bookings';
import EditProfileFormModal from './EditProfileModal';
import AverageRating from './AverageRating';
import './profile.css';
import { getBookingsThunk } from '../../store/booking';
import ProfileTaskCard from './ProfileTaskCard';
import ProfileReviews from './ProfileReviews';

const profileButtons = ['Account', 'My Tasks', 'Reviews', 'My Jobs', 'Reputation'];
const taskButtons = ['Available', 'Pending', 'Completed'];
const jobButtons = ['Current Jobs', 'Completed Jobs'];

function MyProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings);
  const tasks = useSelector(state => state.tasks);
  const reviews = useSelector((state) => state.reviews);
  const [selectedButton, setSelectedButton] = useState([0]);
  const [selectedTaskButton, setSelectedTaskButton] = useState([0]);
  const [selectedJobButton, setSelectedJobButton] = useState([0]);

  useEffect(() => {
    dispatch(getTasksThunk())
    dispatch(getReviewsThunk())
    dispatch(getBookingsThunk())
  }, [dispatch])

  let myTasks;
  if (sessionUser && tasks) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === sessionUser.id);
    console.log(myTasks)
  }
  let myAvailableTasks;
  if (sessionUser && myTasks && tasks) {
    myAvailableTasks = myTasks.filter(task => task.available === true);
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
  const pendingTasks = [];
  let bookingsArr;
  if (myTasks && bookings) {
    bookingsArr = Object.values(bookings)
    for (let i = 0; i < myTasks.length; i++) {
      for (let j = 0; j < bookingsArr.length; j++) {
        if (myTasks[i].id === bookingsArr[j].task_id && bookingsArr[j].completed === true) {
          completedTasks.push(myTasks[i]);
        }
        else if (myTasks[i].id === bookingsArr[j].task_id && bookingsArr[j].completed === false) {
          pendingTasks.push(myTasks[i]);
        }
      }
    }
  }

  console.log(completedTasks, 'complted')

  const handleClick = (index) => {
    setSelectedButton([index]);
  }

  const handleTaskClick = (index) => {
    setSelectedTaskButton([index]);
  }

  const handleJobClick = (index) => {
    setSelectedJobButton([index]);
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
              return <button key={index} className={selectedButton.includes(index) ? 'profile-btns active' : 'profile-btns'} onClick={() => handleClick(index)}>{label}</button>
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
              <div className='title'>
                <h2 className='show-h2'>My Tasks</h2>
                <div id='task-btns-div'>
                  <Link to='/tasks/new'><p id='profile-add-task'>+</p></Link>
                  {taskButtons.map((label, index) => {
                    return <button key={index} className={selectedTaskButton.includes(index) ? 'task-btns active' : 'task-btns'} onClick={() => handleTaskClick(index)}>{label}</button>
                  })}
                </div>
              </div>
              <div id='show-tasks'>
                <div id='available-task-container' style={{ display: selectedTaskButton.includes(0) ? 'grid' : 'none' }}>
                  {myAvailableTasks.length > 0 ? myAvailableTasks.map(task => {
                    return (
                      <div className='task-scroll-divs' key={task.id}>
                        <ProfileTaskCard task={task}/>
                      </div>
                    );
                  }) : <p>You currently don't have any tasks in this section.</p>}
                </div>
                <div id='pending-task-container' style={{ display: selectedTaskButton.includes(1) ? 'grid' : 'none' }}>
                  {pendingTasks.length > 0 ? pendingTasks.map(task => {
                    return (
                      <div className='task-scroll-divs' key={task.id}>
                        <ProfileTaskCard task={task}/>
                      </div>
                    );
                  }) : <p>You currently don't have any tasks in this section.</p>}
                </div>
                <div id='completed-task-container' style={{ display: selectedTaskButton.includes(2) ? 'grid' : 'none' }}>
                  {completedTasks.length > 0 ? completedTasks.map(task => {
                    return (
                      <div className='task-scroll-divs' key={task.id}>
                        <ProfileTaskCard task={task}/>
                      </div>
                    );
                  }) : <p>You currently don't have any tasks in this section.</p>}
                </div>
              </div>
            </div>
            <div id="profile-reviews">
              <ProfileReviews reviewArr={reviewArr} reviewsAboutMeArr={reviewsAboutMeArr} selectedButton={selectedButton}/>
            </div>
            <div id="profile-jobs" style={{ display: selectedButton.includes(3) ? 'grid' : 'none' }}>
              <div className='title'>
                <h2 className='show-h2'>My Jobs</h2>
                <div id='jobs-btns-div'>
                  <Link to='/tasks'><p id='profile-add-task'>+</p></Link>
                  {jobButtons.map((label, index) => {
                    return <button key={index} className={selectedJobButton.includes(index) ? 'task-btns active' : 'task-btns'} onClick={() => handleJobClick(index)}>{label}</button>
                  })}
                </div>
              </div>
              {bookings && (<Bookings reviewArr={reviewArr} bookings={bookings} selectedJobButton={selectedJobButton}/>)}
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
