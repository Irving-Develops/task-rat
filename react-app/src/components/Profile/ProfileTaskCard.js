import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BookingForm from '../Bookings/BookingForm'
// import UsersProfileModal from '../../Profile/UsersProfileModal'
import './ProfileTaskCard.css'
import ReviewFormModal from '../Reviews/ReviewFormModal';
import EditReviewFormModal from '../Reviews/EditFormModal';
import { useSelector } from 'react-redux';

function ProfileTaskCard({ task, booking, submitHandler, deleteHandler, leftReview, taskId}) {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  let user;
  if (users) {
    user = users.filter(user => user.id === task.poster_id)[0];
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/');
      const resData = await res.json();
      setUsers(resData.users);
    }
    fetchData();
  }, []);

  let dangerIcons, dangerIconColor, extremelyDangerous;

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
                  <h3 id='profile-card-h3'> {task.title} </h3>
              </div>
            </div>
            <div className='content-container'>
                <div className='task-content'>
                    <p><span className='task-bullet'>Location :</span> {task.city}, {task.state}, {task.country}</p>
                    <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color' : `${dangerIconColor}` }}>
                      {dangerIcons}
                    </div>
                    <p><span className='task-bullet'>Reward : </span> {task.price} BOTTLE CAPS</p>
                    <span className='date profile-card'>Posted : {task.created_at} </span>
                </div>
                <div className='task-misc'>
                  <div className='home-page-buttons'>
                      <BookingForm task={task}/>
                      <div id='task-deets'>
                        <NavLink to={`/tasks/${task.id}`} task={task}>View Task Details</NavLink>
                      </div>
                        {sessionUser && sessionUser.id !== user.id && <div>
                        {booking && !booking.completed ? (
                          <div>
                              <button onClick={submitHandler}>Complete</button>
                              <button onClick={deleteHandler}>Drop task</button>
                          </div>)
                        : (leftReview && leftReview.length === 1) ?
                          <EditReviewFormModal taskId={taskId} review={leftReview[0]}/> :
                        <ReviewFormModal taskId={taskId}/>}
                        </div>}
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

export default ProfileTaskCard;
