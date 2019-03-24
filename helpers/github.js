const request = require('request');
const config = require('../config.js');
var rp = require('request-promise-native');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, response, body) => {
    getContributors(JSON.parse(body).map(obj => obj.contributors_url));
    cb(err, username, body);
  });

};

let getContributors = (contributorsURLArray) => {
  
  Promise.all(contributorsURLArray.map(url => {
    let options = {
      url,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    }
    return rp(options).then(data => ({
      repoName: url.split('/')[5], 
      contributors: JSON.parse(data).map(obj => ({
        contributorName: obj.login, 
        contributions: obj.contributions
      }))
    }));
  })).then(data => db.saveContributors(data));
  
}

module.exports.getReposByUsername = getReposByUsername;