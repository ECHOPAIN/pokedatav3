import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { PokemonsResult } from '../model/pokemon/pokemonsResult';
import { Pokemons } from '../model/pokemon/pokemonsResult';
import { ItemsResult } from '../model/item/itemsResult';
import { Items } from '../model/item/itemsResult';
import { Pokemon } from '../model/pokemon/pokemon';
import { PokemonSpecies } from '../model/pokeapi/pokeApiSpecies'
import { PokemonDetail } from '../model/pokeapi/pokeApiDetail'
import { PokemonEvolutionChain } from '../model/pokeapi/pokeApiEvolutionChain'
import { PokemonMove } from '../model/pokeapi/pokeApiMove'
import { PokemonAbility } from '../model/pokeapi/pokeApiAbility'

//mock
import { POKEMONS } from '../mock-pokemon'
import { ITEMS } from '../mock-item'


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private pokemonUrl = 'https://pokeapi.co/api/v2';  // URL to web api

  private pokemonCache:PokemonsResult = {} as PokemonsResult;
  private pokemonDetailCache:Map<number,PokemonDetail> = new Map() as Map<number,PokemonDetail>;
  private pokemonSpeciesCache:Map<number,PokemonSpecies> = new Map() as Map<number,PokemonSpecies>;
  private pokemonEvolutionChainCache:Map<number,PokemonEvolutionChain> = new Map() as Map<number,PokemonEvolutionChain>;
  private pokemonAbilityCache:Map<number,PokemonAbility> = new Map() as Map<number,PokemonAbility>;
  private pokemonMoveCache:Map<number,PokemonMove> = new Map() as Map<number,PokemonMove>;

  private displayDetail = new BehaviorSubject<boolean>(false);
  private pokemonDetailId = 0;


  constructor(private http: HttpClient) { }

  //
  //Pokemons
  //
  getAllPokemonResults(): Observable<PokemonsResult>{
    if(!(this.pokemonCache.count > 0)){
      this.pokemonCache = POKEMONS
    }
    return of(this.pokemonCache)
    //return this.http.get<PokemonsResult>(this.pokemonUrl+'/pokemon?limit=100000&offset=0')
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    if(this.pokemonDetailCache.get(id)){
      //Already cached
      return of(this.pokemonDetailCache.get(id)!);
    }else{
      //Fetching from PokeApi
      var toReturn = this.http.get<PokemonDetail>(this.pokemonUrl+'/pokemon/'+id);
      toReturn.subscribe(pokemonDetail => {
          this.pokemonDetailCache.set(id, pokemonDetail);
      });
      return toReturn;
    }
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    if(this.pokemonSpeciesCache.get(id)){
      //Already cached
      return of(this.pokemonSpeciesCache.get(id)!);
    }else{
      //Fetching from PokeApi
      var toReturn = this.http.get<PokemonSpecies>(this.pokemonUrl+'/pokemon-species/'+id);
      toReturn.subscribe(pokemonSpecies => {
          this.pokemonSpeciesCache.set(id, pokemonSpecies);
      });
      return toReturn;
    }
  }

  // WARNING: id of the evolution chain, not the pokemon
  getPokemonEvolutionChain(id: number): Observable<PokemonEvolutionChain> {
    if(this.pokemonEvolutionChainCache.get(id)){
      //Already cached
      return of(this.pokemonEvolutionChainCache.get(id)!);
    }else{
      //Fetching from PokeApi
      var toReturn = this.http.get<PokemonEvolutionChain>(this.pokemonUrl+'/evolution-chain/'+id);
      toReturn.subscribe(pokemonEvolutionChain => {
          this.pokemonEvolutionChainCache.set(id, pokemonEvolutionChain);
      });
      return toReturn;
    }
  }

  getPokemonAbility(id: number){
    if(this.pokemonAbilityCache.get(id)){
      //Already cached
      return of(this.pokemonAbilityCache.get(id)!);
    }else{
      //Fetching from PokeApi
      var toReturn = this.http.get<PokemonAbility>(this.pokemonUrl+'/ability/'+id);
      toReturn.subscribe(pokemonAbility => {
          this.pokemonAbilityCache.set(id, pokemonAbility);
      });
      return toReturn;
    }
  }

  getCurrentPokemonMoveDetail(id: number): Observable<PokemonMove> {
    /*if(this.pokemonMoveCache.get(id)){
      //Already cached
      return of(this.pokemonMoveCache.get(id)!);
    }else{
      //Fetching from PokeApi
      var toReturn = this.http.get<PokemonMove>(this.pokemonUrl+'/move/'+id);
      toReturn.subscribe(pokemonAbility => {
          this.pokemonMoveCache.set(id, pokemonAbility);
      });
      return toReturn;
    }*/

    //mocked pokemon move
    return of({
      id: id,
      name: 'moveName',
      accuracy: 100,
      effect_chance: 2,
      pp: 50,
      priority: 4,
      power: 100,
      contest_combos: {},
      contest_type: {},
      contest_effect: {},
      damage_class: {name:'physical',url:'url'},
      effect_entries: [{}],
      effect_changes: [{}],
      learned_by_pokemon: [{}],
      flavor_text_entries: [{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/1/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/2/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/3/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/4/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/5/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/6/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/7/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/8/"},version_group:{name:"",url:""}},{flavor_text:"flavor text",language:{name:"","url":"https://pokeapi.co/api/v2/language/9/"},version_group:{name:"",url:""}},],
      generation: [{}],
      machines: [{}],
      meta: [{}],
      names: [{language:{name:'',url:'https://pokeapi.co/api/v2/language/1/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/2/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/3/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/4/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/5/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/6/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/7/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/8/'},name:'moveName'},{language:{name:'',url:'https://pokeapi.co/api/v2/language/9/'},name:'moveName'}],
      past_values: [{}],
      stat_changes: [{}],
      super_contest_effect: {},
      target: {},
      type: {name:'water',url:'url'}
    });
  }

  //
  //Items
  //
  getAllItems(): Observable<ItemsResult>{
        return of(ITEMS)
        //return this.http.get<PokemonsResult>(this.pokemonUrl+'/item?limit=100000&offset=0')
      }

  //
  //Detail
  //
  //Display screen
  //
  isDisplayDetail():BehaviorSubject<boolean> {
      return this.displayDetail;
    }

  displayDetailWindow(id:number){
      this.pokemonDetailId = id;
      this.displayDetail.next(true);
    }

    hideDetailWindow(){
      this.displayDetail.next(false);
    }



    getCurrentPokemonDetail(): Observable<PokemonDetail>{
      return this.getPokemonDetail(this.pokemonDetailId);
    }

    //Do not use anymore, broken on mega
    /*getCurrentPokemonSpecies(): Observable<PokemonSpecies>{
      return this.getPokemonSpecies(this.pokemonDetailId);
    }*/

}
