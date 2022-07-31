import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BookingForm from '../Bookings/BookingForm'

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
            <div className={`danger-${task.danger_level} card`}>
                    <div className='title'>
                        <h3> {task.title} </h3>
                    </div>
                    <div className='content-container'>
                        <div className='task-content'>
                            <p><span className='bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>
                            <p className='bullet'> Danger Level :<span className={`dan-${task.danger_level}`}>{task.danger_level}</span></p>
                            <p><span className='bullet'>Reward : </span> {task.price} Bottle Caps</p>
                        </div>
                        <div className='task-misc'>
                          <div className='home-page-buttons'>
                              <BookingForm task={task}/>
                              <NavLink to={`/tasks/${task.id}`}>View Task Details</NavLink>
                          </div>
                          {/* <div className='tags-container'>
                                  {task.tags.map(tag => (
                                      <div key={tag.type} className="tags">
                                      {tag.type}
                                  </div>
                                  ))}
                          </div> */}
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
