import { Component, OnInit, Input } from '@angular/core';

import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';
import { PokemonSpecies } from '../../../model/pokeapi/pokeApiSpecies';


@Component({
  selector: 'app-pokemon-about-tab',
  templateUrl: './pokemon-about-tab.component.html',
  styleUrls: ['./pokemon-about-tab.component.scss']
})
export class PokemonAboutTabComponent {
 @Input() pokemon: PokemonDetail;
 @Input() pokemonSpecies : PokemonSpecies;

  constructor() {
      this.pokemon = {} as PokemonDetail;
      this.pokemonSpecies = {} as PokemonSpecies;
  }

  getPokemonFlavorText(){
    var flavorTextToReturn = "";
    this.pokemonSpecies.flavor_text_entries.forEach((flavorTextEntries) =>{
                                                    if(flavorTextEntries.language.name == "en"){
                                                      flavorTextToReturn = flavorTextEntries.flavor_text
                                                    }})
    return flavorTextToReturn;
  }
  getPokemonHeight(){
    var height: String = this.pokemon.height + "";
    if(height.length <=1){
      height = "0"+height;
    }
    return height.substring(0, height.length-1)+","+height.substring(height.length-1, height.length)
  }
  getPokemonWeight(){
    var weight: String = this.pokemon.weight + "";
    if(weight.length <=1){
      weight = "0"+weight;
    }
    return weight.substring(0, weight.length-1)+","+weight.substring(weight.length-1, weight.length)
  }
}
