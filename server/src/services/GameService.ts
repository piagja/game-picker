import axios, { AxiosResponse } from 'axios'

interface Platform {
  id: number
  name: string
}

type Game = {
  id: number
  name: string
  cover: {
    url: string
  }
  slug: string
  platforms: Platform[]
  first_release_date: string
  genre: string[]
  aggregated_rating: number
}

export class GameService {
  private accessToken: string | undefined = process.env.TWITCH_ACCESS_TOKEN
  private clientId: string | undefined = process.env.TWITCH_ID
  private baseURL: string = 'https://api.igdb.com/v4'
  private batchSize = 20

  async fetchAllGames (searchTerm: string): Promise<Game[]> {
    try {
      const generateBaseField =
        'id,name,platforms.name,genres.name,cover.url,aggregated_rating'
      const applySearch = searchTerm ? `search "${searchTerm}";` : ''

      const applyFilters = `${generateBaseField}; ${applySearch}`

      const response: AxiosResponse<Game[]> = await axios.post(
        this.baseURL + '/games',
        null,
        {
          headers: {
            'Client-ID': this.clientId!,
            Authorization: 'Bearer ' + this.accessToken
          },
          params: {
            fields: `${applyFilters}`,
            limit: this.batchSize
          }
        }
      )

      const games: Game[] = response.data

      return games
    } catch (error) {
      console.log('A aplicação retornou um erro: ' + error)
      throw new Error(error)
    }
  }
}
