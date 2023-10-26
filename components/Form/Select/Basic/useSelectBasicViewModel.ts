import { useState } from "react"
import { KeyboardEvent } from "react"
import { SelectOptionsFormatType } from "types/generals"
import { useFormContext } from "react-hook-form"
import { SelectBasicModel } from "./SelectBasicModel"


type Props = {
  options: SelectOptionsFormatType
  inputName: string | undefined
}

export const useSelectBasicViewModel = ({ options, inputName }: Props): SelectBasicModel => {

  const { clearErrors, setValue, getValues } = useFormContext()

  const [isOpen, setIsOpen] = useState(false)
  const [isMouseInside, setIsMouseInside] = useState(false)

  const [currentIndexToSelect, setCurrentIndexToSelect] = useState<number>(-1)

  const handleSelectOption = (index = currentIndexToSelect) => {

    if (!inputName) return

    setValue(inputName, options[index].label)
    clearErrors(inputName)
  }

  const handleValueValidOrInvalid = () => {
    if (!inputName) return
    const currentValue = getValues(inputName) as string

    const isSelectedValueValid = options.some(option => option.label === currentValue)

    if (!isSelectedValueValid) {
      setValue(inputName, '')
    }
  }

  const handleCloseDropDown = () => {
    setIsOpen(false)
    setCurrentIndexToSelect(-1)

    handleValueValidOrInvalid()
  }

  const handleOpenDropDown = () => setIsOpen(true)

  const amountOfOptions = options.length
  const lastItemIndex = amountOfOptions - 1

  const handleMouseLeave = () => setIsMouseInside(false)

  const handleMouseEnter = (index: number) => {
    setCurrentIndexToSelect(index)
    setIsMouseInside(true)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {

    const { key } = event
    const htmlElement = event.currentTarget as HTMLDivElement


    const handleArrowDown = () => {
      const shouldGoToFirstIndex = currentIndexToSelect === lastItemIndex
      const currentIndex = shouldGoToFirstIndex ? 0 : currentIndexToSelect + 1

      setCurrentIndexToSelect(currentIndex)
      clearErrors(inputName)
    }

    const handleArrowUp = () => {
      const shouldGoToLastIndex = currentIndexToSelect === 0
      const currentIndex = shouldGoToLastIndex ? lastItemIndex : currentIndexToSelect - 1

      setCurrentIndexToSelect(currentIndex)
      clearErrors(inputName)
    }

    switch (key) {

      case 'Escape':
        setIsOpen(false)
        htmlElement.blur()
        return
      case 'ArrowDown':
        if (isMouseInside) return
        handleArrowDown()
        return
      case 'ArrowUp':
        if (isMouseInside) return
        handleArrowUp()
        return
      case 'Enter':
        handleSelectOption()
        handleCloseDropDown()
        return
      default:
        return
    }
  }


  return {
    isOpen,
    handleCloseDropDown,
    handleOpenDropDown,
    handleKeyUp,
    currentIndexToSelect,
    handleMouseLeave,
    handleMouseEnter,
    handleSelectOption
  }
} 