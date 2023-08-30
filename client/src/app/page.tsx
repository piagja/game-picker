'use client'

import React, { KeyboardEvent, useEffect, useState } from 'react'

import Image from 'next/image'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useGameContext, Game } from './context/GameContext'
import { capitalize } from './helpers/capitalize'
import { allGames } from './api'

const Home = () => {
  const { addGame, shuffleGames, games, setGames, removeGame } =
    useGameContext()

  const [gameName, setGameName] = useState('')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const [gameData, setGameData] = useState<Game[]>([])

  useEffect(() => {
    const fetcher = async () => {
      console.log(allGames)
    }

    fetcher()
  }, [games])

  const filterGame = (gameName: string) => {
    const filteredGame = gameData.find(game =>
      game.name.toLowerCase().includes(gameName.toLowerCase())
    )

    return filteredGame
  }

  const handleAddGames = () => {
    if (gameName.trim() !== '') {
      const filteredGame = filterGame(gameName)

      if (filteredGame) {
        addGame(filteredGame)
        setGameName('')
      }
    }
  }

  const selectRandomGame = () => {
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length)

      setSelectedGame(games[randomIndex])
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key

    if (key === 'Enter') {
      return handleAddGames()
    }
  }

  return (
    <main className=''>
      <nav className='flex justify-around items-center'>
        <div>
          <h1 className='text-4xl m-8'>Logo</h1>
        </div>

        <div>
          <Button className='bg-white h-9 w-24 text-base font-bold text-gray-950 tracking-widest rounded-2xl'>
            About
          </Button>
        </div>
      </nav>

      <section className='text-center mt-10 text-3xl font-bold tracking-tighter'>
        <div>Try it in action</div>
      </section>

      <section className='flex flex-wrap justify-center gap-6 mt-14'>
        <div>
          <div className='gap-4 flex flex-col p-4 rounded-xl justify-around h-[420px] w-[380px] bg-neutral-700'>
            <div>
              <h2 className='text-2xl tracking-widest font-bold mb-4 text-center'>
                Let&apos;s try
              </h2>
              <small className='text-base tracking-wider'>
                Type the games in the input below then click Add Game or press
                &quot;Enter&quot;
              </small>
            </div>

            <div>
              <Input
                type='input'
                placeholder='Grand Theft Auto, Bioshock, Half-Life ...'
                className='bg-transparent outline-1 outline-offset-1 outline-neutral-400 outline w-full h-10 rounded-sm p-2 text-slate-200 focus:ring-4 ring-indigo-500 transition-all'
                onChange={e => setGameName(e.target.value)}
                value={gameName}
                onKeyDown={(e: KeyboardEvent) => handleKeyPress(e)}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault()
                  handleAddGames()
                }}
              />
            </div>

            <div className='flex justify-evenly gap-3 my-4'>
              <Button
                onClick={() => setGameName('')}
                className='p-2 rounded-xl ring-2 ring-gray-600 hover:-translate-y-2 hover:scale-108 hover:bg-indigo-500 duration-300 hover:font-semibold'
              >
                Clear Inputs
              </Button>
              <Button
                onClick={() => {
                  setGames([])
                  setSelectedGame(null)
                }}
                className='p-2 rounded-xl ring-2 ring-gray-600 hover:-translate-y-2 outline-none hover:scale-108 hover:bg-indigo-500 duration-300 hover:font-semibold'
              >
                Clear Game List
              </Button>
              <Button
                className='p-2 rounded-xl ring-2 ring-gray-600 hover:-translate-y-2 hover:scale-108 hover:bg-indigo-500 duration-300 hover:font-semibold'
                onClick={shuffleGames}
              >
                Randomizer
              </Button>
              <Button
                className='p-2 rounded-xl ring-2 ring-gray-600 hover:-translate-y-2 hover:scale-108 hover:bg-indigo-500 duration-200 hover:font-semibold'
                onClick={selectRandomGame}
              >
                Pick One
              </Button>
            </div>

            {selectedGame && (
              <p className='text-xl text-green-400'>
                Picked Game:
                <span className='text-xl text-amber-400 mr-2'>
                  {'  ' + capitalize(selectedGame.name)}
                </span>
                <span
                  className='text-red-500 text-2xl cursor-pointer'
                  onClick={() => setSelectedGame(null)}
                  about='Erase picked game'
                >
                  X
                </span>
              </p>
            )}

            <Button
              onClick={handleAddGames}
              className='bg-indigo-500 h-10 rounded-md text-base font-semibold tracking-widest'
            >
              Add Game
            </Button>
          </div>

          <div className='p-4 gap-4 w-[380px] h-[162px] mt-10 bg-neutral-700 rounded-xl flex flex-col'>
            <h1 className='text-xl'>How does it work?</h1>

            <p className='text-base font-light leading-7'>
              Check out how our service works. You can choose 1, 2, or more
              games, shuffle them, randomly pick one or remove a game from list.
            </p>
          </div>
        </div>

        <div className='grid flex-wrap grid-cols-3 grid-flow-row grid-rows-6 gap-4 max-[450px]:flex flex-col mb-T'>
          {games &&
            games.map(game => {
              return (
                <div
                  key={game.id}
                  className='flex flex-col justify-center rounded-xl bg-zinc-700'
                >
                  <Image
                    src={game.background_image}
                    width={300}
                    height={300}
                    alt={game.name}
                    className='w-auto max-w-fit rounded-t-lg'
                  />
                  <div className='flex justify-around hover:shadow-slate-100'>
                    <p className='p-2 overflow-hidden text-xl font-bold tracking-widest text-neutral-300'>
                      {game.name}
                    </p>
                  </div>

                  <button
                    onClick={() => removeGame(game.id)}
                    className='p-2 text-red-500 cursor-pointer font-semibold tracking-tighter'
                  >
                    Remove
                  </button>
                </div>
              )
            })}
        </div>
      </section>
    </main>
  )
}

export default Home
