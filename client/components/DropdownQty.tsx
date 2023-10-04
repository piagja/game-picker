import react from 'react'

interface DropdownQtyProps {
  selectedOption: string // Define o tipo de selectedOption como string
  onSelectOption: (option: string) => void // Define o tipo de onSelectOption como uma função que recebe uma string como argumento e não retorna nada
}

export const DropdownQty: React.FC<DropdownQtyProps> = ({
  selectedOption,
  onSelectOption
}) => {
  const options = ['10', '20', '30', '40', '50']

  return (
    <div className='self-center mt-10 flex flex-col items-center'>
      <p className='text-lg'>Selecione o número de resultados</p>
      <select
        value={selectedOption}
        onChange={e => onSelectOption(e.target.value)}
        className='text-slate-800 h-10 my-3 rounded-lg'
      >
        {options.map(opt => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        })}
      </select>
    </div>
  )
}
