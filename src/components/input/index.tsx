interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = ({label, className, ...props}: InputProps) => {
  return (
    <input
      className={`
          w-full
          p-4
          bg-transparent
          border 
          border-transparent
          rounded-xl
          text-gray-50
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-transparent
          focus:border-gray-25
          placeholder:text-gray-500
          ${className}
        `}
      {...props}
    />
  )
}

export default Input
