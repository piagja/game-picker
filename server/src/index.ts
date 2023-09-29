import express, { Response, Request } from 'express'
import cors from 'cors'

require('dotenv').config()

import { GameController } from './controllers/GameController'

const app = express()
const gameController = new GameController()
// const corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }

app.use(cors())
app.use(express.json())

console.log(process.env.API_PORT)

app.get('/', (req: Request, res: Response) => {
  return res.json({
    status: 'Ok',
    message: 'Bem vindo!'
  })
})
app.post('/games', gameController.fetchGames)

app.listen(process.env.API_PORT, () => {
  console.info(`Server running on port ${process.env.API_PORT}`)
})
