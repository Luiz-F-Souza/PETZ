import { SelectOptionsFormatType } from "types/generals"
import { NewAppointmentFormType } from "."
import { KeyboardEvent } from "react"


export interface FormModelInterface {
  pokemonsFields: Record<"id", string>[]
  citiesOptions: SelectOptionsFormatType
  listOfPokemonsOptions: SelectOptionsFormatType
  currentValueToBillFromGenerationTax: number
  numberOfPokemonsToSchedule: number,
  subtotalToPay: number

  handleAddPokemomField: () => void
  handleRemovePokemomField: (index: number) => void

  preventEnterFromFireSubmission: (e: KeyboardEvent<HTMLFormElement>) => void
  onSubmit: (data: NewAppointmentFormType) => void
}