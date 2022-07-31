import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteTaskThunk, getTasksThunk } from '../../../store/tasks'
import BookingForm from '../../Bookings/BookingForm'
import UsersProfileModal from '../../Profile/UsersProfileModal'
import EditTaskFormModal from '../editTaskModal/editTaskModal'
import "./SingleTask.css"
import PageNotFound from '../../404Page/PageNotFound'

function SingleTask() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)
    const task = useSelector(state => state.tasks[id])
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getTasksThunk())
    }, [dispatch])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/users/')
            const resData = await res.json()
            setUsers(resData.users)
        }
        fetchData()
    }, [])

    let user;
    if (task) {
        user = users.filter(user => user.id === task.poster_id)[0]
    }


    const handleDelete = async () => {
        await dispatch(deleteTaskThunk(task))
        history.push('/tasks')
    }

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
        task && user ?
            <div id="single-task-page">
                <div id="single-task-container">
                    <div id="single-task-card">
                        <h1 style={{ 'color': '#063F67' }}>{task.title}</h1>
                        <p><UsersProfileModal user={user} /></p>
                        <p>Posted: {task.created_at} </p>
                        <p>Location: {task.city}, {task.state}, {task.country}</p>
                        <p>Description: {task.description}</p>
                        <p>Reward: {task.price}</p>
                        <div className={`single-task-danger-level ${extremelyDangerous}`} style={{ 'color': `${dangerIconColor}` }}>
                            {dangerIcons}
                        </div>
                        <p>Skills required: </p>
                        {task.tags.map(tag => (
                            <li key={tag.type} style={{ 'maxWidth': '100px' }}>
                                {tag.type}
                            </li>
                        ))}
                        {sessionUser && sessionUser.id === task.poster_id &&
                            <div>
                                <button className="single-task-edit-btns" onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                                <button className="single-task-edit-btns" onClick={handleDelete}>Delete</button>
                            </div>
                        }
                        {showEditForm && <EditTaskFormModal task={task} setShowEditForm={setShowEditForm} showEditForm={showEditForm} />}
                        <div id="claim-task-single-task-btn">
                            <BookingForm task={task} />
                        </div>
                    </div>
                </div>
            </div>
            :
            <p>...Loading</p>
    )
}

export default SingleTask
