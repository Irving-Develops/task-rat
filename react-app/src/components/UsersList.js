import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session)

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
      <div className='card users' id={user.id}> 
        <img src={user.pic_url} alt="cool guy" className="user-card-img"/>
        <p><NavLink to={`/users/${user.id}`}>{user.first_name} {user.last_name}</NavLink></p>
        <p>Located in {user.city}, {user.state}, {user.country}</p>
        {user.bio ? 
        <p>I'm the right person for the task:</p>
        : null}
      <p>{user.bio}</p>
      </div>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <div className="card-container">
        {userComponents}
      </div>
    </>
  );
}

export default UsersList;
