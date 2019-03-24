import React from 'react';
import UserFriends from './UserFriends.jsx';

const UserRepo = ({repo, display, friends}) => (
  <div>
    <div className='user-repo'>
        <a href={`https://github.com/${repo.repoOwner}/${repo.repoName}`}>
            {repo.repoName}
        </a>
        {(display) ? 
            friends.map(obj => {
                if (obj.repoName === repo.repoName) 
                    return <UserFriends friends={obj.contributors}/>
            }) 
            : null
        }
    </div>    
  </div>
);

export default UserRepo;