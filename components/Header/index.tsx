"use server"

import Image from "next/image"
import Logo from "../../public/images/white-pokeball.svg"
import Link from "next/link"
import { PrimaryLink } from "../Buttons/PrimaryLink"

export const Header: React.FC = () => {

  return (
    <header
      className="
      bg-white 
        px-20 py-6
        flex justify-between items-center
      "
    >

      <div
        className="
            w-64 h-14 
            bg-primary-500 
            rounded-full
            flex items-center
            gap-5
            px-3
          "
      >
        <Image
          src={Logo}
          width={37}
          height={34}
          alt="" />

        <h2 className="text-white font-semibold text-xl">Centro Pokémom</h2>
      </div>

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
