import { AiOutlineSearch } from 'react-icons/ai'
import { useGameContext } from '../context/GameContext'
import { handleApi } from '@/api'

export const SearchButton = () => {
  const { setGames, searchTerm, setSearchTerm, selectedOption } =
    useGameContext()

  const handleData = async () => {
    try {
      await handleApi(searchTerm, selectedOption, setGames, setSearchTerm)
    } catch (error) {
      console.error('Erro ao enviar a requisição: ', error)
    }
  }

  return (
    <div
      onClick={handleData}
      className='flex self-center cursor-pointer items-center justify-evenly bg-slate-800 mt-4 h-12 w-36 rounded-lg hover:bg-slate-600 hover:text-slate-300 max-md:w-[200px] max-md:justify-around max-md:h-[60px] max-md:font-bold max-md:tracking-widest max-md:text-2xl'
    >
      <p className='text-lg'>Pesquisar</p>
      <AiOutlineSearch size='2rem' />
    </div>
  )
}
