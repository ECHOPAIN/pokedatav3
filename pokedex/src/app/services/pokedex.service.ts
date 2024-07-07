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

  private displayDetail = new BehaviorSubject<boolean>(false);
  private pokemonDetailId = 0;


  constructor(private http: HttpClient) { }

  //
  //Pokemons
  //
  getAllPokemonResults(): Observable<PokemonsResult>{
    return of(POKEMONS)
    //return this.http.get<PokemonsResult>(this.pokemonUrl+'/pokemon?limit=100000&offset=0')
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.pokemonUrl+'/pokemon/'+id)
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(this.pokemonUrl+'/pokemon-species/'+id)
  }

  // WARNING: id of the evolution chain, not the pokemon
  getPokemonEvolutionChain(id: number): Observable<PokemonEvolutionChain> {
    return this.http.get<PokemonEvolutionChain>(this.pokemonUrl+'/evolution-chain/'+id)
  }

  getPokemonAbility(id: number){
    return this.http.get<PokemonAbility>(this.pokemonUrl+'/ability/'+id)
  }

  getCurrentPokemonMoveDetail(moveId: number): Observable<PokemonMove> {
    //return this.http.get<PokemonMove>(this.pokemonUrl+'/move/'+moveId)

    //mocked pokemon move
    return of({
      id: moveId,
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
      flavor_text_entries: [{}],
      generation: [{}],
      machines: [{}],
      meta: [{}],
      names: [{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'},{name:'moveName',url:'url'}],
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
