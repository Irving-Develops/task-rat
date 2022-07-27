import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import { getTasksThunk } from '../../store/tasks';
import Bookings from '../Bookings/Bookings';

const MyProfile = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)

  let myTasks;
  if (sessionUser && tasks) {
    myTasks = Object.values(tasks).filter(task => task.poster_id === sessionUser.id);
  }

  useEffect(() => {
    dispatch(getTasksThunk())
  }, [dispatch])

  return (
    <>
    {sessionUser && (
      <div>
        <h1>Mercenary: {sessionUser.first_name}</h1>
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
        <Bookings/>
      </div>

    )}
    <Reviews myTasks={myTasks}/>
    </>
  );
}

export default MyProfile;
