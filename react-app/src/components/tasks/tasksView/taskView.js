import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom'
// import Link from 'react-router'
import { getTasksThunk } from "../../../store/tasks"
import TaskCard from "../taskCard/taskCard";

function TaskView() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTasksThunk())
    }
    fetchTasks().catch(console.error)
  }, [dispatch])

  // console.log(tasks)

  return (
    <div>
      <h1> Welcome to tasks </h1>
      <div>
        {Object.values(tasks).map((task) => (
          <div key={task.id}>
              <TaskCard task={task} />
          </div>
        ))}
        {/* <h3>
          {tasks.title}
        </h3> */}
      </div>
    </div>
  )
}

export default TaskView
