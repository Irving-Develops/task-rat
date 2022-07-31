import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile } from "../../store/session";
import "./EditProfileForm.css"

const EditProfileForm = ({ user, toggleShow }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [first_name, setFirstName] = useState(user.first_name)
  const [last_name, setLastName] = useState(user.last_name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [pic_url, setPicUrl] = useState(user.pic_url)
  const [city, setCity] = useState(user.city)
  const [state, setState] = useState(user.state)
  const [country, setCountry] = useState(user.country)
  const [bio, setBio] = useState(user.bio)
  const [errors, setErrors] = useState([])

  const updateFirstName = (e) => setFirstName(e.target.value)
  const updateLastName = (e) => setLastName(e.target.value)
  const updateUsername = (e) => setUsername(e.target.value)
  const updateEmail = (e) => setEmail(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)
  const updatePicUrl = (e) => setPicUrl(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateBio = (e) => setBio(e.target.value)



  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      id: sessionUser.id,
      first_name,
      last_name,
      email,
      pic_url,
      city,
      state,
      country,
      bio
    }

    setErrors([])

    try {
      const response = await dispatch(editProfile(payload))
      if (response) {
        setFirstName(response.first_name)
        setLastName(response.last_name)
        setBio(response.bio)
        setCity(response.city)
        setCountry(response.country)
        setEmail(response.email)
        setPicUrl(response.pic_url)
        setState(response.state)
        toggleShow()
      }
    } catch (error) {
      setErrors(error)
      // return dispatch(editProfile(payload)).catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors)
      // })

    }
  }

  return (
    <section id="edit-form-div">
      <div>
        <form id="edit-form-container" onSubmit={handleSubmit} method="put">
          {/* <ul>
          {errors.map((error, idx) => <li key={idx} className="errorList"> • {error}</li>)}
        </ul> */}
          <p>
            <label>First Name: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="First Name"
              required
              value={first_name}
              onChange={updateFirstName} />
          </p>
          <p>
            <label>Last Name: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="Last Name"
              required
              value={last_name}
              onChange={updateLastName} />
          </p>
          <p>
            <label>Email: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={updateEmail} />
          </p>
          <p>
            <label>Profile Pic: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="Profile Pic"
              required
              value={pic_url}
              onChange={updatePicUrl} />
          </p>
          <p>
            <label>City: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={updateCity} />
          </p>
          <p>
            <label>State: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="State"
              required
              value={state}
              onChange={updateState} />
          </p>
          <p>
            <label>Country: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={updateCountry} />
          </p>
          <p>
            <label>Bio: </label>
            <input
              className="edit-form-inputs"
              type="text"
              placeholder="Bio"
              required
              value={bio}
              onChange={updateBio} />
          </p>
          <button id="edit-review-button" type="submit"> Confirm Changes </button>
        </form>
      </div>
    </section>
  )
}

export default EditProfileForm
