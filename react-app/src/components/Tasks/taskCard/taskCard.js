import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookingForm from '../../Bookings/BookingForm'
import UsersProfileModal from '../../Profile/UsersProfileModal'
import './taskCard.css'

function TaskCard({ task }) {
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

  return (
    <>
      {user && task ?
        <div className='task-container'>
          <div className='single-task-top'>
            <p className='single-task-danger-level'>Danger Level: {task.danger_level}</p>
            <i class="fa-solid fa-circle-radiation"></i>
          </div>
            <h3 className='single-task-title'> {task.title} </h3>
            {/* <p>Posted: {task.created_at} </p> */}
            <p>Location: {task.city}, {task.state}, {task.country}</p>
            <p>Reward: {task.price} BOTTLE CAPS</p>
            {task.tags.map(tag => (
              <div key={tag.type} style={{ 'border': '1px solid red', 'maxWidth': '100px' }}>
                {tag.type}
              </div>
            ))}
          <button>
            <Link to={`/tasks/${task.id}`}>Details</Link>
          </button>
          <p><UsersProfileModal user={user}/></p>
          <BookingForm task={task}/>
        </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
