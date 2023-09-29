'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from './assets/logo.png'

import { SearchButton } from '../../components/SearchButton'
import { useGameContext } from '../../context/GameContext'
import { Input } from '../../components'
import { GameCard } from '../../components/Card'

const Home = () => {
  const { searchTerm, setSearchTerm } = useGameContext()

  return (
    <main className='flex flex-col'>
      <header className='flex items-start flex-wrap justify-between px-10 w-full my-6'>
        <div className='max-sm:mx-auto max-sm:w-[80px] max-lg:w-[120px]'>
          <Image
            src={logo}
            width={150}
            height={150}
            alt='Um logotipo da aplicação que parece duas folhas numa cor azul meio pálido que simulam asas'
          />
        </div>
        <nav className='max-sm:w-[100vw] max-sm:sticky max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-50 max-sm:bg-slate-800 max-sm:h-20 text-slate-100 lg:w-auto'>
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
          <p className='max-sm:text-xl mb-2 font-bold tracking-widest text-3xl'></p>
          <Input
            type='text'
            name='search'
            id='search'
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            className='bg-gray-100 p-2 my-3 text-gray-800 rounded-md w-[32rem] max-lg:w-[400px] max-lg:h-[60px]'
            placeholder='Pesquise pelo nome do jogo'
          />
        </div>
        <SearchButton />
      </div>

      <div className='w-full'>
        <div>
          <GameCard />
        </div>
      </div>
    </main>
  )
}

export default Home
