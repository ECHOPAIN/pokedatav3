export interface Pokemon {
  id: number,
  name: string,
  front_default: string,
  //Detail
  abilities?: [{ability: {name: string}, is_hidden: boolean}],
  base_experience?: number,
  height?: number,
  sprites?: {back_default: string, back_female: string, back_shiny: string, back_shiny_female: string, front_default: string, front_female: string, front_shiny: string, front_shiny_female: string},
  stats?: [{base_stat: number, effort: number, stat: {name: string}}],
  types?: [{slot: number,type: {name: string}}],
  weight?: number,
  //species
  flavor_text_entries?: [{flavor_text: string}],
  evolution_chain?: {url: string},
  //EvolutionChain
  chain?: EvolutionChainType,
}


export interface EvolutionChainType{
  evolution_details: Evolution_details,
  evolves_to: [],
  species: {name: string, url: string}
}

export interface Evolution_details{
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
