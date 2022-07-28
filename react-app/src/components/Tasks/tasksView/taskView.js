import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom'
// import Link from 'react-router'
import { getTasksThunk } from "../../../store/tasks"
import TaskCard from "../taskCard/taskCard";

function TaskView() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)
  const availableTasks = Object.values(tasks).filter(task => task.available === true)
  // console.log(availableTasks)

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTasksThunk())
    }
    fetchTasks().catch(console.error)
  }, [dispatch])


  return (
    tasks ?
    <div>
      <h1> Welcome to tasks </h1>
      <div className="task-card-container">
        {Object.values(availableTasks).map((task) => (
          <div key={task.id} className="task-card-wrapper">
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
