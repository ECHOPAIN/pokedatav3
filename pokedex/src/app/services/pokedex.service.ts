import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PokemonsResult } from '../model/pokemon/pokemonsResult';
import { Pokemons } from '../model/pokemon/pokemonsResult';
import { ItemsResult } from '../model/item/itemsResult';
import { Items } from '../model/item/itemsResult';
import { Pokemon } from '../model/pokemon/pokemon';
import { PokeApiSpecies } from '../model/pokeapi/pokeApiSpecies'
import { PokeApiDetail } from '../model/pokeapi/pokeApiDetail'
import { PokeApiEvolutionChain } from '../model/pokeapi/pokeApiEvolutionChain'

//mock
import { POKEMONS } from '../mock-pokemon'
import { ITEMS } from '../mock-item'


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private pokemonUrl = 'https://pokeapi.co/api/v2';  // URL to web api

    constructor(private http: HttpClient) { }

    //
    //Pokemons
    //
    getAllPokemonResults(): Observable<PokemonsResult>{
      return of(POKEMONS)
      //return this.http.get<PokemonsResult>(this.pokemonUrl+'/pokemon?limit=100000&offset=0')
    }

    getPokemonDetail(id: number): Observable<PokeApiDetail> {
      return this.http.get<PokeApiDetail>(this.pokemonUrl+'/pokemon/'+id)
    }

    getPokemonSpecies(id: number): Observable<PokeApiSpecies> {
      return this.http.get<PokeApiSpecies>(this.pokemonUrl+'/pokemon-species/'+id)
    }

    // WARNING: id of the evolution chain, not the pokemon
    getPokemonEvolutionChain(id: number): Observable<PokeApiEvolutionChain> {
      return this.http.get<PokeApiEvolutionChain>(this.pokemonUrl+'/evolution-chain/'+id)
    }

    //
    //Items
    //
    getAllItems(): Observable<ItemsResult>{
          return of(ITEMS)
          //return this.http.get<PokemonsResult>(this.pokemonUrl+'/item?limit=100000&offset=0')
        }
}
