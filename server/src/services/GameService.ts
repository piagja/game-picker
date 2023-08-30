import { prisma } from './../../prisma/prisma'
import axios from 'axios'

export class GameService {
  private accessToken: string | undefined = process.env.TWITCH_ACCESS_TOKEN
  private clientId: string | undefined = process.env.TWITCH_ID
  private baseURL: string = 'https://api.igdb.com/v4'
  private platforms: string =
    'platforms = (6, 7, 8, 9, 48, 167, 19, 130, 137, 41, 11, 12, 49, 4)'
  private batchSize = 500

  async fetchAllGames () {
    let offset = 0
    let allGames: any[] = []

    while (true) {
      const response = await axios.post(this.baseURL + '/games', null, {
        headers: {
          'Client-ID': this.clientId,
          Authorization: 'Bearer ' + this.accessToken
        },
        params: {
          fields: 'id,name,cover.url,slug,platforms.name',
          limit: this.batchSize,
          where: this.platforms,
          offset
        }
      })

      const games = response.data

      if (games.length === 0) {
        break
      }

      allGames = allGames.concat(games)

      offset += this.batchSize

      console.log(offset)
    }

    const existingGameIds = await prisma.game.findMany({
      select: {
        id: true
      }
    })

    const gamesToSave = allGames
      .map((game: any) => {
        if (existingGameIds.some(existingGame => existingGame.id === game.id)) {
          return null
        } else {
          return {
            id: game.id,
            name: game.name,
            cover: game.cover?.url || null,
            slug: game.slug,
            platforms: game.platforms
          }
        }
      })
      .filter(Boolean)

    // const gamesToSave = allGames.filter((game: any) => {
    //   return !existingGameIds.some(existingGame => existingGame.id === game.id)
    // })

    return gamesToSave
  }

  async searchGames (query: string) {
    try {
      const findingGame = await prisma.game.findFirst({
        where: {
          name: {
            contains: query
          }
        },
        select: {
          id: true,
          name: true,
          cover: true,
          slug: true
        }
      })

      return findingGame
    } catch (error) {
      throw new Error('Error searching for the queried game')
    }
  }
}
