import { useMemo } from "react"
import { ListOfPokemonsType } from "types/api"
import { getPokemomGeneration } from "../utils/getPokemomGeneration"


type Props = {
  team: { name: string }[]
  listOfPokemons: ListOfPokemonsType
}
export const useGetHigherGenerations = ({ team, listOfPokemons }: Props) => {

  const higherGeneration = useMemo(() => {
    const listOfPokemonsNames = listOfPokemons.results.flatMap((result) => result.name)

    const higherGeneration = team.reduce((savedGeneration, pokemom) => {

      const pokemomName = pokemom.name

      const pokemomIndex = listOfPokemonsNames.indexOf(pokemomName)

      const currentGeneration = getPokemomGeneration(pokemomIndex)

      if (currentGeneration > savedGeneration) return currentGeneration
      return savedGeneration
    }, 1)

    return higherGeneration
  }, [listOfPokemons.results, team])


  return { higherGeneration }
}

