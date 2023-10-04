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

const Home = () => {
  const { searchTerm, setSearchTerm, selectedOption, setSelectedOption } =
    useGameContext()

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <main className=''>
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
          <p className='max-sm:text-xl mb-2 font-bold tracking-widest text-3xl'>
            Procure o seu jogo
          </p>
          <Input
            type='text'
            name='search'
            id='search'
            onChange={e => setSearchTerm(e.target.value)}
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

      <div className='w-full'>
        <div>
          <GameCard />
        </div>
      </div>
    </main>
  )
}

export default Home
