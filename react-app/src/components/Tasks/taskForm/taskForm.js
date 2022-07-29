import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addTaskThunk } from "../../../store/tasks"
// import LoginFormModal from "../../auth/LoginFormModal"
import './taskForm.css'

function TaskForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector((state) => state.session.user.id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [price, setPrice] = useState('')
  const [danger_level, setDangerLevel] = useState(1)
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [count, setCount] = useState(1)

  const updateTitle = (e) => setTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateDangerLevel = (e) => setDangerLevel(e.target.value)
  const updateTags = (e) => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value])
    } else {
        const srch = tags.indexOf(e.target.value)
        tags.splice(srch, 1)
        setTags([...tags])
    }
  }

  //validations
  useEffect(() => {
    let errors = []
    if (title.length < 5) errors.push('Title must be more than 5 characters')
    if (title.length > 150) errors.push('Title must be less than 150 characters')
    if (description.length < 5) errors.push('Description must be more than 5 characters')
    if (description.length > 2000) errors.push('Description must be less than 2000 characters')
    if (city.length < 0 || city.length > 50) errors.push('Please provide a valid city name')
    if (state.length < 0 || state.length > 50) errors.push('Please provide a valid state name')
    if (country.length < 0 || country.length > 50) errors.push('Please provide a valid country name')
    if (isNaN(price)) errors.push('Reward must be a number')
    if (price <= 0) errors.push('Task must pay at least 1 bottle cap')
    if (tags.length <= 0) errors.push('Task must have at least one tag')

    setErrors(errors)

  }, [title, description, city, state, country, price, tags] )

  const handleSubmit = async (e) => {
    e.preventDefault()

    setHasSubmitted(true)
    if(errors.length) return alert('Cannot Submit, Please Fix Errors')

    const payload = {
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

    try {
      await dispatch(addTaskThunk(payload))
      history.push("/tasks")
    } catch {
      return dispatch(addTaskThunk(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    }
  }

  return (
    <section className='form-section'>
      <h1>You got a job? We got a body!</h1>
      <form onSubmit={handleSubmit} className='step-form'>
      {hasSubmitted && errors.length > 0 && (
        <div className='errors-container'>
            The following errors were found:
            <ul className='errors'>
                {errors.map(error => (
                    <li className='error' key={error}>{error}</li>
                ))}
            </ul>
        </div>
      )}
      {count === 1 &&
      <div className='input-container'>
        <div className='input-headers'>
          <h2>So, tell us about your task.</h2>
          <h4> This helps us show you only qualified* and available Mercs for the job. Don't worry, you can edit this later.</h4>
        </div>
        <div className='input-wrapper'>
          <input
            type="text"
            placeholder="Enter a title for your task."
            required
            value={title}
            onChange={updateTitle} />
          <textarea
            className="new-task-description"
            type="text"
            placeholder="Please provide a description of the task at hand."
            required
            value={description}
            onChange={updateDescription} />
        <p id='quality'>*quality not guaranteed.</p>
        </div>
      </div>
      }
      {count === 2 &&
        <div className='input-container'>
          <div className='input-headers'>
            <h2>Whereabouts might you need help?</h2>
            <h4>Be specific, it's a big ol' wasteland out there.</h4>
          </div>
          <div className='input-wrapper'>
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
          </div>
        </div>
      }
      {count === 3 &&
        <div className='input-container'>
          <div className='input-headers'>
            <h2>There are plenty of skills I’ve learned from playing video games.</h2>
            <h4>Tell us what skills you need to get the job done.</h4>
          </div>
          <label>Guns</label>
          <input
            type='checkbox'
            name='guns'
            value='1'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Explosives</label>
          <input
            type='checkbox'
            name='explosives'
            value='2'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Stealth</label>
          <input
            type='checkbox'
            name='stealth'
            value='3'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Survival</label>
          <input
            type='checkbox'
            name='survival'
            value='4'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Medicine</label>
          <input
            type='checkbox'
            name='medicine'
            value='5'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Repairs</label>
          <input
            type='checkbox'
            name='repairs'
            value='6'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Pilot</label>
          <input
            type='checkbox'
            name='pilot'
            value='7'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Hacking</label>
          <input
            type='checkbox'
            name='hacking'
            value='8'
            onChange={(e) => updateTags(e)}
          ></input>
          <label>Hand-to-Hand</label>
          <input
            type='checkbox'
            name='hand-to-hand'
            value='9'
            onChange={(e) => updateTags(e)}
          ></input>
        </div>
      }
      {count === 4 &&
        <div className='input-container'>
          <div className='input-headers'>
            <h2>With great risk comes great cash.</h2>
            <h4>How much is this task worth to you? Think hard.</h4>
          </div>
          <div className='input-wrapper'>
            <input
              type="text"
              placeholder="Reward"
              required
              value={price}
              onChange={updatePrice} />
            <label>Danger Level</label>
            <select onChange={updateDangerLevel}>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
          </div>
        </div>
      }
      {count === 5 &&
        <div className='input-container final-screen'>
          <div className='final-screen-wrapper'>
            <div className="input-headers">
              <h2>Everything look correct?</h2>
            </div>
            <div onClick={() => setCount(1)} className='new-title-content final-screen-content'>
              <h5>Title:</h5>
              <p>{title}</p>
            </div>
            <div onClick={() => setCount(1)} className='new-description-content final-screen-content'>
              <h5>Description:</h5>
              <p>{description}</p>
            </div>
            <div onClick={() => setCount(2)} className='new-location-content final-screen-content'>
              <h5>Location:</h5>
              <p>{city}, {state}, {country}</p>
            </div>
            <div onClick={() => setCount(3)} className='new-skills-content final-screen-content'>
              <h5>Skills Required:</h5>
              <p>render tags here</p>
            </div>
            <div onClick={() => setCount(4)} className='new-price-content final-screen-content'>
            <h5>Price:</h5>
              <p>{price}</p>
            </div>
            <div onClick={() => setCount(4)} className='new-danger-level-content final-screen-content'>
              <h5>Reward:</h5>
              <p>{price} BOTTLE CAPS</p>
            </div>
            <button type="submit" id="taskFormSubmitButton"> Submit your task </button>
          </div>
        </div>
      }
      </form>
      <button
          type='button'
          onClick={() => setCount(count - 1)}
          disabled={count < 2}
      >Back</button>
      <button
          type='button'
          onClick={() => setCount(count + 1)}
          disabled={count > 4}
      >Next</button>
    </section>
  )
}


export default TaskForm
