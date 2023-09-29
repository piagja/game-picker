'use client'

import React, { createContext, useContext, useState } from 'react'

interface ChildrenNode {
  children: React.ReactNode
}

interface DispatchGame {
  games: IGame[] | null
  setGames: React.Dispatch<React.SetStateAction<IGame[] | null>>

  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export interface IGame extends DispatchGame {
  id: number | null
  name: string
  platforms: { id: number; name: string }[]
  genres: { id: number; name: string }[]
  cover: { id: number; url: string }
  aggregated_rating: number | null
}

const GameContext = createContext<DispatchGame | undefined>(undefined)

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context) throw new Error('You must use GameContext with GameProvider')

  return context
}

export const GameProvider = ({ children }: ChildrenNode) => {
  const [games, setGames] = useState<IGame[] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <GameContext.Provider
      value={{ games, setGames, searchTerm, setSearchTerm }}
    >
      {children}
    </GameContext.Provider>
  )
}
