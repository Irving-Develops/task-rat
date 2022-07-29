import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../../store/tasks"
import TaskCard from "../taskCard/taskCard";
import './taskView.css'

function TaskView() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)
  const availableTasks = Object.values(tasks).filter(task => task.available === true)

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
          <img src='./images/task-view-page.jpg' />
        </div>
        <div className="header-info-card">
          <h1>All Tasks</h1>
          <div className="line-break"></div>
          <p>{allTaskDesc}</p>
        </div>
      </div>
      <p className='available-tasks-header'>Available Tasks</p>
      <div className='tasks-container'>
        {Object.values(availableTasks).map((task) => (
          <div key={task.id}>
              <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
    :
    <p>...loading</p>
  )
}

export default TaskView
