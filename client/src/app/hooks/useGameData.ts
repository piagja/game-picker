import { useEffect, useState } from 'react'
import { Game } from '../context/GameContext'

require('dotenv').config

/* O problema é que vai demorar muito para carregar */

export const useGamesData = () => {
  const [allGames, setAllGames] = useState<Game[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const RAWG_SECRET = process.env.NEXT_PUBLIC_RAWG_SECRET
    const fetchGames = async () => {
      const url = `https://api.rawg.io/api/games?key=${RAWG_SECRET}&page=${currentPage}`
      const response = await fetch(url)
      const data = await response.json()

      setAllGames(prevGames => [...prevGames, ...data.results])
      setCurrentPage(data.next ? currentPage + 1 : currentPage)
      setTotalPages(data.count / data.results.length)
    }
    fetchGames()
  }, [currentPage])

  return { allGames, totalPages }
}
