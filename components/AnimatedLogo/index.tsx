import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/images/white-pokeball.svg"
import { useAnimatedLogoViewModel } from "./useAnimatedLogoViewModel"

export const AnimatedLogo = () => {

  const { handleMouseEnter, handleMouseLeave, isLogoOpen } = useAnimatedLogoViewModel()

  return (
    <Link
      href='/'
      data-testid="logo-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        ${isLogoOpen ? "w-64" : "w-14"} h-14 
        transition-all
        hover:w-64
        overflow-hidden
        duration-700
        bg-primary-500 
        rounded-full
        flex items-center
        gap-5
        px-3
        group
      `}
    >
      <Image
        src={Logo}
        width={36}
        height={36}
        alt=""
        className="w-9 h-9 group-hover:rotate-180 transition-all"
      />

      <h1
        className={`text-white font-semibold text-xl ${isLogoOpen ? "" : "w-0"} transition-all whitespace-nowrap `}
        data-testid="company-name"
      >
        Centro Pokémom
      </h1>
    </Link>
  )
}