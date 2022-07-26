import { useEffect, useState } from 'react'

function TaskCard({ task }) {
  const [users, setUsers] = useState([])

  const user = users.filter(user => user.id === task.poster_id)
  // let users
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/')
      const resData = await res.json()
      setUsers(resData.users)
    }
    fetchData()
  }, [])

  console.log(user)

  return (
    <div>
      <h3> {task.title} </h3>
      <p>User: {user[0].first_name} {user[0].last_name}</p>
      <p>Location: {task.city}, {task.state}, {task.country}</p>
      <p>Danger Level: {task.danger_level}</p>
      <p>Reward: {task.price} BOTTLE CAPS</p>
    </div>
  )
}

export default TaskCard
