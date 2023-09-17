export interface PokemonDetailsResult {
  count: number,
  next: any,
  previous: any,
  results : PokemonDetail[]
}
export interface PokemonDetail {
  abilities: {ability: {name: string, url: string}, is_hidden: boolean, slot: number}[],
  base_experience: number,
  forms: Object,
  game_indices: Object,
  height: number,
  held_items: Object,
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Object,
  name: string,
  order: number,
  past_types: Object,
  species: {name: string, url: string},
  sprites: {back_default: string, back_female: string, back_shiny: string, back_shiny_female: string, front_default: string, front_female: string, front_shiny: string, front_shiny_female: string, other: Object; versions: Object},
  stats: {base_stat: number, effort: number, stat: {name: string, url: string}}[],
  types: [{slot: number,type: {name: string, url: string}}],
  weight: number
}
