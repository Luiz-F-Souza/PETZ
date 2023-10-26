import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatedLogoModel } from "./AnimatedLogoModel"

export const useAnimatedLogoViewModel = (): AnimatedLogoModel => {
  const pathName = usePathname()

  const isAtHome = pathName === '/'

  const [isLogoOpen, setIsLogoOpen] = useState(isAtHome)

  useEffect(() => {
    if (!isAtHome) return
    const timeout = setTimeout(() => {

      setIsLogoOpen(false)

      return () => {
        clearTimeout(timeout)
      }
    }, 5000);
  }, [isAtHome])

  const handleMouseEnter = () => {
    setIsLogoOpen(true)
  }
  
  const handleMouseLeave = () => {
    setIsLogoOpen(false)
  }

  return {
    handleMouseEnter,
    handleMouseLeave,
    isLogoOpen
  }
}