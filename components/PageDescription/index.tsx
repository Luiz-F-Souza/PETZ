"use server"
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
      {/* COMPONENTE PRÓPRIO */}
      <aside>
        <ul className="text-off-white flex items-center gap-2 mb-3">
          <li className="flex items-center gap-2">
            <Link href="/">Home</Link>
            <BsChevronRight />
          </li>
          <li>
            <p>{title}</p>
          </li>
        </ul>
      </aside>
      <section>
        <h2 className="text-white text-full mb-3 font-bold">{title}</h2>
        <h3 className="text-off-white">{description}</h3>
      </section>


    </article>
  )
}