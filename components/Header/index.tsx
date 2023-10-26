"use server"

import Link from "next/link"
import { PrimaryLink } from "../Buttons/PrimaryLink"
import { AnimatedLogo } from "components/AnimatedLogo"


export const Header: React.FC = () => {

  return (
    <header
      className="
      bg-white 
        px-5 sm:px-20 py-6
        flex justify-between items-center
      "
    >
      <AnimatedLogo />
      <nav data-testid='header-navbar'>
        <ul className="flex gap-8">
          <li>
            <Link data-testid="about-us-link" href="/quem-somos">Quem Somos</Link>
          </li>
          <li>
            <PrimaryLink data-testid="new-appointment-link" href="/agendar-consulta">
              Agendar Consulta
            </PrimaryLink>
          </li>
        </ul>
      </nav>

    </header>
  )
}
