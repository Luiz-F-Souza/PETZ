"use server"

import Image from "next/image"
import Logo from 'public/images/white-pokeball.svg'
import { BodyOverlay } from 'components/BodyOverlay'
import { createPortal } from "react-dom"




export const BodyLoader = () => {

  return (
    <>
      {
        createPortal(
          (
            <>
              <div
                className='
                  fixed 
                  top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2 
                  bg-primary-500 
                  p-4 
                  rounded-full 
                  z-40
                '
              >
                <Image src={Logo} width={80} height={80} alt="" className='animate-pulse duration-75 w-20 h-20' />
              </div>
              <BodyOverlay />
            </>
          ), document.body
        )
      }
    </>

  )
}