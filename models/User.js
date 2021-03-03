const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
  },
  { versionKey: false }
) // haben wir gemacht, damit nicht immer __v angezeigt wird. Ist nicht notwendig, sieht nur schöner aus

module.exports = mongoose.model('User', userSchema)
