import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { editTaskThunk, getTasksThunk } from "../../../store/tasks"

const EditTaskForm = ({ task, setShowEditForm, showEditForm }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector((state) => state.session.user.id)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [city, setCity] = useState(task.city)
  const [state, setState] = useState(task.state)
  const [country, setCountry] = useState(task.country)
  const [price, setPrice] = useState(task.price)
  const [danger_level, setDangerLevel] = useState(task.danger_level)
  const [errors, setErrors] = useState([])

  const tagIds = Object.values(task.tags).map(tag => tag.id.toString())
  const [tags, setTags] = useState([...tagIds])
  // console.log(tags.includes("1"))

  const updateTitle = (e) => setTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateDangerLevel = (e) => setDangerLevel(e.target.value)

  // useEffect(() => {
  //   dispatch(getTasksThunk())
  // }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...task,
      title,
      description,
      city,
      state,
      country,
      price,
      poster_id: userId,
      danger_level,
      available: true,
      tags
    }

    setErrors([])
    setShowEditForm(!showEditForm)

    try {
      await dispatch(editTaskThunk(payload))
      history.push(`/tasks/${task.id}`)
    } catch {
      return dispatch(editTaskThunk(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx} className="errorList"> • {error}</li>)}
        </ul>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity} />
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState} />
        <input
          type="text"
          placeholder="Country"
          required
          value={country}
          onChange={updateCountry} />
        <input
          type="text"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice} />
        <select onChange={updateDangerLevel}>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select>
        <label>Guns</label>
        <input
        type='radio'
        name='guns'
        value='1'
        checked={tags.includes("1")}
        onChange={(e) => setTags([...tags, e.target.value])}
        ></input>
        <label>Explosives</label>
        <input
        type='radio'
        name='explosives'
        value='2'
        checked={tags.includes("2")}
        onChange={(e) => setTags([...tags, e.target.value])}
        ></input>
        <label>Stealth</label>
        <input
        type='radio'
        name='stealth'
        value='3'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("3")}
        ></input>
        <label>Survival</label>
        <input
        type='radio'
        name='survival'
        value='4'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("4")}
        ></input>
        <label>Medicine</label>
        <input
        type='radio'
        name='medicine'
        value='5'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("5")}
        ></input>
        <label>Repairs</label>
        <input
        type='radio'
        name='repairs'
        value='6'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("6")}
        ></input>
        <label>Pilot</label>
        <input
        type='radio'
        name='pilot'
        value='7'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("7")}
        ></input>
        <label>Hacking</label>
        <input
        type='radio'
        name='hacking'
        value='8'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("8")}
        ></input>
        <label>Hand-to-Hand</label>
        <input
        type='radio'
        name='hand-to-hand'
        value='9'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("9")}
        ></input>
        <label>Charisma</label>
        <input
        type='radio'
        name='charisma'
        value='10'
        onChange={(e) => setTags([...tags, e.target.value])}
        checked={tags.includes("10")}
        ></input>
        <button type="submit" id="taskFormSubmitButton"> Submit your task </button>
        <button onClick={() => setShowEditForm(!showEditForm)}>Cancel</button>
      </form>
    </section>
  )
}

export default EditTaskForm
