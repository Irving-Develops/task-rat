import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteTaskThunk, getTasksThunk } from '../../../store/tasks'
import EditTaskForm from '../editTaskForm/editTaskForm'

function SingleTask() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const task = useSelector(state => state.tasks[id])
    let user;
    if(task) {
        user = users.filter(user => user.id === task.poster_id)[0]
    }

    console.log(user)

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

    const handleDelete = async() => {
        await dispatch(deleteTaskThunk(task)).then(history.push('/tasks'))
    }

    return (
        task && user ?
            <div>
                <h1>{task.title}</h1>
                <p>User: {user.first_name} {user.last_name}</p>
                <p>Location: {task.city}, {task.state}, {task.country}</p>
                <p>Description: {task.description}</p>
                <p>Reward: {task.price}</p>
                <p>Danger Level: {task.danger_level}</p>
                <EditTaskForm task={task} />
                <button onClick={handleDelete}>Delete</button>
            </div>
            :
            <p>...loading</p>
    )
}

export default SingleTask
