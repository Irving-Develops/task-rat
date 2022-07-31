import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../../store/tasks"
import TaskCard from "../taskCard/taskCard";
import './taskView.css'

function TaskView() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session)
  const tasks = useSelector((state) => state.tasks)
  // const availableTasks = Object.values(tasks).filter(task => task.available === true)
  let availableTasks = Object.values(tasks).filter(task => task.available === true)

  if(sessionUser.user) {
    availableTasks = Object.values(tasks).filter(task => task.available === true && sessionUser.user.id !== task.poster_id)
  }


  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTasksThunk())
    }
    fetchTasks().catch(console.error)
  }, [dispatch])

  const allTaskDesc = 'Coffers looking a little light? Undaunted by loss of life and limb? You\'re in the right place, friend.'

  return (
    tasks ?
    <div>
      <div className="header-wrapper">
        <div className='header-img'>
          <img src='https://images2.alphacoders.com/952/952022.jpg' />
        </div>
        <div className="header-info-card">
          <div className="header-text-container">
            <h1>All Tasks</h1>
            <div className="line-break"></div>
          </div>
          <p>{allTaskDesc}</p>
        </div>
      </div>
      <div className='tasks-wrapper'>
        <p className='sub-text'>Get out there and be somebody.</p>
        <div className='card-container'>
          {Object.values(availableTasks).map((task) => (
            <div key={task.id}>
                <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    </div>
    :
    <p>...loading</p>
  )
}

export default TaskView
