import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function TaskCard({ task }) {
  const [users, setUsers] = useState([])

  const user = users.filter(user => user.id === task.poster_id)[0]
  // let users
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/')
      const resData = await res.json()
      setUsers(resData.users)
    }
    fetchData()
  }, [])

  // console.log(user)

  return (
    <>
      {user ?
        <div>
          <NavLink to={`/tasks/${task.id}`} task={task}>
            <h3> {task.title} </h3>
            <p>User: {user.first_name} {user.last_name}</p>
            <p>Location: {task.city}, {task.state}, {task.country}</p>
            <p>Danger Level: {task.danger_level}</p>
            <p>Reward: {task.price} BOTTLE CAPS</p>
          </NavLink>
        </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
