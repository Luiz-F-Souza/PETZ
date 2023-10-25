import {
  ListOfPokemonsType,
  PokeRegionsType,
  RegionInfoType,
  SchedulingDatesType,
  SchedulingTimesType
} from "types/api";


export const fetchingData = async () => {
  const [dataResponse, timeResponse, pokeRegionsResponse, pokemonsResponse] = await Promise.all([
    fetch('http://localhost:3000/api/scheduling/date'),
    fetch('http://localhost:3000/api/scheduling/time', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: "all"
      })
    }),
    fetch('https://pokeapi.co/api/v2/region/', {
      cache: 'force-cache'
    }),
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=450', {
      cache: 'force-cache'
    })
  ]);

  if (dataResponse.status !== 200) {
    throw new Error('Não foi possível obter as datas disponíveis')
  }

  if (timeResponse.status !== 200) {
    throw new Error(`Não foi possível obter a lista de horários disponíveis`)
  }

  if (pokeRegionsResponse.status !== 200) {
    throw new Error(`Não foi possível obter a lista de Regiões disponíveis`)
  }

  const [dates, times, pokeRegions, listOfPokemons] = await Promise.all([
    dataResponse.json(),
    timeResponse.json(),
    pokeRegionsResponse.json(),
    pokemonsResponse.json()
  ]) as [SchedulingDatesType, SchedulingTimesType, PokeRegionsType, ListOfPokemonsType]

  const citiesPromises = pokeRegions.results.map(region => {
    return fetch(region.url).then(response => response.json())
  })

  const citiesData = await Promise.all(citiesPromises) as RegionInfoType[]

  return {
    dates,
    times,
    pokeRegions,
    citiesData,
    listOfPokemons
  }
}