'use client'

import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

export type Game = {
  id: number
  name: string
  background_image: string
}

type GameContextType = {
  games: Game[]
  addGame: (game: Game) => void
  shuffleGames: () => void
  setGames: Dispatch<SetStateAction<Game[]>>
  removeGame: (gameId: number) => void
}

type ChildrenProps = {
  children: React.ReactNode
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('UseGameContext must be used whithin GameProvider')
  }

  return context
}

export const GameProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([])

  const addGame = (game: Game) => {
    setGames(prevGames => {
      return [...prevGames, game]
    })
  }

  const removeGame = (gameId: number) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId))
  }

  const shuffleGames = () => {
    const shuffledGames = [...games].sort(() => Math.random() - 0.5)

    setGames(shuffledGames)
  }

  return (
    <GameContext.Provider
      value={{ games, addGame, shuffleGames, setGames, removeGame }}
    >
      {children}
    </GameContext.Provider>
  )
}
