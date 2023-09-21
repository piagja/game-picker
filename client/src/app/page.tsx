'use client'

import React, { useState } from 'react'
import { SearchButton } from '../../components/SearchButton'

import { GenresList, PlatformsList, RatingList, Button } from '../../components'
import Link from 'next/link'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(category)
    }
  }

  const renderByCategory = () => {
    switch (selectedCategory) {
      case 'platforms':
        return <PlatformsList />
      case 'genres':
        return <GenresList />
      case 'rating':
        return <RatingList />
      default:
        return null
    }
  }

  return (
    <main className='flex items-center flex-col'>
      <header className='flex flex-wrap justify-between px-10 w-full my-6'>
        <div className='max-sm:w-auto'>Logo</div>
        <nav className='max-sm:w-[100vw] max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-50 max-sm:bg-slate-800 max-sm:h-20 text-slate-100 lg:w-auto'>
          <ul className='flex justify-evenly items-center h-full list-none text-lg'>
            <Link href='#'>
              <li>Home</li>
            </Link>
            <Link href='#' className='sm:mx-10'>
              <li>About</li>
            </Link>
            <Link href='#'>
              <li>Docs</li>
            </Link>
          </ul>
        </nav>
      </header>
      <div className='hero mb-6'>
        <div className='text-center'>
          <p className='font-bold tracking-widest text-3xl'>Search Your Game</p>
        </div>
      </div>

      <section className='flex flex-col w-[100vw] items-center'>
        <div className='flex justify-center flex-wrap'>
          <Button
            value='platforms'
            className='bg-slate-800 h-12 w-32 flex-wrap rounded-lg hover:bg-slate-600 hover:text-slate-300'
            onClick={() => handleCategoryClick('platforms')}
          >
            Plataformas
          </Button>
          <Button
            value='genres'
            className='bg-slate-800 mx-3 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300'
            onClick={() => handleCategoryClick('genres')}
          >
            Gêneros/Temas
          </Button>
          <Button
            value='rating'
            className='bg-slate-800 h-12 w-32 rounded-lg hover:bg-slate-600 hover:text-slate-300'
            onClick={() => handleCategoryClick('rating')}
          >
            Avaliação
          </Button>
        </div>
      </section>

      <div className='flex flex-wrap justify-center my-7 sm:w-[100%]'>
        {renderByCategory()}
      </div>

      <SearchButton />

      {/* Stick choices */}
      <div></div>
    </main>
  )
}

export default Home
