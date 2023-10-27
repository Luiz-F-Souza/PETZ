import { SelectOptionsFormatType } from "types/generals"
import { NewAppointmentFormType } from "."
import { KeyboardEvent } from "react"
import { FeedbackCardProps } from "../FeedbackCard"


export interface FormModelInterface {
  pokemonsFields: Record<"id", string>[]
  citiesOptions: SelectOptionsFormatType
  listOfPokemonsOptions: SelectOptionsFormatType
  currentValueToBillFromGenerationTax: number
  numberOfPokemonsToSchedule: number
  subtotalToPay: number
  totalToPay: number
  timesAvailables: SelectOptionsFormatType | undefined
  datesAvailables: SelectOptionsFormatType | undefined
  feedbackData: FeedbackCardProps | null

  handleAddPokemomField: () => void
  handleRemovePokemomField: (index: number) => void
  preventEnterFromFireSubmission: (e: KeyboardEvent<HTMLFormElement>) => void
  onSubmit: (data: NewAppointmentFormType) => void
  handleNewAppointment: () => void
}