import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BookingForm from './BookingForm'
import { useSelector, useDispatch } from 'react-redux'
import {getTasksThunk} from '../../store/tasks'

function BookedTasks({ task_id }) {
console.log(task_id, "id")
  const task = useSelector(state => state.tasks[2])
  
  const dispatch = useDispatch()
  console.log(task, "task")

  useEffect(() => {
    dispatch(getTasksThunk())
  }, [dispatch])

  return (
    <>
      {task ?
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
          <BookingForm task={task}/>
        </div>
        :
        null
      }
    </>
  )
}

export default BookedTasks
