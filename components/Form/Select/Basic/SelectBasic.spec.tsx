/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { SelectBasic } from './index'
import { SelectOptionsFormatType } from 'types/generals'
import { FormProvider, useForm } from 'react-hook-form'

const options: SelectOptionsFormatType = [
  { id: "1", label: 'john', value: 'john' },
  { id: "2", label: "doe", value: "doe" }
]

const ComponentUnderTest = () => {
  const methods = useForm<{ name: string }>()

  return (
    <FormProvider {...methods}>
      <SelectBasic data-testid="custom-select" options={options} {...methods.register("name")} />
    </FormProvider>
  )
}

describe('Select Basic', () => {

  it('should show all options', () => {


    render(<ComponentUnderTest />)

    const selectElement = screen.getByTestId("custom-select")

    fireEvent.click(selectElement)

    const johnOption = screen.getByText('john')
    expect(johnOption).toBeVisible()

    const doeOption = screen.getByText('doe')
    expect(doeOption).toBeVisible()

  })

  it('should be able to select item on MouseDown', () => {
    render(<ComponentUnderTest />)

    const selectElement = screen.getByTestId("custom-select") as HTMLInputElement
    fireEvent.click(selectElement)

    const doeOption = screen.getByText('doe')


    fireEvent.mouseDown(doeOption)

    expect(selectElement.value).toBe('doe')
  })

  it('should NOT select item with value that is not in options', () => {
    render(<ComponentUnderTest />)

    const selectElement = screen.getByTestId("custom-select") as HTMLInputElement
    fireEvent.click(selectElement)

    fireEvent.keyUp(selectElement, { key: 'L' })
    fireEvent.keyUp(selectElement, { key: 'u' })
    fireEvent.keyUp(selectElement, { key: 'i' })
    fireEvent.keyUp(selectElement, { key: 'z' })

    fireEvent.blur(selectElement)

    expect(selectElement.value).not.toBe('Luiz')
  })

  it('should be able to select item with arrows and enter', () => {
    render(<ComponentUnderTest />)

    const selectElement = screen.getByTestId("custom-select") as HTMLInputElement
    fireEvent.click(selectElement)

    const doeOption = screen.getByText('doe')


    fireEvent.keyUp(selectElement, { key: 'ArrowDown' })
    fireEvent.keyUp(selectElement, { key: 'ArrowDown' })
    fireEvent.keyUp(selectElement, { key: 'Enter' })

    expect(selectElement.value).toBe('doe')
  })



})