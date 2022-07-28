import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import TaskCard from '../Tasks/taskCard/taskCard'

function TagView() {
    const [tags, setTags] = useState('')
    const { id } = useParams()

    let pageTag
    if (tags) {
        pageTag = Object.values(tags).filter(tag => tag.id === Number(id))[0]
        // console.log(pageTag)
    }
    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch('/api/tasks/tags')
            const data = await res.json()
            setTags(data.tags)
        }
        fetchTags()
    }, [])

    return (
        pageTag ?
        <>
            <h1>Greetings from {pageTag.type}!</h1>
            <h4>{pageTag.description}</h4>
        </>
        :
        <div>...loading</div>
    )
}

export default TagView
