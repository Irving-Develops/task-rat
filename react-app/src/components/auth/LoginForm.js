import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { login, demoLogin } from '../../store/session';
import DemoUser from './DemoUser';
import "./LoginForm.css"

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const modalCheck = true

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    return dispatch(demoLogin())
  }

  const handleSignUp = () => {
    setShowModal(false)
    //return <Redirect to="/sign-up" />
  }

  return (
    <div id="login-form-div">
      <form id="login-form-container" onSubmit={onLogin}>
        <div className='login-form-top'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <h2>Welcome back, Partner.</h2>
          <div className='login-form-input-container'>
            <div>
              <label htmlFor='email'>Email: </label>
              <input
                className="login-form-inputs"
                name='email'
                type='text'
                // placeholder='>Email'
                value={email}
                onChange={updateEmail}
                autoFocus
              />
            </div>
            <div>
              <label id="password-text" htmlFor='password'>Password: </label>
              <input
                className="login-form-inputs"
                name='password'
                type='password'
                // placeholder='>Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
          </div>
        </div>
        <div className='login-form-bottom'>
          <div id="login-buttons-div">
            <button id="login-form-btn" type='submit'>[Login]</button>
            <div className="login-buttons">
              <DemoUser modalCheck={modalCheck} />
            </div>
          </div>
          <Link to="/sign-up">
            <div id="handle-signup-btn" onClick={handleSignUp}>
              <div>
                <h3>Don't have an account?</h3>
              </div>
              <button>
                [Sign Up!]
              </button>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
