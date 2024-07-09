import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { PokemonDetail } from '../../model/pokeapi/pokeApiDetail';
import { PokemonSpecies } from '../../model/pokeapi/pokeApiSpecies';
import { PokemonEvolutionChain } from '../../model/pokeapi/pokeApiEvolutionChain'
import { PokemonMove } from '../../model/pokeapi/pokeApiMove'
import { PokemonAbility } from '../../model/pokeapi/pokeApiAbility';

import { PokedexService } from '../../services/pokedex.service';
import { ColorService } from '../../services/color.service';
import { TypeService } from '../../services/type.service';

import { TranslationService } from '../../services/translation.service';


//To delete
/*import { POKEMONDETAIL } from '../../mock-pokemon-detail';
import { POKEMONSPECIES } from '../../mock-pokemon-species';
import { POKEMONEVOLUTIONCHAIN } from '../../mock-pokemon-evolution-chain';*/


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokemon: PokemonDetail;
  pokemonSpecies : PokemonSpecies;
  pokemonEvolutionChain : PokemonEvolutionChain;
  pokemonMoves : PokemonMove[];
  pokemonAbilities: PokemonAbility[];
  pokemonWeaknesses: number[][];

  typeColor: String = "#FFF";
  tabActive: String[] = ["active","","",""]
  pokemonImageToDisplayIsShiny: boolean = false;

  constructor(private pokedexService: PokedexService,colorService: ColorService, private location: Location, private router: Router, private translationService: TranslationService, private typeService: TypeService) {
    this.pokemon = {} as PokemonDetail;
    this.pokemonSpecies = {} as PokemonSpecies;
    this.pokemonEvolutionChain = {} as PokemonEvolutionChain;
    this.pokemonMoves = [] as PokemonMove[];
    this.pokemonAbilities = [] as PokemonAbility[];
    this.typeColor = "#FFF";
    this.pokemonWeaknesses = [[]];
    this.pokedexService.getCurrentPokemonDetail()
      .subscribe(pokemonRetrieved => {
          this.pokemon = pokemonRetrieved;
          this.typeColor = colorService.getColorOfType(this.pokemon.types[0].type.name);


        this.pokedexService.getPokemonSpecies(+this.pokemon.species.url.split('/')[6])
          .subscribe(pokemonSpeciesRetrieved => {
              this.pokemonSpecies = pokemonSpeciesRetrieved;
              this.pokedexService.getPokemonEvolutionChain(parseInt(this.pokemonSpecies.evolution_chain.url.split('/')[6]))
              .subscribe(pokemonEvolutionChainRetrieved => {
                        this.pokemonEvolutionChain = pokemonEvolutionChainRetrieved;
              })
          });

          this.pokemon.moves.forEach(move => {
            this.pokedexService.getCurrentPokemonMoveDetail(+move.move.url.split('/')[6])
              .subscribe(pokemonMoveRetrieved => {
                  this.pokemonMoves.push(pokemonMoveRetrieved);
              });
          });

          this.pokemon.abilities.forEach(ability => {
            this.pokedexService.getPokemonAbility(+ability.ability.url.split('/')[6])
              .subscribe(pokemonAbilityRetrieved => {
                  this.pokemonAbilities.push(pokemonAbilityRetrieved);
              });
          });

          this.pokemonWeaknesses = this.typeService.getWeaknesses(pokemonRetrieved);
      });

    //To delete
    /*this.pokemon = POKEMONDETAIL;
    this.pokemonSpecies = POKEMONSPECIES;
    this.pokemonEvolutionChain = POKEMONEVOLUTIONCHAIN;*/

  }

  ngOnInit(): void {
    if("/pokemon".match(this.router.url)){
      this.hideDetailWindow();
    }
  }

  getPokemonName(): string{
    //return this.pokemon.name;
    return this.translationService.translatePokemonName(+this.pokemon.species.url.split('/')[6]);
  }

  getPokemonType(typeId:number): string{
    return this.translationService.translateTypeName(typeId);
  }

  switchPokemonImageToDisplay(){
    this.pokemonImageToDisplayIsShiny = !this.pokemonImageToDisplayIsShiny;
  }

  getPokemonImageToDisplay(): string{
    return this.pokemonImageToDisplayIsShiny ? this.getOfficialShinyArtwork() : this.getOfficialArtwork();
  }

  getOfficialShinyArtwork():string{
    var res = this.pokemon.sprites.other['official-artwork']?.front_shiny;
    return res? res : this.getOfficialArtwork();
  }

  getOfficialArtwork():string{
    return this.pokemon.sprites.other['official-artwork'].front_default;
  }

  getFormatedId(id: number){
    if(id < 10 ){
      return "00"+id;
    }else if(id< 100){
      return "0"+id;
    }else if(id< 1000){
       return id;
    }else{
     return id;
    }
  }

  hideDetailWindow(){
    this.pokedexService.hideDetailWindow();
    this.pokemon = {} as PokemonDetail;
    this.typeColor = "#FFF";
    this.location.go("/pokedex");
  }

  setActiveTab(tabToActivate: number){
    if(tabToActivate >= 0 && tabToActivate < this.tabActive.length){
      this.tabActive = ["","","",""];
      this.tabActive[tabToActivate] = "active";
      var lines = Array.from(document.getElementsByClassName('line') as HTMLCollectionOf<HTMLElement>);
      lines.forEach((line) => {
        switch(tabToActivate){
          case 0:
            line.style.left = '1%';
            break;
          case 1:
            line.style.left = '25%';
            break;
          case 2:
            line.style.left = '50%';
            break;
          case 3:
            line.style.left = '75%';
            break;
        }
      })
    }
  }

}
