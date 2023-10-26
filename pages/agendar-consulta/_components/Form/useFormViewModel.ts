import { CitiesByRegion, SelectOptionsFormatType } from "types/generals"
import { FormModelInterface } from "./FormModel"
import { useGetHigherGenerations } from "./hooks/useGetHigherGeneration"
import { Control, useFieldArray, UseFormSetValue, UseFormGetValues } from 'react-hook-form'
import { useEffect, KeyboardEvent } from "react"
import { NewAppointmentFormType } from "."
import { ListOfPokemonsType } from "types/api"


const VALUE_TO_PAY_PER_POKEMOM = 70

type Props = {
  listOfPokemons: ListOfPokemonsType
  citiesByRegion: CitiesByRegion
  getValues: UseFormGetValues<NewAppointmentFormType>
  setValue: UseFormSetValue<NewAppointmentFormType>
  control: Control<NewAppointmentFormType>
}

export const useFormViewModel = (props: Props): FormModelInterface => {

  const { listOfPokemons, citiesByRegion, getValues, setValue, control } = props


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

  const onSubmit = (data: any) => {
    console.log(data)
  }


  return {
    citiesOptions,
    listOfPokemonsOptions,
    pokemonsFields,
    numberOfPokemonsToSchedule,
    subtotalToPay,

    currentValueToBillFromGenerationTax,

    handleAddPokemomField,
    handleRemovePokemomField,
    preventEnterFromFireSubmission,
    onSubmit
  }
}