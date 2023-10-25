
// route => /api/scheduling/data
export type SchedulingDatesType = string[]

// route => /api/scheduling/time
export type SchedulingTimesType = string[]

export type SinglePokeRegionType = { name: string, url: string }

// route => https://pokeapi.co/api/v2/region/
export type PokeRegionsType = {
  count: 10,
  next: null,
  previous: null
  results: SinglePokeRegionType[]
}

// route => https://pokeapi.co/api/v2/region/:id
export type RegionInfoType = {
  id: string
  locations: {
    name: string,
    url: string
  }[],
  name: string
}


// route => https://pokeapi.co/api/v2/pokemon?offset=number&limit=number
export type ListOfPokemonsType = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string
  }[]
}
