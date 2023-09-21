import { Button } from './Button'

import { useFilters } from '../context/FilterContext'

export const PlatformsList = () => {
  const { selectedFilters, setSelectedFilters } = useFilters()

  const handlePlatforms = (platform: string) => {
    const isPlatformSelected = selectedFilters.platform.includes(platform)
    setSelectedFilters(prevFilters => {
      return {
        ...prevFilters,
        platform: isPlatformSelected
          ? prevFilters.platform.filter(p => p !== platform)
          : [...prevFilters.platform, platform]
      }
    })
  }

  return (
    <div className='flex flex-col flex-wrap h-[100%] items-center justify-between md:flex-row sm:w-[70svh] sm:justify-evenly'>
      <Button
        value='pc'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handlePlatforms(e.target.value)}
      >
        PC (Windows)
      </Button>
      <Button
        value='ps5'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handlePlatforms(e.target.value)}
      >
        Playstation 5
      </Button>
      <Button
        value='ps4'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handlePlatforms(e.target.value)}
      >
        Playstation 4
      </Button>
      <Button
        value='xone'
        className='bg-slate-800 mb-2 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300 lg:mb-0 max-lg:w-[16rem]'
        onClick={e => handlePlatforms(e.target.value)}
      >
        Xbox One
      </Button>
    </div>
  )
}
