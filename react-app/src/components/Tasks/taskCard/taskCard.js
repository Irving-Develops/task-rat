import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import BookingForm from '../../Bookings/BookingForm'
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

  if(!user || !task) return null;
  return (
    <Link to={`/tasks/${task.id}`}>
    <div className='card'>
    {/* <div className={`danger-${task.danger_level} card`}> */}
    {/* <div className='title-danger-level-wrapper'> */}
      <div className={`danger-${task.danger_level} card-top`}>
          <h3> {task.title} </h3>
          <div id="icons">
            <p>Danger Level:</p>
            <div>{dangerIcons}</div>
          </div>
      </div>
            {/* </div> */}
      <div className='content-container'>
          {/* <div className='task-content'>
              <p><span className='task-bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>
              <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
                <p>Danger: </p>
                <div id="icons">
                    {dangerIcons}
                </div>
              </div>
              <p><span className='task-bullet'>Reward : </span> {task.price} BOTTLE CAPS</p>
          </div> */}
          {/* <div className='task-misc'> */}
            {/* <div className='home-page-buttons'>
                <BookingForm task={task}/>
                <NavLink to={`/tasks/${task.id}`} task={task}>View Task Details</NavLink>
            </div> */}
            <div className='tags-container'>
                    {task.tags.map((tag, idx) => (
                      <Link to={`/tags/${tag.id}`}>
                        <div key={tag.type} className="tags">
                          {tag.type}
                          {idx !== task.tags.length - 1 && (
                            <span style={{ 'color': 'gray' }}> | </span>
                          )}
                        </div>
                      </Link>
                    ))}
            </div>
            {/* <div id='task-card-tag-underline' className={`danger-${task.danger_level}`}></div> */}
          {/* </div> */}
        <div className='posted-by'>
          <p>Mercenary {task.user.first_name} needs your help!</p>
        </div>
        <div className='card-desc-hidden'>
          <div><span>Location:</span> {task.city}, {task.state}</div>
          <div><span>Reward:</span> {task.price} caps</div>
        </div>
        <div className='date'>
          <span className='date'>Posted {task.created_at} </span>
        </div>
        {/* <div className='claim-task-container'>
          <BookingForm task={task}/>
        </div> */}
      </div>
    </div>
    </Link>
  )
}

export default TaskCard
