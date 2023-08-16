/** inicio do freegames database */

// export const fetchData = async () => {
//   const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '7e30bcf5c9mshe1e2c49a68fc902p127476jsn5c5f9cbf7f78',
//       'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
//     }
//   }

//   try {
//     const response = await fetch(url, options)
//     const result = await response.json()
//     cl
//     return result
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error)
//       throw Error(error.message)
//     }
//   }
// }

/** fim do freegames database */

require('dotenv').config()

export const fetchData = async () => {
  const secret = process.env.NEXT_PUBLIC_RAWG_SECRET

  const url = `https://api.rawg.io/api/games?key=${secret}`

  const data = await fetch(url)
  const response = await data.json()

  return response
}
