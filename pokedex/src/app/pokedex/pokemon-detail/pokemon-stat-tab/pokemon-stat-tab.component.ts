import { Component, OnInit, Input } from '@angular/core';

import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';
import { PokemonSpecies } from '../../../model/pokeapi/pokeApiSpecies';
import { PokemonAbility } from '../../../model/pokeapi/pokeApiAbility';

import { PokedexService } from '../../../services/pokedex.service';

import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-pokemon-stat-tab',
  templateUrl: './pokemon-stat-tab.component.html',
  styleUrls: ['./pokemon-stat-tab.component.scss']
})
export class PokemonStatTabComponent {
 @Input() pokemon: PokemonDetail;
 @Input() pokemonSpecies: PokemonSpecies;
 @Input() pokemonAbilities: PokemonAbility[];

 abilityEffect: String = "";

  constructor(private pokedexService: PokedexService, private translationService: TranslationService) {
      this.pokemon = {} as PokemonDetail;
      this.pokemonSpecies = {} as PokemonSpecies;
      this.pokemonAbilities = []  as PokemonAbility[];
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

  getAbilityName(ability: any){
    var pokemonAbility = "-";

    this.pokemonAbilities.forEach(abilityRetrived => {
      if(ability.ability.url.split('/')[6] == abilityRetrived.id){
        pokemonAbility = this.translationService.translateAbilityName(abilityRetrived);
      }
    });

    return pokemonAbility
  }

  getAbilityFlavorText(ability: any){
    var pokemonAbility = "-";

    this.pokemonAbilities.forEach(abilityRetrived => {
      if(ability.ability.url.split('/')[6] == abilityRetrived.id){
        pokemonAbility = this.translationService.translateAbilityFlavorText(abilityRetrived);
      }
    });

    return pokemonAbility
  }

  updateAbilityEffect(ability:any){
    this.abilityEffect = this.getAbilityName(ability) + " : " + this.getAbilityFlavorText(ability)
  }
}
