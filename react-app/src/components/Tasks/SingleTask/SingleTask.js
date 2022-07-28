import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteTaskThunk, getTasksThunk, editTaskThunk } from '../../../store/tasks'
import EditTaskForm from '../editTaskForm/editTaskForm'
import BookingForm from '../../Bookings/BookingForm'

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


    const handleDelete = async() => {
        await dispatch(deleteTaskThunk(task))
        history.push('/tasks')
    }

    return (
        task && user ?
            <div>
                <h1>{task.title}</h1>
                <p>User: {user.first_name} {user.last_name}</p>
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
                {/* <button onClick={(e) => handleClaimTask(e)}>Claim Task</button> */}
                {/* {console.log(sessionUser)} */}
                {sessionUser && sessionUser.id === task.poster_id &&
                    <div>
                        <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                }
                {showEditForm && <EditTaskForm task={task} setShowEditForm={setShowEditForm} showEditForm={showEditForm}/>}
                <BookingForm task={task}/>
            </div>
            :
            <p>...loading</p>
    )
}

export default SingleTask
