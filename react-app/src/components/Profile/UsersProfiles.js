import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import Bookings from '../Bookings/Bookings';
import { Link } from 'react-router-dom';
import BookingForm from '../Bookings/BookingForm';

const UsersProfiles = ({user, setShowModal}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);

  let myTasks;
  if (tasks && user) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === user.id);
  }

  let reviewArr;
  if (reviews && user) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === user.id);
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
        <div>
          <h2>Their Tasks:</h2>
          {myTasks.length > 0 && myTasks.map(task => {
            return (
              <div>
                <div>
                  <div>{task.title}</div>
                  <div>Danger Level: {task.danger_level}</div>
                  <div>Reward: {task.price}</div>
                </div>
                <Link key={task.id} to={`/tasks/${task.id}`} onClick={() => setShowModal(false)}><button>Details</button>
                </Link>
                <BookingForm task={task}/>
              </div>
            );
          })}
        </div>
      </div>
    )}
    <Reviews myTasks={myTasks} reviewArr={reviewArr} user={user}/>
    </>
  );
}

export default UsersProfiles;
