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


  let dangerIcons
  let dangerIconColor
  let extremelyDangerous
  function dangerLevelParser(task) {
    if (task) {
      if (task.danger_level === 1) {
        dangerIcons = <i className="fa-solid fa-circle-radiation"></i>
        dangerIconColor = 'green'
      }
      if (task.danger_level === 2) {
        dangerIcons = (
          <>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
          </>
        )
        dangerIconColor = 'yellow'
      }
      if (task.danger_level === 3) {
        dangerIcons = (
          <>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
          </>
        )
        dangerIconColor = 'orange'
      }
      if (task.danger_level === 4) {
        dangerIcons = (
          <>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
          </>
        )
        dangerIconColor = 'red'
      }
      if (task.danger_level === 5) {
        dangerIcons = (
          <>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
            <i className="fa-solid fa-circle-radiation"></i>
          </>
        )
        dangerIconColor = 'red'
        extremelyDangerous = 'extremely-dangerous-task'
      }
    }
    return
  }

  dangerLevelParser(task)
  console.log(dangerIconColor)

  return (
    <>
      {user && task ?
        <div className='task-container'>
          <div className='single-task-top'>
            <h4 style={{ 'color': 'white'}}>Danger Level:</h4>
            <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
              {dangerIcons}
            </div>
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
