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
  isLoading = false;


  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.loadPokemonList()
  }

 loadPokemonList(): void {
    this.isLoading = true;
    this.pokedexService.getAllPokemonResults()
      .subscribe(pokemonsRetrieved => {
          this.pokemons = pokemonsRetrieved.results;
          this.filteredPokemonList = this.pokemons;
          //this.fromPokemonId = this.fromPokemonId + this.batchSize;
          this.isLoading = false;
      });
  }

  //When user is typing in the search bar
  onKey(event: any) { // without type info
    this.filterPokemon(event.target.value);
  }

  filterPokemon(search: String){
    if (!search) {
        this.filteredPokemonList = this.pokemons;
      }

      this.filteredPokemonList = this.pokemons.filter(
        pokemon => pokemon?.name.toLowerCase().includes(search.toLowerCase())
      );
  }


}
