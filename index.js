// implement your API here
const express = require('express');
const server = express();
const PORT = 4000;
const db = require('./data/db');
const parser = express.json();
server.use(parser)
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

server.put('/api/users/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params
  if (user.name && user.bio) {
    res.json({ message: 'not valid update' })
  }
  else {
    db.update(id, user)
      .then(count => {
        if (count) {
          db.findById(id).then(user => {
            res.json(user)
          });
        }
        else {
          res.status(404).json({ message: 'user not found' })
        }
      }).catch(err => {
        res.json("something went wrong").status(500)
      });
  };
});


server.listen(PORT, () => {  //port number and call back
  console.log(`server is up and running and running on port ${PORT}`) //the call back is usually an arrow function by convention but you can make a function that is not inline and just pop the name in as the callback
});

//listen always goes at the end of the code.