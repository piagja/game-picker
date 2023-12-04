import { Request, Response } from 'express'
import { GameService } from '../services/GameService'

const gameService = new GameService()

export class GameController {
  async fetchGames (req: Request, res: Response) {
    try {
      const { searchTerm, selectedOption } = req.body

      const games = await gameService.fetchAllGames(searchTerm, selectedOption)
      // descomente o trecho abaixo para lançar os dados
      // no banco de dados mysql

      // await prisma.game.createMany({ data: games })

      res.status(200).json(games)
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while fetching game: ' + error.message
      })
    }
  }
}
