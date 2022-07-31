import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile } from "../../store/session";

const EditProfileForm = ({ user, toggleShow }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [first_name, setFirstName] = useState(user.first_name)
  const [last_name, setLastName] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [city, setCity] = useState(user.city)
  const [state, setState] = useState(user.state)
  const [country, setCountry] = useState(user.country)
  const [bio, setBio] = useState(user.bio)
  const [errors, setErrors] = useState([])

  const updateFirstName = (e) => setFirstName(e.target.value)
  const updateLastName = (e) => setLastName(e.target.value)
  const updateEmail = (e) => setEmail(e.target.value)
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
        setState(response.state)
        toggleShow()
      }
    } catch (error) {
      console.log(error)
      setErrors(error.errors)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} method="put">
        {errors && errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => <li key={idx} className="errorList"> {error}</li>)}
          </ul>
        )}
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          required
          value={first_name}
          onChange={updateFirstName} />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          required
          value={last_name}
          onChange={updateLastName} />
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={updateEmail} />
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity} />
        <label>State</label>
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState} />
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          required
          value={country}
          onChange={updateCountry} />
        <label>Bio</label>
        <input
          type="text"
          placeholder="Bio"
          required
          value={bio}
          onChange={updateBio} />
        <button type="submit"> Confirm Changes </button>
      </form>
    </section>
  )
}

export default EditProfileForm
