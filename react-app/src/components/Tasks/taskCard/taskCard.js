import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { editTaskThunk } from '../../../store/tasks'

function TaskCard({ task }) {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  let user
  if (users) {
    user = users.filter(user => user.id === task.poster_id)[0]
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/')
      const resData = await res.json()
      setUsers(resData.users)
    }
    fetchData()
  }, [])


  const handleClaimTask = async (e) => {
    e.preventDefault()

    const payload = {
      ...task,
      available: false
    }
    try {
      await dispatch(editTaskThunk(payload))
    } catch (e) {
      return 'not updating availibility'
    }
  }

  return (
    <>
      {user && task ?
        <div>
          <NavLink to={`/tasks/${task.id}`} task={task}>
            <h3> {task.title} </h3>
            <p>User: {user.first_name} {user.last_name}</p>
            <p>Location: {task.city}, {task.state}, {task.country}</p>
            <p>Danger Level: {task.danger_level}</p>
            <p>Reward: {task.price} BOTTLE CAPS</p>
            {task.tags.map(tag => (
              <div key={tag.type} style={{ 'border': '1px solid red', 'maxWidth': '100px' }}>
                {tag.type}
              </div>
            ))}
          </NavLink>
          <button onClick={(e) => handleClaimTask(e)}>Claim Task</button>
        </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
