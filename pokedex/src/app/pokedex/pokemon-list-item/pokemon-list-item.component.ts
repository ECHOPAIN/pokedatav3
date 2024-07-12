import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { Pokemons } from '../../model/pokemon/pokemonsResult';
import { Pokemon } from '../../model/pokemon/pokemon';
import { PokedexService } from '../../services/pokedex.service';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})
export class PokemonListItemComponent {
 @Input() pokemon: Pokemons;

  constructor(private pokedexService: PokedexService, private location: Location, private router: Router, private translationService: TranslationService) {
    this.pokemon =
            { name: "MissingNo.",
              url: "https://pokeapi.co/api/v2/pokemon/0/"
            }
  }

  ngOnInit(): void {
  }

  getPokemonId(){
    return this.pokemon.url.split('/')[6]
  }

  getPokemonName(): string{
    //return this.pokemon.name;
    return this.translationService.translatePokemonName(+this.getPokemonId());
  }

  getFrontDefault(){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getPokemonId()+".png"
  }

  displayDetailWindow(){
    this.pokedexService.displayDetailWindow(parseInt(this.getPokemonId()));
    this.location.go("/pokedex/"+this.getPokemonId()+"?langue="+this.translationService.getLanguageCode());
    //this.router.navigate(['./pokedex/'+this.getPokemonId()],{queryParams: { langue: this.translationService.getLanguageCode()}});
  }

}
