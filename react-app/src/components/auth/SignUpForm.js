import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic_url, setPicUrl] = useState('https://www.giantbomb.com/a/uploads/square_small/10/103881/1778599-chet.jpg');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [count, setCount] = useState(1)

  const onSignUp = async (e) => {
    e.preventDefault();

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
          <div className="bubble bubble-bottom-left">
            {errors.length > 0 ? (
              <ul className='errors'>
                {errors.map(error => (
                    <li className='error' key={error}>{error}</li>
                ))}
              </ul>
            )
              :
              password !== repeatPassword ?
                <p style={{ 'fontStyle': 'italic', 'fontSize': '20px', 'color': 'red' }} >Passwords must match!</p>
                :
                count === 5 ?
                  <p style={{ 'fontStyle': 'italic', 'fontSize': '20px' }}>Just a quick double-check.</p>
                  :
                  <p style={{ 'fontStyle': 'italic', 'fontSize': '20px' }}>Step {count} of 4! </p>
                }
          </div>
        </div>
        <form onSubmit={onSignUp} className='step-form'>
        {count === 1 &&
        <div className='sign-up-input-container'>
          <div>
            <div className='input-headers'>
                <h2>First things first, we're gonna need some info.</h2>
                <h4>All the usual, yada yada.</h4>
              </div>
              <div className='sign-up-inputs'>
                {/* <div className='sign-up-inputs'> */}
                  <div>
                    <h4>User Name:</h4>
                    <input
                      type='text'
                      name='username'
                      placeholder='Username'
                      onChange={updateUsername}
                      value={username}
                    ></input>
                  </div>
                  <div>
                    <h4>Email:</h4>
                    <input
                      type='text'
                      name='email'
                      placeholder='Email'
                      onChange={updateEmail}
                      value={email}
                    ></input>
                  </div>
                  <div>
                    <h4>Password:</h4>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      onChange={updatePassword}
                      value={password}
                    ></input>
                  </div>
                  <div>
                    <h4>Repeat Password:</h4>
                    <input
                      type='password'
                      name='repeat_password'
                      placeholder='Confirm Password'
                      onChange={updateRepeatPassword}
                      value={repeatPassword}
                      required={true}
                    ></input>
                  </div>
                {/* </div> */}
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
        }
        {count === 2 &&
        <div className='sign-up-input-container'>
          <div>
            <div className='input-headers'>
              <h2>Now, why don't you tell us a little about yourself?</h2>
              <h4>This information will be displayed on your user profile page. Don't worry, you can edit it later.</h4>
            </div>
            <div className='sign-up-inputs'>
              <div>
                <h4>First Name:</h4>
                <input
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={first_name}
                ></input>
              </div>
              <div>
                <h4>Last Name:</h4>
                <input
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}
                  value={last_name}
                ></input>
              </div>
              <div className='exclude-textarea'>
                <h4>Bio:</h4>
                <textarea
                  type='text'
                  name='bio'
                  className='bio-description'
                  placeholder='Share your skills, likes, dislikes, what three items you would take into the wasteland... get creative!'
                  onChange={updateBio}
                  value={bio}
                ></textarea>
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
          <div className='sign-up-input-container'>
            <div>
              <div className='input-headers'>
                <h2>Almost there! So, where can find you?</h2>
                <h4>This helps us determine if Task Rat is available in your area.</h4>
              </div>
              <div className='sign-up-inputs'>
                <div>
                  <h4>City:</h4>
                  <input
                    type='text'
                    name='city'
                    placeholder='City'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  ></input>
                </div>
                <div>
                  <h4>State:</h4>
                  <input
                    type='text'
                    name='state'
                    placeholder='State'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  ></input>
                </div>
                <div>
                  <h4>Country:</h4>
                  <input
                    type='text'
                    name='country'
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  ></input>
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
          <div className='sign-up-input-container'>
            <div>
              <div className='input-headers'>
                <h2>Finally, choose an avatar.</h2>
                <h4>Choose wisely.</h4>
              </div>
              <div className='input-wrapper'>
                <div className='avatar-inputs'>
                  <label>
                    <input
                      type='radio'
                      name='pic_url'
                      onChange={(e) => setPicUrl(e.target.value)}
                      checked={pic_url === 'https://www.giantbomb.com/a/uploads/square_small/10/103881/1778599-chet.jpg' || !pic_url}
                      value='https://www.giantbomb.com/a/uploads/square_small/10/103881/1778599-chet.jpg'
                    />
                    <div className='avatar-image'>
                      <img src='https://www.giantbomb.com/a/uploads/square_small/10/103881/1778599-chet.jpg' alt='choice-1' />
                    </div>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='pic_url'
                      onChange={(e) => setPicUrl(e.target.value)}
                      checked={pic_url === 'http://cdn.pastemagazine.com/www/articles/fallout_Rose%20of%20Sharon%20Cassidy.jpg'}
                      value='http://cdn.pastemagazine.com/www/articles/fallout_Rose%20of%20Sharon%20Cassidy.jpg'
                    />
                    <div className='avatar-image'>
                      <img src='http://cdn.pastemagazine.com/www/articles/fallout_Rose%20of%20Sharon%20Cassidy.jpg' alt='choice-2' />
                    </div>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='pic_url'
                      onChange={(e) => setPicUrl(e.target.value)}
                      checked={pic_url === 'https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/57694/57694-1647265530-1228827550.jpeg'}
                      value='https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/57694/57694-1647265530-1228827550.jpeg'
                    />
                    <div className='avatar-image'>
                      <img src='https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/57694/57694-1647265530-1228827550.jpeg' alt='choice-3' />
                    </div>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='pic_url'
                      onChange={(e) => setPicUrl(e.target.value)}
                      checked={pic_url === 'https://lparchive.org/Fallout-3-(by-Lizard-Wizard)/Update%2009/5-Fallout3_2012-02-21_00-13-10-84.jpg'}
                      value='https://lparchive.org/Fallout-3-(by-Lizard-Wizard)/Update%2009/5-Fallout3_2012-02-21_00-13-10-84.jpg'
                    />
                    <div className='avatar-image'>
                      <img src='https://lparchive.org/Fallout-3-(by-Lizard-Wizard)/Update%2009/5-Fallout3_2012-02-21_00-13-10-84.jpg' alt='choice-4' />
                    </div>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='pic_url'
                      onChange={(e) => setPicUrl(e.target.value)}
                      checked={pic_url === 'https://cdn.pastemagazine.com/www/articles/2021/06/28/dogmeat_passing_main.jpg'}
                      value='https://cdn.pastemagazine.com/www/articles/2021/06/28/dogmeat_passing_main.jpg'
                    />
                    <div className='avatar-image'>
                      <img src='https://cdn.pastemagazine.com/www/articles/2021/06/28/dogmeat_passing_main.jpg' alt='choice-5' />
                    </div>
                  </label>
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
          <div className='sign-up-input-container final-screen'>
          <div className='final-screen-wrapper'>
            <div className="input-headers">
              <h2>Everything look correct?</h2>
              <h4 id='final-screen-h4'>Click on a section to edit.</h4>
            </div>
            <div className='final-screen-info'>
              <div className='left-user-info'>
                <div>
                  <h4 onClick={() => setCount(2)}>Name: </h4>
                  <p>{first_name} {last_name}</p>
                </div>
                <div>
                  <h4 onClick={() => setCount(1)}>Username: </h4>
                  <p>{username}</p>
                </div>
                <div>
                  <h4 onClick={() => setCount(1)}>Email: </h4>
                  <p>{email}</p>
                </div>
                <div onClick={() => setCount(3)}>
                  <h4>Location: </h4>
                  <p>{city}, {state}, {country}</p>
                </div>
              </div>
              <div className='right-user-bio'>
                <div className='sign-up user-photo' onClick={() => setCount(4)}>
                  <img src={pic_url} alt='user-avatar' />
                </div>
                <div className='sign-up user-bio' onClick={() => setCount(2)}>
                  <h4>Bio:</h4>
                  <p>{bio}</p>
                </div>
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
