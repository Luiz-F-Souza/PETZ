/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { LinkTree } from './index'



const indexes = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Page 01',
    link: '/page-01'
  },
  {
    name: 'Page 02'
  }
]

describe('LinkTree Component', () => {

  it('should have correct indexes on screen', () => {
    render(<LinkTree indexes={indexes} />)

    const allItems = screen.getAllByTestId("link-tree-item")

    const itemsQty = allItems.length

    expect(itemsQty).toBe(3)

    allItems.forEach((item, index) => {
      expect(item.innerHTML).toBe(indexes[index].name)

      const currentHref = item.attributes.getNamedItem('href')?.value

      if (itemsQty !== index + 1) expect(currentHref).toBe(indexes[index].link)

      else expect(currentHref).toBeUndefined()
    })

  })


})