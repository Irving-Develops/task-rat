import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
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

  let dangerIcons, dangerIconColor, extremelyDangerous

  function dangerLevelParser() {
    if (task) {
      switch (task.danger_level) {
        case 1:
          dangerIcons = <i className="fa-solid fa-circle-radiation"></i>
          dangerIconColor = '#0067b1'
          break
        case 2:
          dangerIcons = (
            <>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
            </>
          )
          dangerIconColor = '#ffee43 '
          break
        case 3:
          dangerIcons = (
            <>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
            </>
          )
          dangerIconColor = '#ff9100'
          break
        case 4:
          dangerIcons = (
            <>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
            </>
          )
          dangerIconColor = 'orangered'
          break
        case 5:
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
          break
        default:
          break
      }
    }
  }

  dangerLevelParser(task)

  return (
    <>
      {user && task ?
          <div className={`danger-${task.danger_level} card`}>
            <div className='title-danger-level-wrapper'>
              <div className='title'>
                  <h3> {task.title} </h3>
              </div>
            </div>
            <div className='content-container'>
                <div className='task-content'>
                {/* <NavLink to={`/tasks/${task.id}`} task={task} id="test"> */}
                    <p><span className='task-bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>

                    <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
                      {dangerIcons}
                    </div>
                    <p><span className='task-bullet'>Reward : </span> {task.price} BOTTLE CAPS</p>
                    <span className='date'>Posted : {task.created_at} </span>
                    {/* <p>
                      <span className="task-bullet">Location : </span>{task.city}, {task.state}, {task.country}<br/>
                      <span className="task-bullet">Danger Level : </span> <span className={`danger-${task.danger_level}`}>{task.danger_level}</span><br/>
                      <span className='task-bullet'>Reward : </span> {task.price} bottle caps <br />
                      <span className='task-bullet'>Posted : {task.created_at}</span>
                    </p> */}
                {/* </NavLink> */}
                </div>
                <div className='task-misc'>
                  <div className='home-page-buttons'>
                      <BookingForm task={task}/>
                      <NavLink to={`/tasks/${task.id}`} task={task}>View Task Details</NavLink>
                  </div>
                  <div className='tags-container'>
                          {task.tags.map(tag => (
                              <div key={tag.type} className="tags">
                              {tag.type}
                          </div>
                          ))}
                  </div>
                </div>
            </div>
        </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
