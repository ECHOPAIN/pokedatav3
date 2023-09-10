import { Component, OnInit, Input } from '@angular/core';
import { PokemonsResultResults } from '../model/pokemon/pokemonsResult';
import { Pokemon } from '../model/pokemon/pokemon';

import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-pokemon-grid-item',
  templateUrl: './pokemon-grid-item.component.html',
  styleUrls: ['./pokemon-grid-item.component.scss']
})
export class PokemonGridItemComponent implements OnInit {
  @Input() pokemon: PokemonsResultResults;

  constructor() {
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

  getFrontDefault(){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getPokemonId()+".png"
  }

  display(){
    //this.detailService.display(this.getPokemonId();
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
