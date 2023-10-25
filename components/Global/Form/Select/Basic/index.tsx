
import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { forwardRef } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useSelectBasicViewModel } from "./ViweModel"
import { SelectOptionsFormatType } from "types/generals"
import { useFormContext } from "react-hook-form"




type Props = {
  options: SelectOptionsFormatType
} & InputHTMLAttributes<HTMLInputElement>


export const SelectBasic = forwardRef<HTMLInputElement, Props>(({ options, className: newClassName, ...inputProps }, inputRef) => {

  const inputName = inputProps.name

  const {
    isOpen,
    handleCloseDropDown,
    handleOpenDropDown,
    handleKeyUp,
    handleMouseLeave,
    currentIndexToSelect,
    handleMouseEnter,
    handleSelectOption,
  } = useSelectBasicViewModel({ options, inputName })

  return (
    <div className="relative flex-grow"
      onBlur={handleCloseDropDown}
      onKeyUp={(e) => handleKeyUp(e)}
    >
      <div className={
        twMerge(
          `   
              flex items-center justify-between
              border-1 border-gray-300
              focus-within:border-gray-700
              transition-colors
              w-full
              h-11
              px-2
              rounded-lg
              ${isOpen ? "rounded-b-none border-b-0" : ""}
            `,
          newClassName
        )}
        onClick={handleOpenDropDown}
      >
        <input
          ref={inputRef}
          className="focus-within:outline-none flex-grow"
          {...inputProps}
        />

        <div>
          <BsChevronDown className={`${isOpen ? "rotate-180" : ""} transition-all`} />
        </div>
      </div>

      {isOpen &&
        <div
          role="group"
          className="
            bg-white 
              border-1 border-gray-700 
              rounded-b-md
              absolute z-50
              max-h-60 overflow-y-auto
              w-full
              shadow-md
             
              drop_down_element
            "
        >
          {options.map((currentOption, index) => {
            return (
              <button
                type="button"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => handleSelectOption(index)}
                className={`
                  text-sm text-gray-muted 
                  p-2
                  w-full
                  text-left
                  hover:bg-gray-300 hover:text-dark
                  ${currentIndexToSelect === index ? "text-dark bg-gray-300" : ""}
                  transition-colors
                `}
                role="option"
                aria-selected
                key={currentOption.id}
              >
                {currentOption.label}
              </button>
            )
          })}
        </div>}
    </div>

  )
})

SelectBasic.displayName = 'SelectBasic';