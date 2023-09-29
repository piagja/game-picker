import axios from 'axios'
import { AiOutlineSearch } from 'react-icons/ai'
import { IGame, useGameContext } from '../context/GameContext'

export const SearchButton = () => {
  const { setGames, searchTerm, setSearchTerm } = useGameContext()

  const handleData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/games', [
        searchTerm
      ])

      const games: IGame[] = response.data

      setGames(null)
      setSearchTerm('')
      setGames(games)

      return games
    } catch (error) {
      console.error('Erro ao enviar a requisição: ', error)
    }
  }

  return (
    <div
      onClick={handleData}
      className='flex self-center cursor-pointer items-center justify-evenly bg-slate-800 mt-4 h-12 w-36 rounded-lg hover:bg-slate-600 hover:text-slate-300'
    >
      <p className='text-lg'>Pesquisar</p>
      <AiOutlineSearch size='2rem' />
    </div>
  )
}
