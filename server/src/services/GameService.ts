import fs from 'fs'
import axios from 'axios'

import { prisma } from './../../prisma/prisma'

type Game = {
  id: number
  name: string
  cover: string
  slug: string
  platforms: {
    id: number
    name: string
  }[]
  first_release_date: string
}

export class GameService {
  private accessToken: string | undefined = process.env.TWITCH_ACCESS_TOKEN
  private clientId: string | undefined = process.env.TWITCH_ID
  private baseURL: string = 'https://api.igdb.com/v4'
  private platforms: string = 'platforms = (6, 12, 48, 49, 130, 167)'
  private batchSize = 500
  private allGames: Game[] = []

  async fetchAllGames (): Promise<Game[]> {
    let offset = 0
    const timestamp = 1357023600000 // Unix Time Stamp correspondente 01/01/2013

    while (true) {
      const response = await axios.post(this.baseURL + '/games', null, {
        headers: {
          'Client-ID': this.clientId,
          Authorization: 'Bearer ' + this.accessToken
        },
        params: {
          fields: 'id,name,cover.url,slug,first_release_date,platforms.name',
          limit: this.batchSize,
          where: `(${this.platforms}) & (first_release_date >= ${timestamp})`,
          offset
        }
      })

      const games: Game[] = response.data

      if (games.length === 0) {
        break
      }

      this.allGames = this.allGames.concat(games)
      offset += this.batchSize

      console.log(offset)
    }

    const existingGameIds = await prisma.game.findMany({
      select: {
        id: true
      }
    })

    const gamesToSave: Game[] = this.allGames
      .map((game: Game) => {
        if (existingGameIds.some(existingGame => existingGame.id === game.id)) {
          return null
        } else {
          const gameCover = game.cover
            ? 'https:' + game.cover?.url.replace('/t_thumb/', '/t_720p/')
            : null

          return {
            id: game.id,
            name: game.name,
            cover: gameCover,
            slug: game.slug,
            first_release_date: game.first_release_date
              ? new Date(game.first_release_date * 1000).toLocaleDateString()
              : 'Sem histórico de lançamento',
            platforms: game.platforms
          }
        }
      })
      .filter((game: Game | null): game is Game => game !== null)

    this.exportDataToJson(gamesToSave)

    return gamesToSave
  }

  async exportDataToJson (data: Game[]) {
    try {
      const jsonData = JSON.stringify(data, null, 2)

      fs.writeFileSync('games.json', jsonData)

      console.log('Dados exportados para games.json')
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
    }
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
