import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: string | undefined
} & HTMLAttributes<HTMLParagraphElement>

export const ErrorFeedback = ({ children, className: newClassName, ...props }: Props) => {

  return (
    <p
      role="alert"
      aria-live='polite'
      className={
        twMerge(
          `
            text-primary-500
            font-semibold
            text-xs
            mt-2
          `,
          newClassName
        )}
      {...props}
    >
      {children}
    </p>
  )
}