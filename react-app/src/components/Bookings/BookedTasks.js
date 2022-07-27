import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BookingForm from './BookingForm'
import { useSelector, useDispatch } from 'react-redux'
import {getTasksThunk} from '../../store/tasks'
import {editBookingThunk} from '../../store/booking'

function BookedTasks({ task_id, booking }) {
console.log(task_id, "id")
  const task = useSelector(state => state.tasks[task_id])
  const sessionUser = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch()
  console.log(task, "task")


  useEffect(() => {
    dispatch(getTasksThunk(task_id))
  }, [dispatch])

  const submitHandler = async(e) => {
    try {
        e.preventDefault();

        const newBooking = {
            id: booking.id,
            completed: true,
            tasker_id: sessionUser.id,
            task_id: task.id
        }
        const editedBooking = await dispatch(editBookingThunk(newBooking))

        if(editedBooking) window.alert("Working")
    } catch(err) {
        setValidationErrors(err.errors)
    }
  }
  const deleteHandler = async(e) => {

  }

  return (
    <>
      {task && booking && booking.completed &&(
        <div> Completed Missions
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
          <BookingForm task={task}/>
          <button onClick={deleteHandler}>Drop task</button>
          <button onClick={submitHandler}>Complete</button>
        </div>
      )}
      {task && booking && !booking.completed &&(
      <div> Current Missions
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
          <BookingForm task={task}/>
          <button onClick={deleteHandler}>Drop task</button>
          <button onClick={submitHandler}>Complete</button>
        </div>
      )}
    </>
  )
}

export default BookedTasks
