import React from 'react';
import UserInfo from './UserInfo.jsx';

const UserList = ({users, friendsClick, display, friends}) => (
  <div>
    <h3> User List Component </h3>
    There are {users.length} users.
    <button onClick={friendsClick}>Show Friends</button>
    {users.map((user) => 
      <UserInfo user={user} display={display} friends={friends}/>)}
  </div>
);

export default UserList;