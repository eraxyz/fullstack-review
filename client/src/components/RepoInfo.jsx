import React from 'react';

const RepoInfo = (props) => (
  <div>
    <h4 className='repo-name'>
        <a href={`https://github.com/${props.repo.repoOwner}/${props.repo.repoName}`}>{props.repo.repoName}</a>
    </h4>
    <div className='repo-info'>{props.repo.description}</div>
    <div className='repo-Author'>{props.repo.repoOwner}</div>
    <div className='repo-popularity'>Forks: {props.repo.forks} Watchers: {props.repo.watchers}</div>    
  </div>
);

export default RepoInfo;