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
          dangerIconColor = '#14f217'
          break
        case 2:
          dangerIcons = (
            <>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
            </>
          )
          dangerIconColor = 'yellow'
          break
        case 3:
          dangerIcons = (
            <>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
              <i className="fa-solid fa-circle-radiation"></i>
            </>
          )
          dangerIconColor = 'orange'
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
          dangerIconColor = 'red'
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
          <div className='task-card'>
            <div className='title-danger-level-wrapper'>
              <div className='task-title'>
                  <h3> {task.title} </h3>
              </div>
              <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
                {dangerIcons}
              </div>
            </div>
            <div className='content-container'>
                <div className='task-content'>
                <NavLink to={`/tasks/${task.id}`} task={task} id="test">
                    <p><span className='task-bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>

                    <p><span className='task-bullet'>Reward : </span> {task.price} BOTTLE CAPS</p>
                    <span className='date'>Posted : {task.created_at} </span>
                    {/* <p>
                      <span className="task-bullet">Location : </span>{task.city}, {task.state}, {task.country}<br/>
                      <span className="task-bullet">Danger Level : </span> <span className={`danger-${task.danger_level}`}>{task.danger_level}</span><br/>
                      <span className='task-bullet'>Reward : </span> {task.price} bottle caps <br />
                      <span className='task-bullet'>Posted : {task.created_at}</span>
                    </p> */}
                </NavLink>
                </div>
                <div className='task-misc'>
                  <div className='task-buttons'>
                      <BookingForm task={task}/>
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
        // <div className='task-container'>
        //   <div className='single-task-top'>
        //     <h4 style={{ 'color': 'white'}}>Danger Level:</h4>
        //     <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
        //       {dangerIcons}
        //     </div>
        //   </div>
        //     <h3 className='single-task-title'> {task.title} </h3>
        //     <p>Location: {task.city}, {task.state}, {task.country}</p>
        //     <p>Reward: {task.price} BOTTLE CAPS</p>
        //     {task.tags.map(tag => (
        //       <div key={tag.type} style={{ 'border': '1px solid red', 'maxWidth': '100px' }}>
        //         {tag.type}
        //       </div>
        //     ))}
        //   <button>
        //     <Link to={`/tasks/${task.id}`}>Details</Link>
        //   </button>
        //   <p><UsersProfileModal user={user}/></p>
        //   <BookingForm task={task}/>
        // </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
