import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {editTaskThunk, getTasksThunk} from '../../store/tasks'
import {editBookingThunk, deleteBookingThunk} from '../../store/booking'
import '../Profile/ProfileTaskCard.css';
import ProfileTaskCard from '../Profile/ProfileTaskCard';
import TaskCard from '../Tasks/taskCard/taskCard';

function BookedTasks({ taskId, booking, reviewArr }) {
  const task = useSelector(state => state.tasks[taskId])
  const sessionUser = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch()

  let tags
  if (task) {
    tags = Object.values(task.tags).map(tag => tag.id.toString())
  }


  let leftReview;
  if (reviewArr && taskId) {
    leftReview = reviewArr.filter(review => review.task_id === taskId);
  }

  useEffect(() => {
    dispatch(getTasksThunk(taskId))
  }, [taskId, dispatch])


  const submitHandler = async(e) => {
    try {
        e.preventDefault();

        const editBooking = {
            id: booking.id,
            completed: true,
            tasker_id: sessionUser.id,
            task_id: task.id
        }
        const editedBooking = await dispatch(editBookingThunk(editBooking))
    } catch(err) {
        setValidationErrors(err.errors)
    }
  }


  const deleteHandler = async(e) => {
    try {
        if (window.confirm('Are you sure you want to drop this task?')) {
          e.preventDefault();

          const payload = {
          ...task,
          available: true,
          tags
          }
          await dispatch(editTaskThunk(payload))
          await dispatch(deleteBookingThunk(booking))
        }
    }catch(err) {
        setValidationErrors(err.errors)
    }
  }

  return (
    <div className='prof-taskcard-div'>
      {validationErrors && validationErrors.length > 0 && validationErrors.map(error => {
        return <div>{error}</div>
      })}
      {task && booking && (
      <div className='prof-taskcard-div'>
        <ProfileTaskCard task={task} booking={booking} submitHandler={submitHandler} deleteHandler={deleteHandler} leftReview={leftReview} taskId={taskId}/>
      </div>
      )}
    </div>
  );
}

export default BookedTasks
