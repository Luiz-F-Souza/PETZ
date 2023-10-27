"use server"

import Head from "next/head";
import { PageDescription } from "components/PageDescription";
import { ScheduleAppointmentForm } from "components/PageComponents/ScheduleAppointment/Form";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { CitiesByRegion, SelectOptionsFormatType } from "types/generals";
import { fetchingData } from "../../@utils/Pages/ScheduleAppointment/fetchingData";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=3600'
  )

  const { pokeRegions, citiesData, listOfPokemons } = await fetchingData()

  const citiesByRegion: CitiesByRegion = {}

  citiesData.forEach(citieInfo => {

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


  const pokeRegionsOptions: SelectOptionsFormatType = pokeRegions.results.map(region => {
    return {
      id: region.url,
      label: region.name,
      value: region.name
    }
  })

  return {
    props: {
      pokeRegions: pokeRegionsOptions,
      citiesByRegion,
      listOfPokemons
    }
  }
}


const DESCRIPTION_TEXT_META_TAG = "Agende sua consulta! Curamos pokémons em apenas 5 segundos. Trate com amor seus Pokémons "
export default function ScheduleAppointment(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { pokeRegions, citiesByRegion, listOfPokemons } = props


  return (
    <>
      <Head>
        <title>Centro Pokémon: nova consulta</title>
        <meta name="description" content={DESCRIPTION_TEXT_META_TAG} />
        <meta name="og:description" content={DESCRIPTION_TEXT_META_TAG} />
        <meta name="telegram:description" content={DESCRIPTION_TEXT_META_TAG} />

        <meta name="keywords" content="Centro Pokémon, pokémons, consulta, cuidar de pokémons, curar pokémons, emergência pokémom" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main>

        <PageDescription title="Agendar Consulta" description="Recupere seus pokémons em 5 segundos" />

        <ScheduleAppointmentForm
          pokeRegions={pokeRegions}
          citiesByRegion={citiesByRegion}
          listOfPokemons={listOfPokemons}
        />

      </main>
    </>
  )
}





