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
                        <NavLink to={`/tasks/${task.id}`} task={task} id="test">
                            <p><span className='task-bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>
                            <p className={`danger-${task.danger_level}`}><span className='task-bullet'> Danger Level : </span>{task.danger_level}</p>
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
        :
            <div className="loading">loading</div>
      }
    </>
  )
}

export default TaskCardHomePage
