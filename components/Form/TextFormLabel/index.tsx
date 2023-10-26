import { HTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"



type Props = {
  children: ReactNode
} & HTMLAttributes<HTMLParagraphElement>


export const TextFormLabel = ({children, className: newClassName, ...props}: Props) => {

  return(
    <p
      className={
        twMerge(
          `
            text-xs
            text-gray-700
            font-bold
            mb-2
          `,
          newClassName
        )
      }
    >
      {children}
    </p>
  )
}