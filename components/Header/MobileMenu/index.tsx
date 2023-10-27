import { useState } from "react"
import { MobileMenuButton } from "../MobileMenuButton"
import { BodyOverlay } from "components/BodyOverlay"
import Link from "next/link"
import { PrimaryLink } from "components/Buttons/PrimaryLink"


export const MobileMenu = () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className="block sm:hidden">

        <MobileMenuButton isOpen={isOpen} handleToggle={handleToggle} />

        <nav className={`
          fixed z-40 
          top-0 bottom-0 
          right-0  
          bg-white
          shadow-xl
          transition-all
          px-4
          ${isOpen ? 'left-1/3' : 'left-full'}
        `}>
          <ul className="flex flex-col text-center gap-2 mt-20">
            <li>
              <Link onClick={handleToggle} className="block p-2" data-testid="about-us-mobile-link" href="/quem-somos">Quem Somos</Link>
            </li>
            <li>
              <PrimaryLink
                data-testid="new-appointment-mobile-link"
                href="/agendar-consulta"
                className="block"
                onClick={handleToggle}
              >
                Agendar Consulta
              </PrimaryLink>
            </li>
          </ul>
        </nav>


      </div>

      {isOpen && <BodyOverlay handleClose={handleClose} />}
    </>


  )
}