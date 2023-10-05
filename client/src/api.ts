import axios from 'axios'
import { IGame } from '../context/GameContext'

export async function handleApi (
  searchTerm: string,
  selectedOption: string,
  setGames: (games: IGame[] | null) => void,
  setSearchTerm: (searchTerm: string) => void
) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT as string,
      {
        searchTerm,
        selectedOption
      }
    )

    const games: IGame[] = response.data

    setGames(null)
    setSearchTerm('')
    setGames(games)

    return games
  } catch (error) {
    console.error('Erro ao enviar a requisição: ', error)
    throw error
  }
}
