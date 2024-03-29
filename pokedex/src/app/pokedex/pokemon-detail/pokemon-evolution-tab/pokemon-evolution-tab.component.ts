import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
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
        var pokemon1 = pokemonEvolutionChain.species;
        var pokemon2 = evolves_to.species
        var evolutionDetails = evolves_to.evolution_details;

        //cas speciaux
        if(evolves_to.species.name=="pawmot"||evolves_to.species.name=="brambleghast"||evolves_to.species.name=="rabsca"){
          evolutionDetails[0].other="Walk 1000 step with let's go feature"
        }
        if(evolves_to.species.name=="shedinja"){
          evolutionDetails[0].other="level : 20, free party space and pokeball in bag"
        }
        if(evolves_to.species.name=="sirfetchd"){
          evolutionDetails[0].other="three critical hits in a single battle"
        }
        if(evolves_to.species.name=="runerigus"){
          evolutionDetails[0].other="travels under the large rock arch in Dusty Bowl after yamask takes at least 49 HP in damage"
        }
        if(evolves_to.species.name=="alcremie"){
          evolutionDetails[0].other="sugar object + turn on itself"
        }
        if(evolves_to.species.name=="urshifu"){
          evolutionDetails[0].other="scroll of darkness"
          evolutionDetails[1].other="scroll of waters"
        }
        if(evolves_to.species.name=="basculegion"){
          evolutionDetails[0].other="losing at least 294 HP from recoil damage without fainting"
        }
        if(evolves_to.species.name=="palafin"){
          evolutionDetails[0].other="when leveled up while connected with another player via the Union Circle"
        }
        if(evolves_to.species.name=="kingambit"){
          evolutionDetails[0].other="leveling up after defeating three Bisharp that hold a Leader's Crest"
        }
        if(evolves_to.species.name=="gholdengo"){
          evolutionDetails[0].other="999 Gimmighoul Coins"
        }
        if(evolves_to.species.name=="annihilape"){
          evolutionDetails[0].other="after using Rage Fist 20 times"
        }
        if(evolves_to.species.name=="leafeon"){
          if(evolutionDetails[0].location){
            evolutionDetails[0].location.name="near a Moss Rock"
          }
          evolutionDetails = [evolutionDetails[0],evolutionDetails[evolutionDetails.length-1]]
        }
        if(evolves_to.species.name=="glaceon"){
          if(evolutionDetails[0].location){
            evolutionDetails[0].location.name="near an Ice Rock"
          }
          evolutionDetails = [evolutionDetails[0],evolutionDetails[evolutionDetails.length-1]]
        }
        if(evolves_to.species.name=="magnezone"){
          if(evolutionDetails[0].location){
            evolutionDetails[0].location.name="in a special magnetic field"
          }
          evolutionDetails = [evolutionDetails[0],evolutionDetails[evolutionDetails.length-1]]
        }
        if(evolves_to.species.name=="probopass"){
          if(evolutionDetails[0].location){
            evolutionDetails[0].location.name="in a special magnetic field"
          }
          if(evolutionDetails[evolutionDetails.length-1]){
            evolutionDetails[evolutionDetails.length-1].item={name:"thunder-stone",url:""}
          }
          evolutionDetails = [evolutionDetails[0],evolutionDetails[evolutionDetails.length-1]]
        }
        if(evolves_to.species.name=="vikavolt"){
          if(evolutionDetails[0]){
            evolutionDetails[0].location={name:"in a special magnetic field",url:""}
          }
          evolutionDetails = [evolutionDetails[0],evolutionDetails[evolutionDetails.length-1]]
        }

        chain.push({pokemon1: pokemon1,
                    evolutionDetails: evolutionDetails,
                    pokemon2: pokemon2})
        //console.log('adding evolution :'+ pokemonEvolutionChain.species.name + " into " + evolves_to.species.name);
        //console.log('with : '+ evolves_to.evolution_details[0].gender);
        this.buildChain(chain, evolves_to)
      })
    }
    return chain;
  }

  getPokemonId(pokemon:any){
    return pokemon.url.split('/')[6]
  }

  getFrontDefault(pokemon:any){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getPokemonId(pokemon)+".png"
  }

  redirect(pokemon:any){
    this.router.navigate(['./pokedex/'+this.getPokemonId(pokemon)]);
  }

}
