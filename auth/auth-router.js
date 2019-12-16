const bcrypt = require('bcryptjs');

const router = require('express');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

module.exports = router;