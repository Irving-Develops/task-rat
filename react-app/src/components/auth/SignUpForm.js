import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic_url, setPicUrl] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [count, setCount] = useState(1)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password, pic_url, city, state, country, bio));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-background'>
      <section className='form-section'>
        <div className='form-header'>
          <div className='vaultboy-bg'>
            <img src='https://www.pngkey.com/png/full/152-1529343_fallout-3-vault-boy-png-picture-download-fallout.png' alt="vaultboy"/>
          </div>
          <div className="bubble bubble-bottom-left" contenteditable>
            {errors.length > 0 ? (
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
        <form onSubmit={onSignUp} className='step-form'>
        {count === 1 &&
        <div className='input-container'>
          <div>
            <div className='input-headers'>
                <h2>Let's get started!</h2>
                <h4>All the usual, yada yada.</h4>
              </div>
              <div className='input-wrapper'>
                <div>
                  <h4>User Name</h4>
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </div>
                <div>
                  <h4>Email</h4>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
                  ></input>
                </div>
                <div>
                  <h4>Password</h4>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                </div>
                <div>
                  <h4>Repeat Password</h4>
                  <input
                    type='password'
                    name='repeat_password'
                    placeholder='Confirm Password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                  ></input>
                </div>
              </div>
              <div className='task-button-container'>
                <button
                  type='button'
                  onClick={() => setCount(count - 1)}
                  disabled={count < 2}
                  className='task-form-buttons disabled'
                  >Back</button>
                <button
                  type='button'
                  onClick={() => setCount(count + 1)}
                  disabled={count > 4}
                  className='task-form-buttons'
                  >Next</button>
              </div>
            </div>
          </div>
        }
        {count === 2 &&
        <div className='input-container'>
          <div>
            <div className='input-headers'>
              <h2>Now, why don't you tell us a little about yourself?</h2>
              <h4>This information will be displayed on your user profile page. Don't worry, you can edit it later.</h4>
            </div>
            <div className='input-wrapper'>
              <div>
                <h4>First Name</h4>
                <input
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={first_name}
                ></input>
              </div>
              <div>
                <h4>Last Name</h4>
                <input
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}
                  value={last_name}
                ></input>
              </div>
              <div>
                <h4>Bio</h4>
                <textarea
                  type='text'
                  name='bio'
                  placeholder='Share your skills, likes, dislikes, what three items you would take into the wasteland... get creative!'
                  onChange={updateBio}
                  value={bio}
                ></textarea>
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
          </div>
        </div>
        }
        {count === 3 &&
          <div className='input-container'>
            <div>
              <div className='input-headers'>
                <h2>Almost there! So, where can find you?</h2>
                <h4>This helps us determine if Task Rat is available in your area.</h4>
              </div>
              <div className='input-wrapper'>
                <div>
                  <h4>City</h4>
                  <input
                    type='text'
                    name='city'
                    placeholder='City'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  ></input>
                </div>
                <div>
                  <h4>State</h4>
                  <input
                    type='text'
                    name='state'
                    placeholder='State'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  ></input>
                </div>
                <div>
                  <h4>Country</h4>
                  <input
                    type='text'
                    name='country'
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  ></input>
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
          </div>
        }

        {count === 4 &&
          <div className='input-container'>
            <div>
              <div className='input-headers'>
                <h2>Finally, choose an avatar.</h2>
                <h4>Choose the one that speaks to your soul.</h4>
              </div>
              <div className='input-wrapper'>
                  <h4>Pic Url</h4>
                  <input
                    type='radio'
                    name='pic_url'
                    onChange={(e) => setPicUrl(e.target.value)}
                    value='https://cdn.pastemagazine.com/www/articles/2021/06/28/dogmeat_passing_main.jpg'
                  ></input>
                  <input
                    type='radio'
                    name='pic_url'
                    onChange={(e) => setPicUrl(e.target.value)}
                    value='https://static.wikia.nocookie.net/fallout/images/e/ed/FO01_NPC_Aradesh_B.png/revision/latest?cb=20110406051919'
                  ></input>
                  <input
                    type='radio'
                    name='pic_url'
                    onChange={(e) => setPicUrl(e.target.value)}
                    value='https://i.ytimg.com/vi/kjLUzm4tbSc/maxresdefault.jpg'
                  ></input>
                  <input
                    type='radio'
                    name='pic_url'
                    onChange={(e) => setPicUrl(e.target.value)}
                    value='https://static.wikia.nocookie.net/fallout/images/a/ae/FO01_NPC_Tandi_N.png/revision/latest?cb=20110105032751'
                  ></input>
                  <input
                    type='radio'
                    name='pic_url'
                    onChange={(e) => setPicUrl(e.target.value)}
                    value='https://static.wikia.nocookie.net/fallout/images/1/14/Bittercup.jpg/revision/latest?cb=20101221185412'
                  ></input>
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
                <h5>Username: </h5>
                <p>{username}</p>
              </div>
              <div onClick={() => setCount(1)} className='new-description-content final-screen-content'>
                <h5>Email: </h5>
                <p>{email}</p>
              </div>
              <div onClick={() => setCount(2)} className='new-location-content final-screen-content'>
                <h5>Name: </h5>
                <p>{first_name} {last_name}</p>
              </div>
              <div onClick={() => setCount(2)} className='new-description-content final-screen-content'>
                <h5>Bio: </h5>
                <p>{bio}</p>
              </div>
              <div onClick={() => setCount(4)} className='new-price-content final-screen-content'>
              <h5>Location: </h5>
                <p>{city}, {state}, {country}</p>
              </div>
              <div onClick={() => setCount(4)} className='new-danger-level-content final-screen-content'>
                <h5>Avatar: </h5>
                <img src={pic_url} alt='user-pic' />
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
            <button type="submit" className='task-form-buttons'>Sign Up!</button>
          </div>
        </div>
        }
        </form>
      </section>
    </div>


  );
};

export default SignUpForm;
