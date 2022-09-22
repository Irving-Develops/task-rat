import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addTaskThunk } from "../../../store/tasks"
// import LoginFormModal from "../../auth/LoginFormModal"
import './taskForm.css'

function TaskForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)

  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    }
  })

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
  const [allTags, setAllTags] = useState([]);

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
    if (title.length < 5) errors.push('Title is too short! Make it more than 5 characters.')
    if (title.length > 150) errors.push('Title is too long! Make it less than 150 characters.')
    if (description.length < 5) errors.push('Description is too short! Make it more than 5 characters.')
    if (description.length > 2000) errors.push('Description is too long! Make it less than 2000 characters.')
    if (city.length < 0 || city.length > 50) errors.push('Please provide a valid city name.')
    if (state.length < 0 || state.length > 50) errors.push('Please provide a valid state name.')
    if (country.length < 0 || country.length > 50) errors.push('Please provide a valid country name.')
    if (isNaN(price)) errors.push('Reward must be a number.')
    if (price <= 0) errors.push('Task must pay at least 1 bottle cap.')
    if (tags.length <= 0) errors.push('Task must list at least one required skill.')

    setErrors(errors)

  }, [title, description, city, state, country, price, tags] )

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/tasks/tags`);
      const fetchTags = await response.json();
      setAllTags(fetchTags)
    })();
  }, [dispatch])

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
      tags: tags
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

  const persistTags = [];
  const tagHandler = () => {
    if (allTags && tags) {
      for (let i = 0; i < tags.length; i++) {
        for (let j = 0; j < allTags.length; j++) {
          if (tags[i].id === allTags[j].id) {
            persistTags.push(tags[i]);
          }
        }
      }
    }
  }

  return (
    <div className='form-background'>
      <section className='form-section'>
      <div className='form-header'>
        <div className='vaultboy-bg'>
          <img src='https://www.pngkey.com/png/full/152-1529343_fallout-3-vault-boy-png-picture-download-fallout.png' alt="vaultboy"/>
        </div>
        <div className="bubble bubble-bottom-left">
          {!sessionUser ?
            <p style={{ 'fontStyle': 'italic', 'fontSize': '20px', 'color': 'red' }}>Please login to post a new task!</p>
          :
            hasSubmitted && errors.length > 0 ? (
              <ul className='errors'>
                {errors.map(error => (
                    <li className='error' key={error}>{error}</li>
                ))}
              </ul>
              )
            :
              <p style={{ 'fontStyle': 'italic', 'fontSize': '20px' }}>You got a job? We got a body!</p>
            }
        </div>
      </div>
      <form onSubmit={handleSubmit} className='step-form'>
      {/* {!sessionUser ?
        <div id='taskform-blocker'></div>
      :
        null
      } */}
        {count === 1 &&
        <div className='input-container'>
          <div>
            <div className='input-headers'>
              <h2>So, tell us about your task.</h2>
              <h4> This helps us show you only qualified* and available Mercs for the job. Don't worry, you can edit this later.</h4>
            </div>
            <div className='input-wrapper'>
              {!sessionUser ?
                <>
                  <input
                    type="text"
                    placeholder="Login to enter a title for your task!"
                    required
                    value={title}
                    disabled
                    onChange={updateTitle} />
                  <textarea
                    className="new-task-description"
                    type="text"
                    placeholder="Login to provide a description of the task at hand!"
                    required
                    value={description}
                    disabled
                    onChange={updateDescription} />
                </>
              :
                <>
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
                  </>
              }
              <p id='quality'>*quality not guaranteed.</p>
            </div>
          </div>
          <div className='task-button-container'>
            <button
              type='button'
              onClick={() => setCount(count - 1)}
              disabled={count < 2}
              className='task-form-buttons disabled'
            >Back</button>
            {!sessionUser ?
              // null
              <button
                type='button'
                title='Login to post a new task!'
                id='disabled-task-button'
                onClick={() => setCount(count + 1)}
                disabled
                className='task-form-buttons'
              >Next</button>
            :
              <button
                type='button'
                onClick={() => setCount(count + 1)}
                disabled={count > 4}
                className='task-form-buttons'
              >Next</button>
            }
          </div>
        </div>
        }
        {count === 2 &&
          <div className='input-container'>
            <div>
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
            <div className='task-button-container'>
            <button
              type='button'
              onClick={() => setCount(count - 1)}
              disabled={count < 2}
              className='task-form-buttons'
            >Back</button>
            <button
              type='button'
              onClick={() => setCount(count + 1)}
              disabled={count > 4}
              className='task-form-buttons'
            >Next</button>
          </div>
          </div>
        }
        {count === 3 &&
          <div className='input-container'>
            <div>
              <div className='input-headers'>
                <h2>There are plenty of skills I’ve learned from playing video games.</h2>
                <h4>Tell us what skills you need to get the job done.</h4>
              </div>
              <div className='new-tags-container'>
                {allTags.tags.length > 0 && allTags.tags.map(tag => {
                  return (
                    <div key={tag.id}>
                      <label>{tag.type}</label>
                      <input
                        type='checkbox'
                        name={tag.type}
                        value={tag.id}
                        onChange={(e) => updateTags(e)}
                        checked={tags.includes(String(tag.id))}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          <div className='task-button-container'>
            <button
              type='button'
              onClick={() => setCount(count - 1)}
              disabled={count < 2}
              className='task-form-buttons'
            >Back</button>
            <button
              type='button'
              onClick={() => setCount(count + 1)}
              disabled={count > 4}
              className='task-form-buttons'
            >Next</button>
          </div>
          </div>
        }
        {count === 4 &&
          <div className='input-container'>
            <div>
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
                <h4>How dangerous is your task?</h4>
                <select onChange={updateDangerLevel} >
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                  <option value="5"> 5 </option>
                </select>
              </div>
            </div>
            <div className='task-button-container'>
              <button
                type='button'
                onClick={() => setCount(count - 1)}
                disabled={count < 2}
                className='task-form-buttons'
              >Back</button>
              <button
                type='button'
                onClick={() => setCount(count + 1)}
                disabled={count > 4}
                className='task-form-buttons'
              >Next</button>
            </div>
          </div>
        }
        {count === 5 &&
          <div className='input-container final-screen'>
            <div className='final-screen-wrapper'>
              <div className="input-headers">
                <h2>Everything look correct?</h2>
                <h4>Click on a section to edit.</h4>
              </div>
              <div className="final-screen-content-wrapper">
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
                  {tags.length > 0 && tags.map(tag => {
                    return (<div key={tag.id}>{allTags.tags.find(el => el.id == tag).type}</div>);
                  })}

                </div>
                <div onClick={() => setCount(4)} className='new-price-content final-screen-content'>
                <h5>Reward:</h5>
                  <p>{price} {price ? 'BOTTLE CAPS' : null}</p>
                </div>
                <div onClick={() => setCount(4)} className='new-danger-level-content final-screen-content'>
                  <h5>Danger Level:</h5>
                    <p>{danger_level}</p>
                </div>
              </div>
            </div>
            <div className='task-button-container'>
              <button
                type='button'
                onClick={() => setCount(count - 1)}
                disabled={count < 2}
                className='task-form-buttons'
              >Back</button>
              <button type="submit" className='task-form-buttons'>Submit your task!</button>
            </div>
          </div>
        }
        </form>
        {/* <button
            type='button'
            onClick={() => setCount(count - 1)}
            disabled={count < 2}
            className='task-form-buttons'
        >Back</button>
        <button
            type='button'
            onClick={() => setCount(count + 1)}
            disabled={count > 4}
            className='task-form-buttons'
        >Next</button> */}
      </section>
    </div>
  )
}


export default TaskForm
