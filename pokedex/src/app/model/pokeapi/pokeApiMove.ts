export interface PokemonMove {
  id: number,
  name: string,
  accuracy: number,
  effect_chance: number,
  pp: number,
  priority: number,
  power: number,
  contest_combos: Object,
  contest_type: Object,
  contest_effect: Object,
  damage_class: {name: string, url: string},
  effect_entries: Object[],
  effect_changes: Object[],
  learned_by_pokemon: Object[],
  flavor_text_entries: Object[],
  generation: Object[],
  machines: Object[],
  meta: Object[],
  names: {language:{name:string,url:string},name:string}[],
  past_values: Object[],
  stat_changes: Object[],
  super_contest_effect: Object,
  target: Object,
  type: {name: string, url: string}
}
