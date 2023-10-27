import { CitiesByRegion, SelectOptionsFormatType } from "types/generals"
import { FormModelInterface } from "./FormModel"
import { useGetHigherGenerations } from "./_hooks/useGetHigherGeneration"
import { Control, useFieldArray, UseFormSetValue, UseFormGetValues, UseFormReset } from 'react-hook-form'
import { useEffect, KeyboardEvent, useState } from "react"
import { NewAppointmentFormType } from "."
import { ListOfPokemonsType } from "types/api"
import useSWR from "swr"
import { fetchAvailableDates } from "./_utils/fetchAvailableDates"
import { fetchAvailableTimes } from "./_utils/fetchAvailableTimes"
import CheckIconPath from 'public/check.svg'
import WarningIconPath from 'public/warning.svg'
import { FeedbackCardProps } from "../FeedbackCard"


const VALUE_TO_PAY_PER_POKEMOM = 70

type Props = {
  listOfPokemons: ListOfPokemonsType
  citiesByRegion: CitiesByRegion
  selectedDate: string
  control: Control<NewAppointmentFormType>

  getValues: UseFormGetValues<NewAppointmentFormType>
  setValue: UseFormSetValue<NewAppointmentFormType>
  resetForm: UseFormReset<NewAppointmentFormType>

}

export const useFormViewModel = (props: Props): FormModelInterface => {

  const { listOfPokemons, citiesByRegion, getValues, setValue, resetForm, control, selectedDate } = props

  const { data: datesAvailables } = useSWR<SelectOptionsFormatType>('/api/scheduling/date', fetchAvailableDates)

  const { data: timesAvailables } = useSWR<SelectOptionsFormatType>('/api/scheduling/time', () => fetchAvailableTimes(selectedDate))

  const {
    fields: pokemonsFields,
    append: appendIntoPokemonsFields,
    remove: removeFromPokemonsFields
  } = useFieldArray<NewAppointmentFormType>({
    control,
    name: 'pokemons'
  })

  const numberOfPokemonsToSchedule = pokemonsFields.length
  const subtotalToPay = numberOfPokemonsToSchedule * VALUE_TO_PAY_PER_POKEMOM

  const { higherGeneration } = useGetHigherGenerations({ team: pokemonsFields, listOfPokemons })
  const currentGenerationTax = higherGeneration * 0.03
  const isCurrentGenerationTaxHigherThanLimit = higherGeneration * 0.03 > 0.3

  const currentValueToBillFromGenerationTax =
    isCurrentGenerationTaxHigherThanLimit ?
      (0.3 * subtotalToPay) :
      currentGenerationTax * subtotalToPay



  const selectedRegion = getValues('region')

  const handleRemovePokemomField = (index: number) => {
    removeFromPokemonsFields(index)
  }

  const handleAddPokemomField = () => {

    if (numberOfPokemonsToSchedule === 6) return

    appendIntoPokemonsFields({
      name: ''
    })
  }

  useEffect(() => {
    setValue('city', '')
  }, [selectedRegion, setValue])

  const currentRegionCities = citiesByRegion[selectedRegion]

  const citiesOptions: SelectOptionsFormatType =
    currentRegionCities ?
      currentRegionCities.cities.map(city => {

        return {
          id: city.locationUrl,
          value: city.name,
          label: city.name
        }
      })
      : [{
        id: 'not-found',
        label: 'Primeiro, Selecione uma região',
        value: 'selecione-uma-regiao'
      }]

  const listOfPokemonsOptions: SelectOptionsFormatType = listOfPokemons.results.map(pokemom => {
    return {
      id: pokemom.url,
      label: pokemom.name,
      value: pokemom.name
    }
  })

  const preventEnterFromFireSubmission = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }



  const [feedbackData, setFeedbackData] = useState<FeedbackCardProps | null>(null)

  // Apenas para que todas as telas propostas no desafio sejam vistas
  const [shouldFakeSubmitError, setShoudFakeSubmitError] = useState(true)

  const onSubmit = async (data: NewAppointmentFormType) => {

    await new Promise((resolve) => setTimeout(resolve, 3000))

    try {

      if (shouldFakeSubmitError) {
        setShoudFakeSubmitError(false)
        throw new Error("Erro de conexão. Por favor, tente novamente")
      }

      const formattedTime = data.appointmentTime.replace(':', 'h') + 'm'
      const pokemonsQty = data.pokemons.length

      setFeedbackData({
        title: 'Consulta Agendada',
        message:
          `Seu agendamento para dia ${data.appointmentDate}, 
          às ${formattedTime}, para ${pokemonsQty}x pokémons foi realizado com sucesso!`,
        icon: CheckIconPath as string
      })

      resetForm()
      setShoudFakeSubmitError(true)
    }
    catch (err: any) {
      setFeedbackData({
        title: 'Houve um problema no agendamento',
        message: err.message ?? 'Ocorreu um erro inesperado',
        icon: WarningIconPath
      })
    }
  }

  const handleNewAppointment = () => setFeedbackData(null)

  return {
    citiesOptions,
    listOfPokemonsOptions,
    pokemonsFields,
    numberOfPokemonsToSchedule,
    subtotalToPay,
    datesAvailables,
    timesAvailables,
    feedbackData,

    currentValueToBillFromGenerationTax,

    handleAddPokemomField,
    handleRemovePokemomField,
    preventEnterFromFireSubmission,
    handleNewAppointment,
    onSubmit
  }
}