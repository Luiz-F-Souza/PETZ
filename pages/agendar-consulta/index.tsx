"use server"

import Head from "next/head";
import { PageDescription } from "components/PageDescription";
import { ScheduleAppointmentForm } from "./_components/Form";
import { PokeRegionsType, SchedulingDatesType, SchedulingTimesType } from "types/api";
import { InferGetStaticPropsType } from "next";
import { randomUUID } from "crypto";
import { CitiesByRegion, SelectOptionsFormatType } from "types/generals";
import { fetchingData } from "./utils/fetchingData";



export default function ScheduleAppointment({ dates, times, pokeRegions, citiesByRegion, listOfPokemons }: InferGetStaticPropsType<typeof getStaticProps>) {

 

  return (
    <>
      <Head>

      </Head>

      <main>

        <PageDescription title="Agendar Consulta" description="Recupere seus pokémons em 5 segundos" />

        <h2 className="text-center text-2xl font-bold my-8 text-gray-700">Preencha o formulário abaixo para agendar sua consulta</h2>
        <ScheduleAppointmentForm 
          availableDates={dates} 
          availableTimes={times} 
          pokeRegions={pokeRegions}
          citiesByRegion={citiesByRegion}
          listOfPokemons={listOfPokemons}
        />

      </main>
    </>
  )
}


export async function getStaticProps() {

  const { dates, times, pokeRegions, citiesData, listOfPokemons } = await fetchingData()

  const citiesByRegion: CitiesByRegion = {}

  citiesData.forEach( citieInfo => {

    const object = {
      id: citieInfo.id,
      cities: citieInfo.locations.map((city: any) => {
        const spacedName = city.name.replace(/-/g, ' ')
        const upperCaseName = spacedName[0].toUpperCase() + spacedName.slice(1)
        return {
          name: upperCaseName,
          locationUrl: city.url
        }
      })
    }
    citiesByRegion[citieInfo.name] = object
  })

  const optionsDates: SelectOptionsFormatType = dates.map((date) => {
    return {
      label: date,
      value: date,
      id: randomUUID()
    }
  })

  const optionsTimes: SelectOptionsFormatType = times.map((time) => {

    const timeArray = time.split(":")
    const hour = timeArray[0]
    const minutes = timeArray[1]
    const hourAndMinute = `${hour}:${minutes}`

    return {
      label: hourAndMinute,
      value: time,
      id: randomUUID()
    }
  })

  const pokeRegionsOptions: SelectOptionsFormatType = pokeRegions.results.map(region => {
    return {
      id: region.url,
      label: region.name,
      value: region.name
    }
  })

  return {
    props: {
      dates: optionsDates,
      times: optionsTimes,
      pokeRegions: pokeRegionsOptions,
      citiesByRegion,
      listOfPokemons
    },
    revalidate: 10
  }
}


