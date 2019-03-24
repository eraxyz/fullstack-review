import React from 'react';

const RepoInfo = ({repo}) => (
  <div>
    <h4 className='repo-name'>
        <a href={`https://github.com/${repo.repoOwner}/${repo.repoName}`}>{repo.repoName}</a>
    </h4>
    <div className='repo-info'>{repo.description}</div>
    <div className='repo-Author'>{repo.repoOwner}</div>
    <div className='repo-popularity'>Forks: {repo.forks} Watchers: {repo.watchers}</div>    
  </div>
);

export default RepoInfo;