
const GENERATION_MAX_INDEXES = {
  1: 151,
  2: 251,
  3: 386,
  4: 493,
  5: 649,
  6: 721,
  7: 809,
  8: 898
}
export const getPokemomGeneration = (pokeNumber: number) => {

  if (pokeNumber <= GENERATION_MAX_INDEXES[1]) return 1

  if (pokeNumber <= GENERATION_MAX_INDEXES[2]) return 2

  if (pokeNumber <= GENERATION_MAX_INDEXES[3]) return 3

  if (pokeNumber <= GENERATION_MAX_INDEXES[4]) return 4

  if (pokeNumber <= GENERATION_MAX_INDEXES[5]) return 5

  if (pokeNumber <= GENERATION_MAX_INDEXES[6]) return 6

  if (pokeNumber <= GENERATION_MAX_INDEXES[7]) return 7

  if (pokeNumber <= GENERATION_MAX_INDEXES[8]) return 8

  return 9
}