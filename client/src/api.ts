import axios from 'axios'
import { IGame, useGameContext } from '../context/GameContext'

export async function handleApi (
  searchTerm: string,
  selectedOption: string,
  setGames: (games: IGame[] | null) => void,
  setSearchTerm: (searchTerm: string) => void,
  setIsLoading: (value: boolean) => void
) {
  try {
    setIsLoading(true)
    const response = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT as string,
      {
        searchTerm,
        selectedOption
      }
    )

    const games: IGame[] = response.data

    setIsLoading(false)

    setGames(null)
    setSearchTerm('')
    setGames(games)

    return games
  } catch (error) {
    console.error('Erro ao enviar a requisição: ', error)
    setIsLoading(false)
    throw error
  }
}
