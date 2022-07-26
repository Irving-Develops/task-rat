import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
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
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password, pic_url, city, state, country));
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
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
      <div>
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
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
