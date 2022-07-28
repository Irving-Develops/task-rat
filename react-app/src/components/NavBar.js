
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import LoginFormModal from './auth/LoginFormModal';
import DemoUser from './auth/DemoUser';
import AboutMe from './AboutMe';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/tasks' exact={true} activeClassName='active'>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' exact={true} activeClassName='active'>
            About
          </NavLink>
        </li>
        {!sessionUser ?
          <li>
            <div>
              <DemoUser/>
            </div>
            <div>
              <LoginFormModal/>
            </div>
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </li>
          :
          <li>
            <div>
              <NavLink to='/tasks/new' exact={true} activeClassName='active'>
                Create a Task
              </NavLink>
            </div>
            <NavLink to={`/profile`} exact={true} activeClassName='active'>
              Profile
            </NavLink>
            <div>
              <LogoutButton />
            </div>
          </li>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
