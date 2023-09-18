import { Component, OnInit, Input } from '@angular/core';

import { PokemonDetail } from '../../../model/pokeapi/pokeApiDetail';
import { PokemonEvolutionChain, PokemonEvolutionChainType } from '../../../model/pokeapi/pokeApiEvolutionChain';

@Component({
  selector: 'app-pokemon-evolution-tab',
  templateUrl: './pokemon-evolution-tab.component.html',
  styleUrls: ['./pokemon-evolution-tab.component.scss']
})
export class PokemonEvolutionTabComponent {
 @Input() pokemon: PokemonDetail;
 @Input() pokemonEvolutionChain : PokemonEvolutionChain;

 chain;

  constructor() {
      this.pokemon = {} as PokemonDetail;
      this.pokemonEvolutionChain = {} as PokemonEvolutionChain;
      this.chain = null as any;
  }

  ngOnInit(): void {
  }


  loadPokemonEvolutionChain(): boolean{
    if(!this.pokemonEvolutionChain){
      return false;
    }
    if(this.chain){
      return false;
    }
    //Si le pokemon a une evolution
    if(this.chain,this.pokemonEvolutionChain.chain.evolves_to){
      this.chain = this.buildChain(this.chain,this.pokemonEvolutionChain.chain)
    }
    return false;
  }

  //fonction recursive de generation de chaine d'evolution
  buildChain(chain: any, pokemonEvolutionChain: PokemonEvolutionChainType): any{
    if(!chain){
      chain = [];
    }
    if(pokemonEvolutionChain.evolves_to){
      pokemonEvolutionChain.evolves_to.forEach((evolves_to : PokemonEvolutionChainType) => {
        chain.push({pokemon1: pokemonEvolutionChain.species,
                    pokemon2: evolves_to.species})
        console.log('adding evolution :'+ pokemonEvolutionChain.species.name + " into " + evolves_to.species.name);
        this.buildChain(chain, evolves_to)
      })
    }
    console.log("chain size : "+chain.length)
    return chain;
  }

  getPokemonId(pokemon:any){
    return pokemon.url.split('/')[6]
  }

  getFrontDefault(pokemon:any){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getPokemonId(pokemon)+".png"
  }

}
