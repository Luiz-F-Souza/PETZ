import { ButtonHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>
export const ButtonCTA = ({ children, className: newClassName, ...props }: Props) => {

  return (
    <button
      className={twMerge(
        `
        bg-primary-500 
        text-white font-bold
          px-4 py-[10px]
          rounded-full
        `,
        newClassName
      )}
      {...props}
    >
      {children}
    </button>
  )
}