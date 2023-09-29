import Image from 'next/image'
import { IGame, useGameContext } from '../context/GameContext'

export const GameCard = () => {
  const { games } = useGameContext()

  return (
    <div className='flex mt-20'>
      <div className='flex items-center justify-around w-full flex-wrap'>
        {games
          ? games.map(
              ({
                id,
                name,
                aggregated_rating,
                cover,
                genres,
                platforms
              }: IGame) => {
                return (
                  <div
                    className='flex flex-col mx-9 items-center justify-around my-6 w-[250px] bg-slate-950 rounded-lg transition max-sm:h-auto hover:ring-4 hover:scale-105'
                    key={id}
                  >
                    <div className='rounded-md '>
                      {cover && cover.url ? (
                        <Image
                          src={`https:${cover.url.replace(
                            't_thumb',
                            't_720p'
                          )}`}
                          alt={name}
                          height={200}
                          width={200}
                          className='rounded-md w-full'
                        />
                      ) : (
                        <div className='text-center mt-4 text-2xl'>
                          [Sem Imagem]
                        </div>
                      )}
                    </div>

                    <div className='my-4 mx-5 w-56'>
                      <p>
                        <span className='text-blue-400'>Nome:</span> {name}
                      </p>
                      <p>
                        <span className='text-blue-400'>Gêneros:</span>{' '}
                        {genres && genres.map(g => g.name).join(', ')}
                      </p>
                      <p className='w-full'>
                        <span className='text-blue-400'>Plataformas:</span>{' '}
                        {platforms && platforms.map(p => p.name).join(', ')}
                      </p>
                      <p>
                        <span className='text-blue-400'>Nota:</span>{' '}
                        {aggregated_rating ? (
                          aggregated_rating.toFixed(0)
                        ) : (
                          <span className='text-red-500'>
                            Nota não disponível
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )
              }
            )
          : ''}
      </div>
    </div>
  )
}
