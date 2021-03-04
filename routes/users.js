const express = require('express')
const User = require('../models/User') // import des Models User aus User.js
const router = express.Router()

router.get('/', async (req, res, next) => {
  // hiermit lassen wir uns die /api/users anzeigen
  res.json(await User.find().catch(next)) // ist das gleiche wie User.find().then(users=> res.json(users))
})

router.get('/:id', async (req, res, next) => {
  // hiermit lassen wir uns die jeweiligen User mit der entsprechenden ID (die wir einfügen) anzeigen lassen
  const { id } = req.params
  res.json(await User.findById({ id }).catch(next))
})

router.post('/', async (req, res, next) => {
  // hiermit können wir neue User hinzufügen
  //   const newUser = { ...req.body, id: uuidv4() }
  //   users.push(newUser)
  res.json(await User.create(req.body).catch(next))
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  //   const index = users.findIndex(user => user.id === id)
  //   users = [...users.slice(0, index), ...users.slice(index + 1)]
  res.json(await User.findByIdAndDelete({ id }).catch(next))
})

module.exports = router
