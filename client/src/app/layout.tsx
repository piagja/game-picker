import './globals.css'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { GameProvider } from './context/GameContext'

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Game Picker',
  description: 'Bored? Randomize your game'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`
         ${jost.className} 
         w-full 
         min-h-screen 
         text-stone-200 
         bg-zinc-900
        `}
      >
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
