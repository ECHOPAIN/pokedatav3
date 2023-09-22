import { Component, OnInit, Input } from '@angular/core';

import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';
import { PokemonSpecies } from '../../../model/pokeapi/pokeApiSpecies';

@Component({
  selector: 'app-pokemon-stat-tab',
  templateUrl: './pokemon-stat-tab.component.html',
  styleUrls: ['./pokemon-stat-tab.component.scss']
})
export class PokemonStatTabComponent {
 @Input() pokemon: PokemonDetail;
 @Input() pokemonSpecies : PokemonSpecies;

  constructor() {
      this.pokemon = {} as PokemonDetail;
      this.pokemonSpecies = {} as PokemonSpecies;
  }

  getPokemonFemaleRate(){
      var gender_rate = this.pokemonSpecies.gender_rate;
      if(this.pokemonSpecies.gender_rate < 0){
        return '-';
      }
      return this.pokemonSpecies.gender_rate*12.5 + '%';
    }
    getPokemonMaleRate(){
      var gender_rate = this.pokemonSpecies.gender_rate;
          if(this.pokemonSpecies.gender_rate < 0){
            return '-';
          }
          return 100-this.pokemonSpecies.gender_rate*12.5 + '%';
    }
}
