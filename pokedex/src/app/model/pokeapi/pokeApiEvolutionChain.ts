export interface PokeApiEvolutionChain {
  chain: PokeApiEvolutionChainType,
}


export interface PokeApiEvolutionChainType{
  evolution_details: PokeApiEvolution_details,
  evolves_to: [],
  species: {name: string, url: string}
}

export interface PokeApiEvolution_details{
  gender: string,
  held_item: string,
  item: string,
  known_move: string,
  known_move_type: string,
  location: string,
  min_affection: string,
  min_beauty: string,
  min_happiness: string,
  min_level: number,
  needs_overworld_rain: boolean,
  party_species: string,
  party_type: string,
  relative_physical_stats: string,
  time_of_day: string,
  trade_species: string,
  trigger:{
     name: string,
     url: string
  },
  turn_upside_down: boolean
}
