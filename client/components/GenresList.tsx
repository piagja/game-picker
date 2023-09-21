import { useFilters } from '../context/FilterContext'
import { Button } from './Button'

export const GenresList = () => {
  const { selectedFilters, setSelectedFilters } = useFilters()

  const handleGenres = (genre: string) => {
    const isGenreSelected = selectedFilters.genre.includes(genre)
    setSelectedFilters(prevFilters => {
      return {
        ...prevFilters,
        genre: isGenreSelected
          ? prevFilters.genre.filter(g => g !== genre)
          : [...prevFilters.genre, genre]
      }
    })
  }

  return (
    <div className='flex flex-col flex-wrap h-[100%] items-center justify-between md:flex-row sm:w-[70svh] sm:justify-evenly'>
      <Button
        value='role-playing-rpg'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handleGenres(e.target.value)}
      >
        RPG
      </Button>
      <Button
        value='adventure'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handleGenres(e.target.value)}
      >
        Aventura
      </Button>
      <Button
        value='strategy'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handleGenres(e.target.value)}
      >
        Estratégia
      </Button>
      <Button
        value='moba'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handleGenres(e.target.value)}
      >
        Moba
      </Button>
    </div>
  )
}
