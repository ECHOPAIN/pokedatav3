import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';
import { PokemonMove } from '../../../model/pokeapi/pokeApiMove';

import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-pokemon-move-tab',
  templateUrl: './pokemon-move-tab.component.html',
  styleUrls: ['./pokemon-move-tab.component.scss']
})
export class PokemonMoveTabComponent {
 @Input() pokemon: PokemonDetail;

 @Input() pokemonMoves: PokemonMove[];

  constructor(private translationService: TranslationService) {
    this.pokemon = {} as PokemonDetail;
    this.pokemonMoves = [] as PokemonMove[];
  }

  getSortedPokemonMove(){
    return this.pokemon.moves.sort((a, b) => { // non-anonymous as you ordered...
                                    var lvlA = a.version_group_details[a.version_group_details.length-1].level_learned_at
                                    var lvlB = b.version_group_details[b.version_group_details.length-1].level_learned_at
                                    var methodA = a.version_group_details[a.version_group_details.length-1].move_learn_method.name
                                    var methodB = b.version_group_details[b.version_group_details.length-1].move_learn_method.name
                                    return methodB == "level-up" && methodB != methodA ?  1 // if b should come earlier, push a to end
                                         : methodA == "level-up" && methodB != methodA ? -1 // if b should come later, push a to begin
                                         : lvlB < lvlA ?  1 // if b should come earlier, push a to end
                                         : lvlB > lvlA ? -1 // if b should come later, push a to begin
                                         : methodB < methodA ?  1 // if b should come earlier, push a to end
                                         : methodB > methodA ? -1 // if b should come later, push a to begin
                                         : 0;                   // a and b are equal
                                });;
  }

  getPokemonMoveDetail(moveId: number){
    return this.pokemonMoves.find((pokemonMove) => pokemonMove.id == moveId);
  }

  getPokemonMoveId(url:string): number{
    return +url.split('/')[6];
  }

  getMoveName(url:string){
    return this.translationService.translateMoveName(this.getPokemonMoveDetail(this.getPokemonMoveId(url))!);
  }

}
