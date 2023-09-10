export interface PokemonsResult {
  count: number,
  next: any,
  previous: any,
  results : PokemonsResultResults[]
}

export interface PokemonsResultResults {
  name: string ,url: string
}
