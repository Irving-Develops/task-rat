import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { editTaskThunk, getTasksThunk } from "../../../store/tasks"

const EditTaskForm = ({ task }) => {
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

  const updateTitle = (e) => setTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateDangerLevel = (e) => setDangerLevel(e.target.value)

  useEffect(() => {
    dispatch(getTasksThunk())
  }, [dispatch])

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
      available: true
    }

    setErrors([])

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
        <button type="submit" id="taskFormSubmitButton"> Submit your task </button>
      </form>
    </section>
  )
}

export default EditTaskForm
