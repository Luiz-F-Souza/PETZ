import { SchedulingTimesType } from "types/api"
import { SelectOptionsFormatType } from "types/generals"


export const fetchAvailableTimes = async (date: string) => {

  const response = await fetch('/api/scheduling/time', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      date: date
    })
  })

  const json = await response.json() as SchedulingTimesType

  const optionsTimes: SelectOptionsFormatType = json.map((time) => {

    const timeArray = time.split(":")
    const hour = timeArray[0]
    const minutes = timeArray[1]
    const hourAndMinute = `${hour}:${minutes}`

    return {
      label: hourAndMinute,
      value: time,
      id: time
    }
  })

  return optionsTimes
}