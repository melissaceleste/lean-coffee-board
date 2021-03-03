const express = require('express')
const app = express() // damit bekommen wir eine Express-app - App ist hier eine Instanz - keine App wie wir sie können

app.use((req, res) => {
    console.log(req.method, req.url)
    res.end('Hello World')
})

app.listen(3000, ()=> { // unter welchem Port der Server gestartet werden soll
console.log('Server started at locoalhost:3000')
})