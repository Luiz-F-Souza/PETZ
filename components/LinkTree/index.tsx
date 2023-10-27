import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"


type Props = {
  indexes: {
    name: string,
    link?: string
  }[]
}

export const LinkTree = ({ indexes }: Props) => {

  const indexesQty = indexes.length

  return (
    <aside>
      <ul className="text-off-white flex items-center gap-2 mb-3">
        {
          indexes.map(((current, index) => {

            const isLastIndex = indexesQty === index + 1
            const currentLink = current.link ?? "/"

            return (
              <li key={current.name} className="flex items-center gap-2">
                {
                  !isLastIndex && (
                    <>
                      <Link
                        href={currentLink}
                        className="w-full h-full"
                        data-testid="link-tree-item"
                      >
                        {current.name}
                      </Link>
                      <BsChevronRight />
                    </>
                  )
                }

                {isLastIndex && <p data-testid="link-tree-item">{current.name}</p>}

              </li>
            )
          }))
        }
      </ul>
    </aside>
  )
}