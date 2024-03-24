import { MouseEventHandler } from "react";

export default function Button({
  className = "",
  onClick,
  children
}: {
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  children?: React.ReactNode
}) {
  return (
    <button 
      className={`
        text-black text-3xl font-bold px-10 py-2 rounded-full shadow-md shadow-black bg-white
        transition-all active:shadow-none active:translate-y-1 ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}