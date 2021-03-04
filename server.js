const express = require('express') // Import express (Framework für node)
const { v4: uuidv4 } = require('uuid') // Import UUID, nachdem wir npm install uuid gemacht haben

const mongoose = require('mongoose') // Import mongoose

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

// -----import der User:----
app.use('/api/users', require('./routes/users'))
// -----import der Card:----
app.use('/api/cards', require('./routes/cards'))

// Middleware die den error entgegennimmt /Fehlerhandling:
app.use((err, req, res, next) => {
  console.log(err.message)
  res.json({ error: err.message })
})
app.listen(4000, () => {
  console.log('Server started at http://localhost:4000')
})
