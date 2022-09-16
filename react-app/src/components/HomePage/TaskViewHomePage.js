import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../store/tasks"
import TaskCard from '../Tasks/taskCard/taskCard'

function TaskViewHomePage() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)
  const filteredAvailableTasks = Object.values(tasks).filter(task => task.available === true);
  const availableTasks = filteredAvailableTasks.slice(0, 3);

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTasksThunk())
    }
    fetchTasks().catch(console.error)
  }, [dispatch])


  return (
    tasks ?
    <div classname='home-page-tasks'>
      <div className="home-page-title">
        <h2> Featured Tasks</h2>
      </div>
      <div className="card-container">
        {Object.values(availableTasks).map((task) => (
              <TaskCard key={task.id} task={task} id={task.id} />
        ))}
      </div>
    </div>
    :
    <p>...loading</p>
  )
}

export default TaskViewHomePage
