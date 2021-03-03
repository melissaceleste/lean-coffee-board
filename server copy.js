const express = require('express')
const { v4: uuidv4 } = require('uuid')
uuidv4()

const app = express() // damit bekommen wir eine Express-app - App ist hier eine Instanz - keine App wie wir sie können

const users = []

app.use(express.json())

// ist das gleiche wie :
// const middleware = express.json()
// app.use(middleware)

// middleware kommt automatisch mit in den express.json funktion
// middleware Funktion: sammelt die Daten ein ..req body streamt die Daten in einen Buffer (hier werden alle Daten eingesammelt), danach umgewandelt mit hilfe von jsonParse und dann wieder im ReqBody gespeichert und gesagt "jetzt macht der nächste weiter"

app.get('/api/users', (req, res) => {
  // ist das ein Get-Request und beschriebene URL? Ansonsten wird das andere weiter unten ausgeführ
  res.json(users)
})
/* app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
}) */

app.get('/api/users', (req, res) => {
  const { id } = req.params
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const newUser = { ...req.body, id: uuidv4() }
  users.push(newUser) //
  res.json(newUser)
})
// statt res.end kann ich auch res.json schreiben, um daraus direkt ein string zu machen, ist wie stringify
// req.url === '/api/users'  // wenn url gleich '/api/users' ist
//  ? res.end('[{"name": "Melissa", "role":"student"}]') //  dann schicke diese Daten zurück
//  : next () // ansonsten geh zum nächsten Befehl weiter

// console.log(req.method, req.url)
// res.end('Hello World')

app.listen(3000, () => {
  // unter welchem Port der Server gestartet werden soll
  console.log('Server started at locoalhost:3000')
})

/* const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

const users = []

app.use(express.json())

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  users.push({ id: uuidv4(), name: req.body.name })
  res.json(req.body)
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First Card' }])
})
l
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
}) */
