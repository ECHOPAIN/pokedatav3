export interface PokemonAbility {
  id: number,
  name: string,
  is_main_series: boolean,
  generation: any,
  names:{language:{name:string,url:string},name:string}[],
  effect_entries: {effect	:string,short_effect:string,language:{name:string,url:string},name:string}[],
  effect_changes: Object[],
  flavor_text_entries: {flavor_text	:string,language:{name:string,url:string},version_group:any}[],
  pokemon: Object[],
}
