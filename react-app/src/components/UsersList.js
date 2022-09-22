import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersProfileModal from './Profile/UsersProfileModal';
import './UsersList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session)
  const filteredAvailableUsers = [...users];
  const availableUsers = filteredAvailableUsers.slice(0, 3);
  // if(sessionUser.user) {
  //   availableUsers = availableUsers.filter(user => user.id !== sessionUser.user.id)
  // }
  // while (availableUsers.length > 3) {
  //   availableUsers.pop()
  // }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  const userComponents = availableUsers.map((user) => {
    return (
      <div key={user.id} className='card users' id={user.id}>
        <div className='user-id'>
          <div className='user-img'>
            <img src={user.pic_url} alt="cool guy" className="user-card-img"/>
          </div>
          <div className='user-name'>
            <p>{user.first_name} {user.last_name}</p>
            <p>Located in {user.city}, {user.state}, {user.country}</p>
          </div>
        </div>
        <div className='content-container'>
          <h4>About me:</h4>
          <p className='bio'>{user.bio}</p>
          {/* <p className='bio'>I know my way around a toolbox. Can fix just about anything with a little duct tape and glue.</p> */}
        </div>
        <div className='home-page-buttons'>
            <UsersProfileModal user={user} />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='home-page-title'>
        <h2>Featured users</h2>
      </div>
      <div className="card-container">
        {userComponents}
      </div>
    </>
  );
}

export default UsersList;
