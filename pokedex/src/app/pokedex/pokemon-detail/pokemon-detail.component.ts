import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { PokemonDetail } from '../../model/pokeapi/pokeApiDetail';
import { PokemonSpecies } from '../../model/pokeapi/pokeApiSpecies';
import { PokemonEvolutionChain } from '../../model/pokeapi/pokeApiEvolutionChain'

import { PokedexService } from '../../services/pokedex.service';
import { ColorService } from '../../services/color.service';


//To delete
import { POKEMONDETAIL } from '../../mock-pokemon-detail';
import { POKEMONSPECIES } from '../../mock-pokemon-species';
import { POKEMONEVOLUTIONCHAIN } from '../../mock-pokemon-evolution-chain';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokemon: PokemonDetail;
  pokemonSpecies : PokemonSpecies;
  pokemonEvolutionChain : PokemonEvolutionChain

  typeColor: String = "#FFF";
  tabActive: String[] = ["active","","",""]

  constructor(private pokedexService: PokedexService,colorService: ColorService, private location: Location, private router: Router) {
    this.pokemon = {} as PokemonDetail;
    this.pokemonSpecies = {} as PokemonSpecies;
    this.pokemonEvolutionChain = {} as PokemonEvolutionChain;
    this.typeColor = "#FFF";
    this.pokedexService.getCurrentPokemonDetail()
      .subscribe(pokemonRetrieved => {
          this.pokemon = pokemonRetrieved;
          this.typeColor = colorService.getColorOfType(this.pokemon.types[0].type.name);
      });
    this.pokedexService.getCurrentPokemonSpecies()
      .subscribe(pokemonSpeciesRetrieved => {
          this.pokemonSpecies = pokemonSpeciesRetrieved;
          this.pokedexService.getPokemonEvolutionChain(parseInt(this.pokemonSpecies.evolution_chain.url.split('/')[6]))
          .subscribe(pokemonEvolutionChainRetrieved => {
                    this.pokemonEvolutionChain = pokemonEvolutionChainRetrieved;
          })
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
