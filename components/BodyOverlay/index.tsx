
import { useEffect } from "react"
import { createPortal } from "react-dom"

// FOR IOS BLOCKING
const usePreventBodyScrolling = () => {
  useEffect(() => {

    const body = document?.body

    if (!body) return

    const bodyStyle = document.body.style

    bodyStyle.overflowY = 'hidden'


    const eventListener = (e: Event) => {
      e.preventDefault();
    }

    body.addEventListener('touchmove', eventListener)
    body.addEventListener("scroll", eventListener)

    return () => {
      bodyStyle.overflowY = 'auto'
      bodyStyle.position = 'inherit'

      removeEventListener('scroll', eventListener)
      removeEventListener('touchmove', eventListener)
    }
  })
}

type Props = {
  handleClose?: () => void
}

export const BodyOverlay = ({ handleClose }: Props) => {
  usePreventBodyScrolling()
  return (
    <>
      {createPortal((
        <div
          onClick={handleClose}
          role='status'
          className='
            fixed
            transition-all
            duration-200
            top-0 bottom-0
            left-0 right-0
            bg-gray-700/70
            backdrop-blur-sm
            z-30
            flex items-center justify-center
          '
        />

      ), document.body)}

    </>
  )
}