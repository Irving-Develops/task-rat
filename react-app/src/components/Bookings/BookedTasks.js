import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {editTaskThunk, getTasksThunk} from '../../store/tasks'
import {editBookingThunk, deleteBookingThunk} from '../../store/booking'
import ReviewFormModal from '../Reviews/ReviewFormModal';
import EditReviewFormModal from '../Reviews/EditFormModal'

function BookedTasks({ taskId, booking, reviewArr }) {
  const task = useSelector(state => state.tasks[taskId])
  const sessionUser = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch()

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

        if(editedBooking) window.alert("Working")
    } catch(err) {
        setValidationErrors(err.errors)
    }
  }


  const deleteHandler = async(e) => {
    try {
        e.preventDefault();

        const payload = {
        ...task,
        available: true
        }
        const editedTask = await dispatch(editTaskThunk(payload))
        await dispatch(deleteBookingThunk(booking))

        if(editedTask) window.alert("nice");
    }catch(err) {
        setValidationErrors(err.errors)
    }
  }

  return (
    <>
      {validationErrors && validationErrors.length > 0 && validationErrors.map(error => {
        return <div>{error}</div>
      })}
      {task &&(
      <div>
          <NavLink to={`/tasks/${task.id}`} task={task}>
            <h3> {task.title} </h3>
            <p>Location: {task.city}, {task.state}, {task.country}</p>
            <p>Danger Level: {task.danger_level}</p>
            <p>Reward: {task.price} BOTTLE CAPS</p>
            {task.tags.map(tag => (
                    <div key={tag.type} style={{'border': '1px solid red', 'maxWidth': '100px'}}>
                        {tag.type}
                    </div>
                ))}
          </NavLink>
          {!booking.completed ?
            <div>
                <button onClick={submitHandler}>Complete</button>
                <button onClick={deleteHandler}>Drop task</button>
            </div>
          : (leftReview && leftReview.length === 1) ?
            (<EditReviewFormModal taskId={taskId} review={leftReview[0]}/>) :
          (<ReviewFormModal taskId={taskId}/>)}
      </div>
      )}
    </>);
}

export default BookedTasks
