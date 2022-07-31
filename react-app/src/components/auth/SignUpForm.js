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
          <div class="bubble bubble-bottom-left" contenteditable>
            {hasSubmitted && errors.length > 0 ? (
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
                  <label>User Name</label>
                  <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                  ></input>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                </div>
                <div>
                  <label>Repeat Password</label>
                  <input
                    type='password'
                    name='repeat_password'
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
              <h2>Sweet, now why don't you tell us a little about yourself?</h2>
              <h4>This information will be displayed on your user profile page. Don't worry, you can edit it later.</h4>
            </div>
            <div className='input-wrapper'>
              <div>
                <label>First Name</label>
                <input
                  type='text'
                  name='first_name'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={first_name}
                ></input>
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type='text'
                  name='last_name'
                  onChange={(e) => setLastName(e.target.value)}
                  value={last_name}
                ></input>
              </div>
              <div>
                <label>Bio</label>
                <textarea
                  type='text'
                  name='bio'
                  onChange={(e) => setBio(e.target.value)}
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
                  <label>City</label>
                  <input
                    type='text'
                    name='city'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  ></input>
                </div>
                <div>
                  <label>State</label>
                  <input
                    type='text'
                    name='state'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  ></input>
                </div>
                <div>
                  <label>Country</label>
                  <input
                    type='text'
                    name='country'
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
                <h4>How do you want to present yourself to the world?</h4>
              </div>
              <div className='input-wrapper'>
                  <label>Pic Url</label>
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
                <button type='submit'>Sign Up</button>
              </div>
            </div>
          </div>
        }
        </form>
      </section>
    </div>


  );
};

export default SignUpForm;
