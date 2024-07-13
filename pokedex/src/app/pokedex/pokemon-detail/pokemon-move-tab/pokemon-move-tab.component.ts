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

 sorted:boolean = false;

 sortedByMoveName:number = 0;
 sortedByPower:number = 0;
 sortedByAccuracy:number = 0;
 sortedByPP:number = 0;
 sortedByCategorie:number = 0;
 sortedByType:number = 0;

  constructor(private translationService: TranslationService) {
    this.pokemon = {} as PokemonDetail;
    this.pokemonMoves = [] as PokemonMove[];


  }

  sortPokemonMove(){
    this.pokemon.moves.sort((a, b) => {
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
    this.sorted=true;
  }

  getPokemonMoves(){
    if(!this.sorted){
      this.sortPokemonMove();
    }
    return this.pokemon.moves;
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

  getMoveFlavorText(url:string){
    return this.translationService.translateMoveFlavorText(this.getPokemonMoveDetail(this.getPokemonMoveId(url))!);
  }

  sortMoveByMove(){

    this.sortedByPower = 0;
    this.sortedByAccuracy = 0;
    this.sortedByPP = 0;
    this.sortedByCategorie = 0;
    this.sortedByType = 0;

    if(this.sortedByMoveName==0){
      this.sortedByMoveName = 1;
      this.pokemon.moves.sort((a, b) => {
        var moveA = this.getMoveName(a.move.url).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var moveB = this.getMoveName(b.move.url).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return moveB < moveA ? 1
             : moveB > moveA ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByMoveName==1){
      this.sortedByMoveName = 2;
      this.pokemon.moves.sort((a, b) => {
        var moveA = this.getMoveName(b.move.url).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var moveB = this.getMoveName(a.move.url).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return moveB < moveA ? 1
             : moveB > moveA ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByMoveName = 0;
      this.sortPokemonMove();
    }
  }

  sortMoveByPower(){
    this.sortedByMoveName = 0;

    this.sortedByAccuracy = 0;
    this.sortedByPP = 0;
    this.sortedByCategorie = 0;
    this.sortedByType = 0;

    if(this.sortedByPower==0){
      this.sortedByPower = 1;
      this.pokemon.moves.sort((a, b) => {
        var powerA = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.power!
        var powerB = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.power!
        return powerA < powerB ? 1
             : powerA > powerB ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByPower==1){
      this.sortedByPower = 2;
      this.pokemon.moves.sort((a, b) => {
        var powerA = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.power!
        var powerB = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.power!
        return powerA < powerB ? 1
             : powerA > powerB ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByPower = 0;
      this.sortPokemonMove();
    }
  }

  sortMoveByAccuracy(){
    this.sortedByMoveName = 0;

    this.sortedByPower = 0;
    this.sortedByPP = 0;
    this.sortedByCategorie = 0;
    this.sortedByType = 0;

    if(this.sortedByAccuracy==0){
      this.sortedByAccuracy = 1;
      this.pokemon.moves.sort((a, b) => {
        var accuracyA = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.accuracy!
        var accuracyB = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.accuracy!
        return !(accuracyA) && !(!(accuracyB)) ? -1
             : !(accuracyB) && !(!(accuracyA)) ? 1
             : accuracyA < accuracyB ? 1
             : accuracyA > accuracyB ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByAccuracy==1){
      this.sortedByAccuracy = 2;
      this.pokemon.moves.sort((a, b) => {
        var accuracyA = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.accuracy!
        var accuracyB = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.accuracy!
        return !(accuracyA) && !(!(accuracyB)) ? -1
             : !(accuracyB) && !(!(accuracyA)) ? 1
             : accuracyA < accuracyB ? 1
             : accuracyA > accuracyB ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByAccuracy = 0;
      this.sortPokemonMove();
    }
  }

  sortMoveByPP(){
    this.sortedByMoveName = 0;

    this.sortedByPower = 0;
    this.sortedByAccuracy = 0;
    this.sortedByCategorie = 0;
    this.sortedByType = 0;

    if(this.sortedByPP==0){
      this.sortedByPP = 1;
      this.pokemon.moves.sort((a, b) => {
        var ppA = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.pp!
        var ppB = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.pp!
        return ppA < ppB ? 1
             : ppA > ppB ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByPP==1){
      this.sortedByPP = 2;
      this.pokemon.moves.sort((a, b) => {
        var ppA = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.pp!
        var ppB = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.pp!
        return ppA < ppB ? 1
             : ppA > ppB ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByPP = 0;
      this.sortPokemonMove();
    }
  }

  sortMoveByCategorie(){
    this.sortedByMoveName = 0;

    this.sortedByPower = 0;
    this.sortedByAccuracy = 0;
    this.sortedByPP = 0;
    this.sortedByType = 0;

    if(this.sortedByCategorie==0){
      this.sortedByCategorie = 1;
      this.pokemon.moves.sort((a, b) => {
        var categorieA = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.damage_class?.name!
        var categorieB = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.damage_class?.name!
        return categorieB < categorieA ? 1
             : categorieB > categorieA ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByCategorie==1){
      this.sortedByCategorie = 2;
      this.pokemon.moves.sort((a, b) => {
        var categorieA = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.damage_class?.name!
        var categorieB = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.damage_class?.name!
        return categorieB < categorieA ? 1
             : categorieB > categorieA ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByCategorie = 0;
      this.sortPokemonMove();
    }
  }

  sortMoveByType(){
    this.sortedByMoveName = 0;

    this.sortedByPower = 0;
    this.sortedByAccuracy = 0;
    this.sortedByPP = 0;
    this.sortedByCategorie = 0;

    if(this.sortedByType==0){
      this.sortedByType = 1;
      this.pokemon.moves.sort((a, b) => {
        var typeA = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.type?.url!
        var typeB = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.type?.url!
        return typeB < typeA ? 1
             : typeB > typeA ? -1
             : 0;                   // a and b are equal
      });
    }else if(this.sortedByType==1){
      this.sortedByType = 2;
      this.pokemon.moves.sort((a, b) => {
        var typeA = this.getPokemonMoveDetail(this.getPokemonMoveId(b.move.url))?.type?.url!
        var typeB = this.getPokemonMoveDetail(this.getPokemonMoveId(a.move.url))?.type?.url!
        return typeB < typeA ? 1
             : typeB > typeA ? -1
             : 0;                   // a and b are equal
      });
    }else{
      this.sortedByType = 0;
      this.sortPokemonMove();
    }
  }

}
