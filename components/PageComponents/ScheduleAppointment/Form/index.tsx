import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonCTA } from "components/Buttons/CTA"
import { FormLabel } from "components/Form/FormLabel"
import { TextFormLabel } from "components/Form/TextFormLabel"
import { InputBasic } from "components/Form/Input/Basic/Index"
import { SelectBasic } from "components/Form/Select/Basic"
import { ErrorFeedback } from "components/Form/ErrorFeedback"
import { CitiesByRegion, SelectOptionsFormatType } from "types/generals"
import { ListOfPokemonsType } from "types/api"
import { BsTrash } from "react-icons/bs"
import { convertIntoConcurrency } from "@utils/convertIntoConcurrency"
import { useFormViewModel } from "./useFormViewModel"
import { FeedbackCard } from "../FeedbackCard"
import { BodyLoader } from "components/BodyLoader"

const zodSchema = z.object({
  firstName: z.string().min(3, 'Digite seu nome').max(32, 'Digite no máximo 32 letras'),
  lastName: z.string().min(5, 'Digite seu sobrenome').max(64, 'Digite no máximo 64 letras'),
  region: z.string().min(1, 'Selecione a região'),
  city: z.string().min(1, 'Selecione a cidade'),
  pokemons: z.array(
    z.object(
      {
        name: z.string().min(1, 'Selecione o Pokémom'),
      }
    )
  ),
  appointmentDate: z.string().min(1, 'Selecione a Data'),
  appointmentTime: z.string().min(1, 'Selecione o horário')
})

export type NewAppointmentFormType = z.infer<typeof zodSchema>

type Props = {
  pokeRegions: SelectOptionsFormatType,
  citiesByRegion: CitiesByRegion,
  listOfPokemons: ListOfPokemonsType
}

export const ScheduleAppointmentForm = ({
  pokeRegions,
  citiesByRegion,
  listOfPokemons
}: Props) => {

  const methods = useForm<NewAppointmentFormType>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      pokemons: [{ name: '' }]
    }
  })

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = methods

  const selectedDate = getValues("appointmentDate")

  const dataForViewModel = {
    listOfPokemons,
    citiesByRegion,
    control,
    selectedDate, getValues, setValue, resetForm: reset
  }

  const {
    citiesOptions,
    listOfPokemonsOptions,
    pokemonsFields,
    currentValueToBillFromGenerationTax,
    numberOfPokemonsToSchedule,
    subtotalToPay,
    datesAvailables,
    timesAvailables,
    feedbackData,
    handleAddPokemomField,
    handleRemovePokemomField,
    preventEnterFromFireSubmission,
    onSubmit,
    handleNewAppointment
  } = useFormViewModel(dataForViewModel)



  return (
    <>
      {!feedbackData &&
        <div>

          <h2 className="text-center text-2xl font-bold my-8 text-gray-700">Preencha o formulário abaixo para agendar sua consulta</h2>
          <div className="max-w-xl mx-auto px-5" >

            <FormProvider {...methods}>
              <form noValidate onSubmit={handleSubmit(onSubmit)} className="" id="new-appointment-form" onKeyDown={(e) => preventEnterFromFireSubmission(e)} >

                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-24">
                  <legend className="sr-only">Dados pessoais</legend>

                  <FormLabel>
                    <TextFormLabel>Nome</TextFormLabel>
                    <InputBasic
                      autoComplete="given-name"
                      placeholder="Digite seu nome"
                      className={`${errors.firstName ? "border-primary-500" : ""}`}
                      {...register('firstName')}
                    />
                    <ErrorFeedback>{errors.firstName?.message}</ErrorFeedback>
                  </FormLabel>

                  <FormLabel>
                    <TextFormLabel>Sobrenome</TextFormLabel>
                    <InputBasic
                      autoComplete="family-name"
                      placeholder="Digite seu sobrenome"
                      className={`${errors.lastName ? "border-primary-500" : ""}`}
                      {...register('lastName')}
                    />
                    <ErrorFeedback>{errors.lastName?.message}</ErrorFeedback>
                  </FormLabel>


                  <FormLabel className="">
                    <TextFormLabel>Região</TextFormLabel>

                    <SelectBasic
                      placeholder="Selecione a região"
                      autoComplete="none"
                      options={pokeRegions}
                      className={`${errors.region ? "border-primary-500" : ""}`}
                      {...register("region")}
                    />

                    <ErrorFeedback>{errors.region?.message}</ErrorFeedback>
                  </FormLabel>

                  <FormLabel className="">
                    <TextFormLabel>Cidade</TextFormLabel>

                    <SelectBasic
                      placeholder="Selecione a cidade"
                      autoComplete="none"
                      options={citiesOptions}
                      className={`${errors.city ? "border-primary-500" : ""}`}
                      {...register("city")}
                    />

                    <ErrorFeedback>{errors.city?.message}</ErrorFeedback>
                  </FormLabel>
                </fieldset>

                <fieldset>
                  <legend className="text-xs text-gray-700 font-bold mb-2 ">Cadastre seu time</legend>
                  <p className="mb-4 text-gray-muted text-xs">Atendemos até 06 pokémons por vez</p>

                  {pokemonsFields.map((field, index) => {

                    const currentPokemomNumber = (index + 1).toString().padStart(2, "0")

                    const fieldError = errors.pokemons?.[index]

                    return (
                      <FormLabel key={field.id} className="flex items-center gap-5 mb-6">
                        <TextFormLabel>Pokémom {currentPokemomNumber}</TextFormLabel>
                        <div className="flex flex-col flex-grow">
                          <SelectBasic

                            autoComplete="none"
                            placeholder="Selecione seu pokémom"
                            className={`${fieldError ? "border-primary-500" : ""}`}
                            options={listOfPokemonsOptions}
                            {...register(`pokemons.${index}.name` as const)}
                          />

                          <ErrorFeedback>{fieldError?.name?.message}</ErrorFeedback>
                        </div>
                        {index > 0 &&
                          <button
                            title={`Remover o campo de seleção ${currentPokemomNumber}`}
                            aria-label={`Remover a seleção de pokemom número ${currentPokemomNumber}`}
                            role="button"
                            type="button"
                            onClick={() => handleRemovePokemomField(index)}>
                            <BsTrash />
                          </button>}
                      </FormLabel>
                    )
                  })}

                  <button
                    type="button"
                    className="border-2 rounded-full p-3 mb-8 font-bold text-xs"
                    onClick={handleAddPokemomField}
                  >
                    Adicionar novo pokémom ao time... +
                  </button>
                </fieldset>

                <fieldset className="flex flex-wrap gap-4">
                  <legend className="sr-only">Data e hora para atendimento</legend>

                  <FormLabel className="flex-grow flex-wrap">
                    <TextFormLabel>Data para atendimento</TextFormLabel>
                    <SelectBasic
                      autoComplete="none"
                      placeholder="Selecione uma data"
                      options={datesAvailables ?? []}
                      className={`${errors.appointmentDate ? "border-primary-500" : ""}`}
                      {...register('appointmentDate')}
                    />

                    <ErrorFeedback>{errors.appointmentDate?.message}</ErrorFeedback>
                  </FormLabel>

                  <FormLabel className="flex-grow">
                    <TextFormLabel>Horário de atendimento</TextFormLabel>

                    <SelectBasic
                      autoComplete="none"
                      placeholder="Selecione um horário"
                      options={timesAvailables ?? []}
                      className={`${errors.appointmentTime ? "border-primary-500" : ""}`}
                      {...register('appointmentTime')}
                    />
                    <ErrorFeedback>{errors.appointmentTime?.message}</ErrorFeedback>
                  </FormLabel>
                </fieldset>
              </form>
            </FormProvider>


            <hr className="my-5" />

            <article className="mb-8">
              <section className="flex items-center justify-between">
                <p className="text-gray-muted text-sm">
                  Número de pokémons a serem atendidos:
                </p>
                <p className="text-gray-muted text-sm">
                  {numberOfPokemonsToSchedule.toString().padStart(2, "0")}
                </p>
              </section>

              <section className="flex items-center justify-between">
                <p className="text-gray-muted text-sm">
                  Atendimento unitário por pokémon:
                </p>
                <p className="text-gray-muted text-sm">R$ 70,00</p>
              </section>

              <section className="flex items-center justify-between">
                <p className="text-gray-muted text-sm">
                  Subtotal:
                </p>
                <p className="text-gray-muted text-sm">
                  {convertIntoConcurrency(subtotalToPay)}
                </p>
              </section>

              <section className="flex items-center justify-between">
                <p className="text-gray-muted text-sm">
                  Taxa geracional*:
                </p>
                <p className="text-gray-muted text-sm">
                  {convertIntoConcurrency(currentValueToBillFromGenerationTax)}
                </p>
              </section>
              <p className="text-gray-muted text-[8px]">
                *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%
              </p>
            </article>

            <section
              className="
          flex flex-wrap 
          justify-between items-center
          mb-52 gap-4
        "
            >
              <h2
                className="
            text-2xl 
            font-bold 
            text-center 
            xs:text-left 
            flex-grow
          "
              >
                Valor Total: R$ 72,10
              </h2>
              <ButtonCTA
                type="submit"
                form="new-appointment-form"
                className="flex-grow "
              >
                Concluir Agendamento
              </ButtonCTA>
            </section>
          </div>
        </div>
      }

      {
        (feedbackData && !isSubmitting) &&
        <FeedbackCard
          title={feedbackData.title}
          icon={feedbackData.icon}
          message={feedbackData.message}
          handleNewAppointment={handleNewAppointment}
        />
      }

      {
        isSubmitting && <BodyLoader />
      }
    </>

  )
}