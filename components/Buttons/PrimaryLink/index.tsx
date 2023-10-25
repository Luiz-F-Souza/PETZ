"use Server"

import Link from "next/link"
import { AnchorHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  children: ReactNode,
  href: string,
} & AnchorHTMLAttributes<HTMLAnchorElement>
export const PrimaryLink = ({ children, className: newClassName, href, ...props }: Props) => {

  return (
    <Link
      href={href}
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
    </Link>
  )
}