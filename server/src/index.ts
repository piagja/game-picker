import express from 'express'
import cors from 'cors'

require('dotenv').config()

import { GameController } from './controllers/GameController'

const app = express()
const gameController = new GameController()
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(express.json())
app.use(cors(corsOptions))

console.log(process.env.API_PORT)

app.post('/games', gameController.fetchGames)

app.listen(process.env.API_PORT, () => {
  console.info(`Server running on port ${process.env.API_PORT}`)
})
