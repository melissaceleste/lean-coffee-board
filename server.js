const express = require('express')
const app = express() // damit bekommen wir eine Express-app - App ist hier eine Instanz - keine App wie wir sie können


app.use('/api/users', (req, res) => {
    res.end('[{"name": "Melissa", "role": "student"}]')
  })
  app.use('/api/cards', (req, res) => {
    res.end('[{"title": "First card"}]')
  })
 




    // req.url === '/api/users'  // wenn url gleich '/api/users' ist
//  ? res.end('[{"name": "Melissa", "role":"student"}]') //  dann schicke diese Daten zurück
//  : next () // ansonsten geh zum nächsten Befehl weiter

    // console.log(req.method, req.url)
    // res.end('Hello World')

app.listen(3000, ()=> { // unter welchem Port der Server gestartet werden soll
console.log('Server started at locoalhost:3000')
})