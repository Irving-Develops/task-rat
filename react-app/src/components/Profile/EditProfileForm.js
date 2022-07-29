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
  const updateCity = (e) => setCity(e.value.target)
  const updateState = (e) => setState(e.value.target)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateBio = (e) => setBio(e.target.value)



  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(user, "This is the user")

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
    <section>
      <form onSubmit={handleSubmit} method="put">
        {/* <ul>
          {errors.map((error, idx) => <li key={idx} className="errorList"> • {error}</li>)}
        </ul> */}
        <input
          type="text"
          placeholder="First Name"
          required
          value={first_name}
          onChange={updateFirstName} />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={last_name}
          onChange={updateLastName} />
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={updateEmail} />
        <input
          type="text"
          placeholder="Profile Pic"
          required
          value={pic_url}
          onChange={updatePicUrl} />
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
