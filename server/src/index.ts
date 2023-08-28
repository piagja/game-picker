import express, { Response } from 'express'

import { GameController } from './controllers/GameController'

const app = express()
const gameController = new GameController()

app.use(express.json())

app.post('/fetch-games', gameController.fetchGames)
app.get('/search-game', gameController.searchGame)

app.listen(process.env.API_PORT, () => {
  console.info(`Server running on port ${process.env.API_PORT}`)
})
