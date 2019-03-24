import React from 'react';

const UserFriends = ({friends}) => (
  <div>
    <div className='user-friends'>
        {friends.map(contributor => {
            return <div>Contributor: {contributor.contributorName} Contributions: {contributor.contributions}</div>
        })}
    </div>    
  </div>
);

export default UserFriends;