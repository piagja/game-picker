type InputProps = {
  id?: string
  name?: string
  className?: string
  type?: string
  placeholder?: string
  value?: string | string[] | [] | undefined
  onChange?: (value: any) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  className,
  placeholder,
  onChange,
  value,
  onKeyDown,
  onSubmit
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      id={id}
      name={name}
    />
  )
}
