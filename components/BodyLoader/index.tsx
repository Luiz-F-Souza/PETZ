"use server"

import Image from "next/image"
import Logo from 'public/images/white-pokeball.svg'
import { BodyOverlay } from 'components/BodyOverlay'




export const BodyLoader = () => {

  return (
    <>
      <div className='bg-primary-500 p-4 rounded-full'>
        <Image src={Logo} width={80} height={80} alt="" className='animate-pulse duration-75 w-20 h-20' />
      </div>
      <BodyOverlay />
    </>

  )
}