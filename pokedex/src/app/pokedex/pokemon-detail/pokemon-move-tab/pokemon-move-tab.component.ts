import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';

@Component({
  selector: 'app-pokemon-move-tab',
  templateUrl: './pokemon-move-tab.component.html',
  styleUrls: ['./pokemon-move-tab.component.scss']
})
export class PokemonMoveTabComponent {
 @Input() pokemon: PokemonDetail;

  constructor() {
    this.pokemon = {} as PokemonDetail;
  }
}
