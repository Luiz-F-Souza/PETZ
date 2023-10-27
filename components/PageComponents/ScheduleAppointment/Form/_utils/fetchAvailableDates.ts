import { SchedulingDatesType } from "types/api"
import { SelectOptionsFormatType } from "types/generals"


export const fetchAvailableDates = async () => {

  const response = await fetch('/api/scheduling/date')

  const json = await response.json() as SchedulingDatesType

  const optionsDates: SelectOptionsFormatType = json.map((date) => {
    return {
      label: date,
      value: date,
      id: date
    }
  })

  return optionsDates
}