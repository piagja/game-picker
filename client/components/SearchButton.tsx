import { AiOutlineSearch } from 'react-icons/ai'

export const SearchButton = () => {
  return (
    <div className='flex cursor-pointer items-center justify-evenly bg-slate-800 h-12 w-36 rounded-lg hover:bg-slate-600 hover:text-slate-300'>
      <p className='text-lg'>Pesquisar</p>
      <AiOutlineSearch size='2rem' />
    </div>
  )
}
