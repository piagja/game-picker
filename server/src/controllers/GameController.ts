import { Request, Response } from 'express'
import { GameService } from '../services/GameService'
import { prisma } from '../../prisma/prisma'

const gameService = new GameService()

export class GameController {
  async fetchGames (req: Request, res: Response) {
    try {
      const games = await gameService.fetchAllGames()

      console.log('---- ANTES ----')

      // descomente o trecho abaixo para lançar os dados
      // no banco de dados mysql

      // await prisma.game.createMany({ data: games })

      console.log('---- DEPOIS ----')

      res.status(200).json(games)
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while fetching game: ' + error.message
      })
    }
  }

  async searchGame (req: Request, res: Response) {
    try {
      const { game } = req.query
      const foundGame = await gameService.searchGames(game as string)
      res.status(200).json({ foundGame })
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while searching the game' })
    }
  }
}
