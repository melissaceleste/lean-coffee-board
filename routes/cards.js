const express = require('express')
const Card = require('../models/Card') // import des Models Card aus Card.js
const router = express.Router()

router.get('/', async (req, res, next) => {
  // hiermit lassen wir uns die /api/card anzeigen
  res.json(await Card.find().populate('author').catch(next)) // ist das gleiche wie Card.find().then(card=> res.json(card))
})

router.get('/:id', async (req, res, next) => {
  // hiermit lassen wir uns die jeweiligen Card mit der entsprechenden ID (die wir einfügen) anzeigen lassen
  const { id } = req.params
  res.json(await Card.findById({ id }).populate('author').catch(next))
})

router.post('/', async (req, res, next) => {
  // hiermit können wir neue Card hinzufügen
  //   const newCard = { ...req.body, id: uuidv4() }
  //   card.push(newCard)
  res.json(await Card.create(req.body).catch(next))
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  //   const index = card.findIndex(Card => Card.id === id)
  //   card = [...card i .slice(0, index), ...card.slice(index + 1)]
  res.json(await Card.findByIdAndDelete({ id }).catch(next))
})

router.patch('/:id/vote', async (req, res, next) => {
  const { id } = req.params
  res.json(
    await Card.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(next)
  )
})

module.exports = router
