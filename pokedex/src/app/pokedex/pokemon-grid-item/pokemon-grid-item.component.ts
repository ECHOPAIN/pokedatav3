import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

import { Pokemons } from '../../model/pokemon/pokemonsResult';
import { Pokemon } from '../../model/pokemon/pokemon';
import { PokedexService } from '../../services/pokedex.service';

import { TranslationService } from '../../services/translation.service';

import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-pokemon-grid-item',
  templateUrl: './pokemon-grid-item.component.html',
  styleUrls: ['./pokemon-grid-item.component.scss']
})
export class PokemonGridItemComponent implements OnInit {
  @Input() pokemon: Pokemons;

  constructor(private pokedexService: PokedexService, private location: Location, private translationService: TranslationService) {
    this.pokemon =
            { name: "MissingNo.",
              url: "https://pokeapi.co/api/v2/pokemon/0/"
            }
  }

  ngOnInit(): void {
    if(!window.navigator.userAgent.toString().includes("Mobile")){
      this.addVanillaTilt();
    }
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
    this.location.go("/pokedex/"+this.getPokemonId());
  }

  addVanillaTilt(){
    let element=[];
    let nodes =  document.querySelectorAll<HTMLElement>(".card");
    for (let i = 0; nodes[i]; i++) {
        let node = nodes[i];
        element.push(nodes[i] as HTMLElement);
    }
    VanillaTilt.init(element, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare" : 1
      });
  }

}
