// implement your API here
const express = require('express');
const server = express();
const PORT = 4000;
const db = require('./data/db');
//endpoints
server.get('/api/users/', (req, res) => {
  db.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err => {
      res.json({ message: "failed to get users" }.status(500))
    }));
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((user => {
      if (user) {
        res.json(user);
      }
      else {
        res.status(404).json({ message: 'cannot find user' })
      }
    }))
    .catch(err => {
      res.status(500).json({ message: "failed to get user" })
    })
})

server.listen(PORT, () => {  //port number and call back
  console.log(`server is up and running and running on port ${PORT}`) //the call back is usually an arrow function by convention but you can make a function that is not inline and just pop the name in as the callback
});

//listen always goes at the end of the code.