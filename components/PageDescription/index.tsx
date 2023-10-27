"use server"
import { LinkTree } from "components/LinkTree"
import Link from "next/link"
import { BsChevronRight } from 'react-icons/bs'

type Props = {
  title: string
  description: string
}

export const PageDescription = ({ title, description }: Props) => {

  return (
    <article
      className="
        bg-primary-500 
        pb-16 pt-8 
        px-5 sm:px-24
      "
    >

      <LinkTree indexes={[{ name: 'Home', link: '/' }, { name: title }]} />

      <section>
        <h2 className="text-white text-full mb-3 font-bold">{title}</h2>
        <h3 className="text-off-white">{description}</h3>
      </section>


    </article>
  )
}