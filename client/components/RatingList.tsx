import { useFilters } from '../context/FilterContext'
import { Input } from './Input'
import { useState } from 'react'

export const RatingList = () => {
  const { selectedFilters, setSelectedFilters } = useFilters()
  const [rating, setRating] = useState({
    min: '',
    max: '',
    followers: ''
  })

  const handleRatings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRating(prevRating => ({
      ...prevRating,
      [name]: value
    }))

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      rating: {
        ...prevFilters.rating,
        [name]: value
      }
    }))
  }

  const inputStyle =
    'bg-gray-100 text-gray-800 rounded-md px-2 py-1 lg:mb-0 w-[16rem]'

  return (
    <div className='flex w-full flex-wrap items-center flex-col lg:flex-row lg:justify-center sm:items-center'>
      <div>
        <p>Nota Mínima</p>
        <Input
          id='minRating'
          name='min'
          type='number'
          value={rating.min}
          onChange={handleRatings}
          className={inputStyle}
        />
      </div>

      <div className='mx-4'>
        <p>Nota Máxima</p>
        <Input
          id='maxRating'
          name='max'
          type='number'
          value={rating.max}
          onChange={handleRatings}
          className={inputStyle}
        />
      </div>

      <div>
        <p>Minimo de Seguidores</p>
        <Input
          id='followers'
          name='followers'
          type='number'
          value={rating.followers}
          onChange={handleRatings}
          className={inputStyle}
        />
      </div>
    </div>
  )
}
