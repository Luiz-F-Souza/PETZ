import { LabelHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"


type Props = {
  children: ReactNode
} & LabelHTMLAttributes<HTMLLabelElement>


export const FormLabel = ({ children, className: newClassName, ...props }: Props) => {

  return (
    <label
      className={
        twMerge(
          ``,
          newClassName
        )
      }
      {...props}
    >
      {children}
    </label>
  )
}