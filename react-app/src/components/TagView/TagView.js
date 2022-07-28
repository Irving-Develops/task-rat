import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TaskCard from '../Tasks/taskCard/taskCard'
import { getTasksThunk } from '../../store/tasks'

function TagView() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const allTasks = useSelector((state) => state.tasks)

    const [tags, setTags] = useState('')

    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch('/api/tasks/tags')
            const data = await res.json()
            setTags(data.tags)
        }
        fetchTags()
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
          await dispatch(getTasksThunk())
        }
        fetchTasks().catch(console.error)
    }, [dispatch])

    let pageTag
    if (tags) {
        pageTag = Object.values(tags).filter(tag => tag.id === Number(id))[0]
    }

    let taggedTasks = []
    if (allTasks && pageTag) {
        const tasksArr = Object.values(allTasks)
        for (let task of tasksArr) {
            const tags = Object.values(task.tags)
            for (let tag of tags) {
                const tagArr = Object.values(tag)
                if (tagArr.includes(pageTag.id)) {
                    taggedTasks.push(task)
                }
            }
        }
    }

    const availableTasks = taggedTasks.filter(task => task.available === true)


    return (
        pageTag ?
        <>
            <h1>Greetings from {pageTag.type}!</h1>
            <h4>{pageTag.description}</h4>
            {availableTasks.map(task => (
                <div key={task.id}>
                        <TaskCard task={task} />
                </div>
            ))}
        </>
        :
        <div>...loading</div>
    )
}

export default TagView
