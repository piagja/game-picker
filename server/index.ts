import express, { Request, Response } from 'express'
import axios from 'axios'
import { Game, PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const API_KEY = process.env.RAWG_SECRET

app.use(express.json())

app.get('/fetch-games', async (req: Request, res: Response) => {
  try {
    const gamesResponse = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=3`
    )

    const games = gamesResponse.data.results
    const gamesToCreate = games.map((game: Game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      slug: game.slug
    }))

    await prisma.game.createMany({ data: gamesToCreate })

    res.json({
      message: 'Games saved successfully!'
    })
  } catch (err: any) {
    if (err) {
      if (err.code === 'P2002') {
        res.status(400).json({
          error: 'Duplicate entry',
          message: 'A game with the same slug or ID already exists.'
        })
      }

      res.status(500).json({
        error: 'An error occurred while fetch data: ',
        err
      })
    }
  }
})

app.get('/search-games', async (req: Request, res: Response) => {
  const { query } = req.query

  try {
    const games = await prisma.game.findMany({
      where: {
        name: {
          contains: query as string
        }
      }
    })

    res.json({ games })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      res.status(500).json({
        error: 'An error occurred while fetch data: ',
        err
      })
    }
  }
})

app.listen(process.env.API_PORT, () => {
  console.info(`Server running on port ${process.env.API_PORT}`)
})
