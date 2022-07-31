
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import TagsDropDown from '../TagsDropDown/TagsDropDown';
import LoginFormModal from '../auth/LoginFormModal';
import DemoUser from '../auth/DemoUser';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav className='navbar-container'>
      <NavLink style={{ borderStyle: 'none' }} to='/' exact={true}>
      <div className='logo'>
        <span>TaskRat</span>
          <img src='/images/rat-512-316960.png' />
      </div>
      </NavLink>
      <div className='navlinks'>
        <div className='permanent-links'>
          <ul className="navbar-buttons">
            <li><NavLink to='/' exact={true} activeClassName='active'>Home</NavLink></li>
            <li><TagsDropDown /></li>
            <li><NavLink to='/about' exact={true} activeClassName='active'>
              About
            </NavLink></li>
          </ul>
        </div>
        {!sessionUser ?
          <div className='logged-out-links'>
            <ul className="navbar-buttons">
              <li><NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink></li>
              <li><DemoUser /></li>
              <li><LoginFormModal /></li>
            </ul>
          </div>

          :
          <div className='logged-in-links'>
            <ul>
              <li><NavLink to='/tasks/new' exact={true} activeClassName='active'>Create a Task</NavLink></li>
              <li><NavLink to={`/profile`} exact={true} activeClassName='active'>Profile</NavLink></li>
              <li><LogoutButton /></li>
            </ul>
          </div>

        }

      </div>
    </nav>
  );
}

export default NavBar;
