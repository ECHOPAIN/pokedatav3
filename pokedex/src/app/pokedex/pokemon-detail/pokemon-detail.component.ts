import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { PokemonDetail } from '../../model/pokeapi/pokeApiDetail';
import { PokedexService } from '../../services/pokedex.service';
import { ColorService } from '../../services/color.service';


//To delete
import { POKEMONDETAIL } from '../../mock-pokemon-detail';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokemon: PokemonDetail;
  typeColor: String = "#FFF";
  isLoading: Boolean = false;

  constructor(private pokedexService: PokedexService,colorService: ColorService, private location: Location, private router: Router) {
    this.pokemon = {} as PokemonDetail;
    this.typeColor = "#FFF";
    /*this.pokedexService.getCurrentPokemonDetail()
      .subscribe(pokemonRetrieved => {
          this.pokemon = pokemonRetrieved;
          this.typeColor = colorService.getColorOfType(this.pokemon.types[0].type.name);
          this.isLoading = false;
      });*/

      this.pokemon = POKEMONDETAIL;

  }

  ngOnInit(): void {
    if("/pokemon".match(this.router.url)){
      this.hideDetailWindow();
    }
  }

  hideDetailWindow(){
    this.pokedexService.hideDetailWindow();
    this.pokemon = {} as PokemonDetail;
    this.typeColor = "#FFF";
    this.location.go("/pokedex");
  }

}
