const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const gitHelper = require('../helpers/github');
const db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  gitHelper.getReposByUsername(req.body.split('=')[1], (err, username, body) => {
    if (err)
      res.status(400).send("User doesn't exist?");
    db.save(username, body, (err) => {
      if (err) 
        res.status(400).send('Bad Request');
      res.redirect('/repos')
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTop25((data) => {
    res.send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

