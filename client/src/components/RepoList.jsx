import React from 'react';
import RepoInfo from './RepoInfo.jsx';

const RepoList = ({repos}) => (
  <div>
    <h3> Repo List Component </h3>
    Top {repos.length} repos by forks.
    {repos.map((repo) => 
      <RepoInfo repo={repo}/>)}
  </div>
);

export default RepoList;