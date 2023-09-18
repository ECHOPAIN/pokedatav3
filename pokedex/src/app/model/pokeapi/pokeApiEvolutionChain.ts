export interface PokemonEvolutionChain {
  baby_trigger_item: Object | null,
  chain: PokemonEvolutionChainType,
  id: number
}


export interface PokemonEvolutionChainType{
  evolution_details: PokemonEvolutionDetails[],
  evolves_to: PokemonEvolutionChainType[],
  is_baby: boolean,
  species: {name: string, url: string}
}

export interface PokemonEvolutionDetails{
  gender: number | null,
  held_item: {name: string, url: string} | null,
  item: {name: string, url: string} | null,
  known_move: {name: string, url: string} | null,
  known_move_type: {name: string, url: string} | null,
  location: {name: string, url: string} | null,
  min_affection: string | null,
  min_beauty: string | null,
  min_happiness: number | null,
  min_level: number | null,
  needs_overworld_rain: boolean | null,
  party_species: string | null,
  party_type: string | null,
  relative_physical_stats: string | null,
  time_of_day: string | null,
  trade_species: string | null,
  trigger:{
     name: string,
     url: string
  },
  turn_upside_down: boolean | null
}
