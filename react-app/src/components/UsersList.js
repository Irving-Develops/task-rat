import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  const userComponents = users.map((user) => {
    return (
      <div className='user-card-wrapper'> 
        <img src={user.pic_url} alt="cool guy" />
        <p><NavLink to={`/users/${user.id}`}>{user.first_name} {user.last_name}</NavLink></p>
        <p>Located in {user.city}, {user.state}, {user.country}</p>
        <p>I'm the right person for the task:</p>
        <p>{user.bio}</p>
      </div>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
