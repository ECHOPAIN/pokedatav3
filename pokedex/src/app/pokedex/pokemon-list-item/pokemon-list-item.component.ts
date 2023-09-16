import { Component, OnInit, Input } from '@angular/core';
import { Pokemons } from '../../model/pokemon/pokemonsResult';
import { Pokemon } from '../../model/pokemon/pokemon';
import { PokedexService } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})
export class PokemonListItemComponent {
 @Input() pokemon: Pokemons;

  constructor(private pokedexService: PokedexService) {
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

  getFrontDefault(){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getPokemonId()+".png"
  }

  displayDetailWindow(){
    this.pokedexService.displayDetailWindow(parseInt(this.getPokemonId()));
  }

}
