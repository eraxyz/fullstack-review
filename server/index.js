const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const gitHelper = require('../helpers/github');
const db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', (req, res) => {
  gitHelper.getReposByUsername(req.body.split('=')[1], (err, username, body) => {
    if (err)
      res.status(400).send("User doesn't exist?");
    db.save(username, body, (err, repoCount) => {
      if (err) 
        res.status(400).send('Bad Request');
      res.redirect('/repos')
    });
  });
});

app.get('/repos', (req, res) => {

  db.getTop25((data) => {
    res.send(data);
  });
});

app.get('/friends', (req, res) => {
  db.getContributors((err, data) => {
    if (err)
      res.status(400).send("Some error", err);
    res.send(data);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
