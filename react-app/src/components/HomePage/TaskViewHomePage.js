import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Link from 'react-router'
import { getTasksThunk } from "../../store/tasks"
import TaskCardHomePage from "./TaskCardHomePage"

function TaskViewHomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user.id)
  const tasks = useSelector((state) => state.tasks)
  const availableTasks = Object.values(tasks).filter(task => task.available === true && task.poster_id !== sessionUser)

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTasksThunk())
    }
    fetchTasks().catch(console.error)
  }, [dispatch])


  return (
    tasks ?
    <div>
      <h2> Featured Tasks</h2>
      <div className="task-card-container">
        {Object.values(availableTasks).map((task) => (
          <div key={task.id} className="task-card-wrapper">
              <TaskCardHomePage task={task} />
          </div>
        ))}
      </div>
    </div>
    :
    <p>...loading</p>
  )
}

export default TaskViewHomePage