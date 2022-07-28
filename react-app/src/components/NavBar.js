
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import LoginFormModal from './auth/LoginFormModal';
import DemoUser from './auth/DemoUser';

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
        {!sessionUser ?
          <li>
            <li>
              <DemoUser/>
            </li>
            <li>
              <LoginFormModal/>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </li>
          :
          <li>
            <li>
              <NavLink to='/tasks/new' exact={true} activeClassName='active'>
                Create a Task
              </NavLink>
            </li>
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
