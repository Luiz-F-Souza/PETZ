
import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { forwardRef } from "react"



type Props = InputHTMLAttributes<HTMLInputElement>


export const InputBasic = forwardRef<HTMLInputElement, Props>(({ className: newClassName, ...props }, ref) => {

  return (
    <input
      readOnly
      ref={ref}
      className={
        twMerge(
          `
            px-2
            border-1 border-gray-300
            focus-within:border-gray-700
            transition-colors
            rounded-lg
            w-full
            h-11
          
          `,
          newClassName
        )
      }
      {...props}
    />

  )
})

InputBasic.displayName = 'InputBasic';