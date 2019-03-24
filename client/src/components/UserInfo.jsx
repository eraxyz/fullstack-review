import React from 'react';
import UserRepo from './UserRepo.jsx';

const UserInfo = ({user, display, friends}) => (
  <div>
    <h4 className='user-name'>
        <a href={`${user.userURL}`}>{user.username}</a>
    </h4>
    <div className='user-repos'>Repos: {user.repoCount}</div> 
    {user.repos.map((repo) => 
      <UserRepo repo={repo} display={display} friends={friends}
    />)}   
  </div>
);

export default UserInfo;