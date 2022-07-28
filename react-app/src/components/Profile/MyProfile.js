import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import { getReviewsThunk } from '../../store/review';
import Bookings from '../Bookings/Bookings';
import EditProfileFormModal from './EditProfileModal';

const MyProfile = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)
  const reviews = useSelector((state) => state.reviews);

  let myTasks;
  if (sessionUser && tasks) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === sessionUser.id);
  }

  let reviewArr;
  if (reviews && sessionUser) {
    reviewArr = Object.values(reviews).filter(review => review.tasker_id === sessionUser.id);
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
          <div>
            <h2>Task's I created:</h2>
            {myTasks.length > 0 && myTasks.map(task => {
              return (
                <div key={task.id}>
                  <div>{task.title}</div>
                  <div>{task.danger_level}</div>
                </div>
              );
            })}
          </div>
          <Bookings reviewArr={reviewArr} />
        </div>

      )}
      <Reviews myTasks={myTasks} reviewArr={reviewArr} />
    </>
  );
}

export default MyProfile;
