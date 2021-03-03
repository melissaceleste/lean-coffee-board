const express = require('express') // Import express (Framework für node)
const { v4: uuidv4 } = require('uuid') // Import UUID, nachdem wir npm install uuid gemacht haben

const mongoose = require('mongoose') // Import mongoose
const User = require('./models/User') // import des Models User aus User.js

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    // verbindet mongo-DB mit lean-coffee-board
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log('could not connect to mongodb', error))

const app = express() // damit bekommen wir eine Express-app - App ist hier eine Instanz - keine App wie wir sie können

app.use(express.json()) //erste middleware-Funktion, müssen wir aufrufen, damit wir danach klassische Middlewares mit den HTTP-Methods schreiben können

app.get('/api/users', async (req, res) => {
  // hiermit lassen wir uns die /api/users anzeigen
  res.json(await User.find()) // ist das gleiche wie User.find().then(users=> res.json(users))
})

app.get('/api/users/:id', async (req, res) => {
  // hiermit lassen wir uns die jeweiligen User mit der entsprechenden ID (die wir einfügen) anzeigen lassen
  const { id } = req.params
  res.json(await User.findOne({ id }))
})

app.post('/api/users', async (req, res) => {
  // hiermit können wir neue User hinzufügen
  //   const newUser = { ...req.body, id: uuidv4() }
  //   users.push(newUser)
  res.json(await User.create(req.body))
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  //   const index = users.findIndex(user => user.id === id)
  //   users = [...users.slice(0, index), ...users.slice(index + 1)]
  res.json(await User.deleteOne({ id }))
})

app.listen(3000, () => {
  console.log('Server started at locoalhost:3000')
})
