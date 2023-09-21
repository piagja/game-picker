type ButtonProps = {
  onClick?: (...args: any) => void
  className?: string
  children: React.ReactNode
  value: string
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  value
}) => {
  return (
    <button type='submit' className={className} onClick={onClick} value={value}>
      {children}
    </button>
  )
}
