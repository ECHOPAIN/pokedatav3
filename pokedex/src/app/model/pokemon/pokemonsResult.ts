export interface PokemonsResult {
  count: number,
  next: any,
  previous: any,
  results : Pokemons[]
}

export interface Pokemons {
  name: string ,url: string
}
