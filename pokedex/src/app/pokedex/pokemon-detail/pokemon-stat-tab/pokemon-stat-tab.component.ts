import { Component, OnInit, Input } from '@angular/core';

import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';

@Component({
  selector: 'app-pokemon-stat-tab',
  templateUrl: './pokemon-stat-tab.component.html',
  styleUrls: ['./pokemon-stat-tab.component.scss']
})
export class PokemonStatTabComponent {
 @Input() pokemon: PokemonDetail;

  constructor() {
      this.pokemon = {} as PokemonDetail;
  }

}
