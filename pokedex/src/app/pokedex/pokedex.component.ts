import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../model/pokemon/pokemon';
import { PokemonsResultResults } from '../model/pokemon/pokemonsResult';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemons: PokemonsResultResults[] = [];
  filteredPokemonList: PokemonsResultResults[] = [];
  isLoading: Boolean = false;
  batchSize: number = 50;
  maxPokemonId: number = 1010;
  search: String = "";
  listDisplay: Boolean = false;


  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.loadPokemonList()
  }

 loadPokemonList(): void {
    this.isLoading = true;
    this.pokedexService.getAllPokemonResults()
      .subscribe(pokemonsRetrieved => {
          this.pokemons = pokemonsRetrieved.results.slice(0, this.maxPokemonId);
          this.filteredPokemonList = this.pokemons.slice(0, this.batchSize);
          this.isLoading = false;
      });
  }

  //When user is typing in the search bar
  onKey(event: any) { // without type info
    this.filterPokemon(event.target.value);
  }

  filterPokemon(search: String){
  this.search = search;
    if (!search) {
        this.filteredPokemonList = this.pokemons;
      }

      this.filteredPokemonList = this.pokemons.filter(
        pokemon => pokemon?.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0,this.batchSize);
  }

  onScroll(){
    //we are searching for a pokemon
    if (this.search) {
      var allFilteredPokemons: PokemonsResultResults[] = []
      allFilteredPokemons = this.pokemons.filter(
              pokemon => pokemon?.name.toLowerCase().includes(this.search.toLowerCase())
            );
      //done
      if(this.filteredPokemonList.length >= allFilteredPokemons.length){
        return;
      }
      //if we reach the end of the list
      if (this.filteredPokemonList.length+this.batchSize > allFilteredPokemons.length) {
        this.filteredPokemonList.push(...allFilteredPokemons.slice(this.filteredPokemonList.length,allFilteredPokemons.length));
      } else {
        this.filteredPokemonList.push(...allFilteredPokemons.slice(this.filteredPokemonList.length,this.filteredPokemonList.length+this.batchSize));
      }
    }else{
      //we are not searching for a pokemon
      //done
      if(this.filteredPokemonList.length >= this.maxPokemonId){
        return;
      }
      //if we reach the end of the list
      if (this.filteredPokemonList.length+this.batchSize > this.maxPokemonId) {
        this.filteredPokemonList.push(...this.pokemons.slice(this.filteredPokemonList.length,this.maxPokemonId));
      } else {
          this.filteredPokemonList.push(...this.pokemons.slice(this.filteredPokemonList.length,this.filteredPokemonList.length+this.batchSize));
      }
    }
  }


}
