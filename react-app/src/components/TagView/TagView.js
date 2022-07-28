import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import TaskCard from '../Tasks/taskCard/taskCard'

function TagView() {
    const [tags, setTags] = useState('')
    const { id } = useParams()

    let pageTag
    if (tags) {
        // console.log(Object.values(tags))
        pageTag = Object.values(tags).filter(tag => tag.id === Number(id))
    }

    console.log(pageTag)


    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch('/api/tasks/tags')
            const data = await res.json()
            // console.log(data)
            setTags(data.tags)
        }
        fetchTags()
    }, [])

    return (
        <h1>Greetings from Tags!</h1>
    )
}

export default TagView
