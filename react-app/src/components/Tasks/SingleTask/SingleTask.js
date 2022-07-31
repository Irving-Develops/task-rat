import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteTaskThunk, getTasksThunk, editTaskThunk } from '../../../store/tasks'
import EditTaskForm from '../editTaskForm/editTaskForm'
import BookingForm from '../../Bookings/BookingForm'
import UsersProfileModal from '../../Profile/UsersProfileModal'
import EditTaskFormModal from '../editTaskModal/editTaskModal'
import "./SingleTask.css"

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

    return (
        task && user ?
            <div id="single-task-page">
                <div id="single-task-container">
                    <div id="single-task-card">
                        <h1>{task.title}</h1>
                        <p><UsersProfileModal user={user} /></p>
                        <p>Posted: {task.created_at} </p>
                        <p>Location: {task.city}, {task.state}, {task.country}</p>
                        <p>Description: {task.description}</p>
                        <p>Reward: {task.price}</p>
                        <p>Danger Level: {task.danger_level}</p>
                        {task.tags.map(tag => (
                            <div key={tag.type} style={{ 'border': '1px solid red', 'maxWidth': '100px' }}>
                                {tag.type}
                            </div>
                        ))}
                        {sessionUser && sessionUser.id === task.poster_id &&
                            <div>
                                <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
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
            <p>...loading</p>
    )
}

export default SingleTask
