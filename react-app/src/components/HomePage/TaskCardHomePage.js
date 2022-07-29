import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BookingForm from '../Bookings/BookingForm'
import UsersProfileModal from '../Profile/UsersProfileModal'

function TaskCardHomePage({ task }) {
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
            <div className='task-card'>
                    <div className='task-title'>
                        <h3> {task.title} </h3>
                    </div>
                    <div className='content-container'>
                        <div className='task-content'>
                        <NavLink to={`/tasks/${task.id}`} task={task}>
                            <p><span className='task-bullet'>> Location:</span> {task.city}, {task.state}, {task.country}</p>
                            <p className={`danger-${task.danger_level}`}><span className='task-bullet'>> Danger Level: </span>{task.danger_level}</p>
                            <p><span>> Reward: </span> {task.price} BOTTLE CAPS</p>
                            <span>Posted: {task.created_at} </span>
                        </NavLink>
                        </div>
                        <div className='task-buttons'>
                            <UsersProfileModal user={user}/>
                            <BookingForm task={task}/>
                        </div>
                    </div>
                    <div className='tags-container'>
                            {task.tags.map(tag => (
                                <div key={tag.type} className="tags">
                                {tag.type}
                            </div>
                            ))}
                    </div>
            </div>
        :
        null
      }
    </>
  )
}

export default TaskCardHomePage
