"use server"

import Link from "next/link"
import { PrimaryLink } from "../Buttons/PrimaryLink"
import { usePathname } from 'next/navigation'
import { AnimatedLogo } from "components/AnimatedLogo"


export const Header: React.FC = () => {



  return (
    <header
      className="
      bg-white 
        px-20 py-6
        flex justify-between items-center
      "
    >
      <AnimatedLogo />
      <nav>
        <ul className="flex gap-8">
          <li>
            <Link href="/quem-somos">Quem Somos</Link>
          </li>
          <li>
            <PrimaryLink href="/agendar-consulta">
              Agendar Consulta
            </PrimaryLink>
          </li>
        </ul>
      </nav>

    </header>
  )
}
