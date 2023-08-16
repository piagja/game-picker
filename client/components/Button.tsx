type ButtonProps = {
  onClick?: () => void
  className?: string
  children: React.ReactNode
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children
}) => {
  return (
    <button type='submit' className={className} onClick={onClick}>
      {children}
    </button>
  )
}
