
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import TagsDropDown from '../TagsDropDown/TagsDropDown';
import LoginFormModal from '../auth/LoginFormModal';
import DemoUser from '../auth/DemoUser';
import './NavBar.css'
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks)
  console.log(tasks)
  return (
    <nav className='navbar-container'>
      <NavLink style={{ borderStyle: 'none' }} to='/' exact={true}>
        <div className='logo'>
          {/* <img src='../../../images/rat-logo.png' alt='rat-logo'/> */}
          <span>TaskRat</span>
        </div>
      </NavLink>
      <SearchBar placeholder="Find a task" data={tasks} />
      <div className='navlinks'>
        <div className='permanent-links'>
          <ul className="navbar-buttons">
            <li><NavLink to='/' exact={true} activeClassName='active'>Home</NavLink></li>
            <li id='nav-task-link'><TagsDropDown /></li>
          </ul>
        </div>
        {!sessionUser ?
          <div className='logged-out-links'>
            <ul className="navbar-buttons">
              <li><DemoUser /></li>
              <li><NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink></li>
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
        <li>
          <NavLink to='/about' exact={true} activeClassName='active'>
            About
          </NavLink>
        </li>
      </div>
    </nav>
  );
}

export default NavBar;
