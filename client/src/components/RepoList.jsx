import React from 'react';
import RepoInfo from './RepoInfo.jsx';

const RepoList = (props) => (
  <div>
    <h3> Repo List Component </h3>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => 
      <RepoInfo repo={repo}></RepoInfo>)}
  </div>
);

export default RepoList;