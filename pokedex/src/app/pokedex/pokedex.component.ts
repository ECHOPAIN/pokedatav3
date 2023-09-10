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
          //this.fromPokemonId = this.fromPokemonId + this.batchSize;
          this.isLoading = false;
      });
  }


}
