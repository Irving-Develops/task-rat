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
        <div>
            <div className="header-wrapper">
                <div className='header-img'>
                    {/* <img src='../../images/task_page_headers/task-view-page.jpg' alt='tag-view-1'/> */}
                </div>
                <div className="header-info-card">
                    <div className="header-text-container">
                        <h1>{pageTag.type}!</h1>
                        <div className="line-break"></div>
                    </div>
                        <p>{pageTag.description}</p>
                </div>
            </div>
            <div className='tasks-wrapper'>
                <p className='sub-text'>Get out there and be somebody.</p>
                <div className='tasks-container'>
                    {availableTasks.map(task => (
                        <div key={task.id}>
                                <TaskCard task={task} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
        :
        <div>...loading</div>
    )
}

export default TagView
