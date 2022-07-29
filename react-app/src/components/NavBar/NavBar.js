
import React from 'react';
import { NavLink } from 'react-router-dom';
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
      <div className='logo'>
        {/* <NavLink to='/'>TaskRat</NavLink> */}
        <span>TaskRat</span>
      </div>
      <div className='navlinks'>
        <div className='permanent-links'>
          <ul>
            <li><NavLink to='/' exact={true} activeClassName='active'>Home</NavLink></li>
            <li><TagsDropDown/></li>
            </ul>
        </div>
          {!sessionUser ?
            <div className='logged-out-links'>
              <ul>
                <li><NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink></li>
                <li><DemoUser/></li>
                <li><LoginFormModal/></li>
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