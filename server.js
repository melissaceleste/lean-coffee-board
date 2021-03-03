const express = require('express')
const { v4: uuidv4 } = require('uuid')


const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/lean-coffee-board')
.then(() => console.log('connected to mongodb'))
.catch(error => console.log('could not connect to mongodb', error))


const app = express() // damit bekommen wir eine Express-app - App ist hier eine Instanz - keine App wie wir sie können
let users = []

app.use(express.json())

app.get('/api/users', (req, res) => {
  // hiermit lassen wir uns die /api/users anzeigen
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  // hiermit lassen wir uns die jeweiligen User mit der entsprechenden ID (die wir einfügen) anzeigen lassen
  const { id } = req.params
  res.json(users.find(user => user.id === id))
})

app.post('/api/users', (req, res) => {
  // hiermit können wir neue User hinzufügen
  const newUser = { ...req.body, id: uuidv4() }
  users.push(newUser)
  res.json(newUser)
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  const index = users.findIndex(user => user.id === id)
  users = [...users.slice(0, index), ...users.slice(index + 1)]
  res.json(users)
})

app.listen(3000, () => {
  console.log('Server started at locoalhost:3000')
})
