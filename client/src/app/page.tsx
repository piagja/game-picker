'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from './assets/logo.png'

import { SearchButton } from '../../components/SearchButton'
import { useGameContext } from '../../context/GameContext'
import { Input } from '../../components'
import { GameCard } from '../../components/Card'
import { DropdownQty } from '../../components/DropdownQty'
import { handleApi } from '@/api'

const Home = () => {
  const {
    setGames,
    searchTerm,
    setSearchTerm,
    selectedOption,
    setSelectedOption,
    setIsLoading,
    isLoading
  } = useGameContext()

  console.log(isLoading)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    try {
      if (event.code === 'Enter') {
        await handleApi(
          searchTerm,
          selectedOption,
          setGames,
          setSearchTerm,
          setIsLoading
        )
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) throw new Error(error.message)
    }
  }

  return (
    <main>
      <header className='flex items-start flex-wrap justify-between px-10 w-full my-6'>
        <div className='max-sm:mx-auto max-sm:w-[80px] max-lg:w-[120px]'>
          <Image
            src={logo}
            width={150}
            height={150}
            alt='Um logotipo da aplicação que parece duas folhas numa cor azul meio pálido que simulam asas'
          />
        </div>
        <nav className='max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-50 max-sm:bg-slate-800 max-sm:h-20 max-md:rounded-t-sm text-slate-100 lg:w-auto'>
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
      <div className='flex flex-col'>
        <div className='text-center'>
          <p className='max-sm:text-xl mb-2 font-bold tracking-widest text-3xl'>
            Procure o seu jogo
          </p>
          <Input
            type='text'
            name='search'
            id='search'
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyPress(e)}
            value={searchTerm}
            className='placeholder:pl-2 placeholder:text-xl bg-gray-100 my-3 text-gray-600 py-3 rounded-md w-[80vw]'
            placeholder='Pesquise pelo nome do jogo'
          />
        </div>
        <DropdownQty
          selectedOption={selectedOption}
          onSelectOption={handleOptionChange}
        />

        <SearchButton />
      </div>

      {isLoading ? (
        <div className='animate-spin m-auto mt-20 rounded-full h-24 w-24 border-t-sky-400 border-t-2'></div>
      ) : (
        <div className='w-full max-md:mb-20'>
          <div>
            <GameCard />
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
