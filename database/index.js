const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true });

let repoSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
        unique: true,
        dropDups: true
    }
  },
  userURL: String,
  repoCount: Number,
  repos: [
    {
      repoID: Number,
      repoName: String,
      repoOwner: String,
      description: String,
      watchers: Number,
      forks: Number
    }
  ]
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, repos, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos = JSON.parse(repos);

  if (repos.length === 0)
    cb('No repos')

  let userObj = createUserObject(username, repos);
  let query = {username};
  Repo.findOneAndUpdate(query, userObj, {upsert:true}, function(err, doc){
    if (err) 
      cb(err)
    console.log("succesfully saved");
    cb(null);
  });
}

let createUserObject = (username, repos) => {
  let newUser = {
    username: username,
    userURL: repos[0].owner['html_url'],
    repoCount: repos.length,
    repos: []
  };
  
  repos.sort((a, b) => b.forks - a.forks);

  for (let repo of repos) {
    let repoObj = {
      repoId: repo.id,
      repoName: repo.name,
      repoOwner: username,
      description: repo.description,
      watchers: repo.watchers,
      forks: repo.forks
    }
    newUser.repos.push(repoObj);
  }

  return newUser;
}

let getTop25 = (cb) => {
  Repo.find({}).select('repos -_id').exec((err, array) => {
    if (err) console.error(err);

    let result = [];
    let repoCount = array.reduce((acc, repo) => acc += repo.repos.length, 0);

    while(result.length < 25 && result.length !== repoCount) {
      let currentMax = -1, index = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].repos.length === 0) 
          continue;
        if (array[i].repos[0].forks > currentMax) {
          currentMax = array[i].repos[0].forks;
          index = i;
        }
      }
      result.push(array[index].repos.shift());
      currentMax = -1, index = 0;
    }

    cb(result);
  })
}

module.exports.getTop25 = getTop25;
module.exports.save = save;