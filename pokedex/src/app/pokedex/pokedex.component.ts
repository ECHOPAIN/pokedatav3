import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, Scroll} from '@angular/router';


import { Pokemon } from '../model/pokemon/pokemon';
import { Pokemons } from '../model/pokemon/pokemonsResult';
import { PokedexService } from '../services/pokedex.service';

import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemons: Pokemons[] = [];
  filteredPokemonList: Pokemons[] = [];
  allFilteredPokemons: Pokemons[] = []
  isLoading: Boolean = false;
  batchSize: number = 50;
  maxPokemonId: number = 1025;
  search: String = "";
  listDisplay: Boolean = false;

  displayDetail:boolean = false;
  firstCall: Boolean = true;


  constructor(private pokedexService: PokedexService, private router: Router, private translationService: TranslationService) { }

  ngOnInit(): void {
    this.loadPokemonList();

    this.pokedexService.isDisplayDetail()
            .subscribe(displayDetail => {
              this.displayDetail = displayDetail;
            });

    this.router.events.subscribe((event: Event) => {
    if(event instanceof NavigationEnd
    || (Scroll && this.firstCall)){ // Scroll && this.firstCall = on page load
      this.firstCall = false;
      if("\/pokedex".match(this.router.url)){
        this.pokedexService.hideDetailWindow();
      }else if(/\/pokedex\/[0-9]+/.test(this.router.url)){
        this.pokedexService.hideDetailWindow();
        setTimeout( () => {
          this.pokedexService.displayDetailWindow(parseInt(this.router.url.split('/')[2]));
        }, 0 );

      }
      }
    });

  }

 loadPokemonList(): void {
    this.isLoading = true;
    this.pokedexService.getAllPokemonResults()
      .subscribe(pokemonsRetrieved => {
          /*this.pokemons = pokemonsRetrieved.results.filter(
                        pokemon => pokemon==pokemonsRetrieved.results[parseInt(pokemon?.url.split('/')[6].toLowerCase())-1]//pokemon?.name.toLowerCase().includes(this.search.toLowerCase())||pokemon?.url.split('/')[6].toLowerCase().includes(this.search.toLowerCase())
                      );
          this.filteredPokemonList = this.pokemons;*/
          this.pokemons = pokemonsRetrieved.results.slice(0, this.maxPokemonId);
          this.filteredPokemonList = this.pokemons.slice(0, this.batchSize);
          this.isLoading = false;
      });
  }

  //When user is typing in the search bar
  onKey(event: any) { // without type info
    //console.log(event);
    if(event.key =='Enter'){
      //console.log('enter pressed');
    }
    this.filterPokemon(event.target.value);
  }

  filterPokemon(search: String){
  this.search = search;
    if (!search) {
        this.filteredPokemonList = this.pokemons;
      }

      //special search
      switch(search.toLowerCase())
      {
        case "gen1":
        case "generation1":
          this.allFilteredPokemons = this.pokemons.slice(0,151);
          break;
        case "gen2":
        case "generation2":
          this.allFilteredPokemons = this.pokemons.slice(151,251);
          break;
        case "gen3":
        case "generation3":
          this.allFilteredPokemons = this.pokemons.slice(251,386);
          break;
        case "gen4":
        case "generation4":
          this.allFilteredPokemons = this.pokemons.slice(386,493);
          break;
        case "gen5":
        case "generation5":
          this.allFilteredPokemons = this.pokemons.slice(493,649);
          break;
        case "gen6":
        case "generation6":
          this.allFilteredPokemons = this.pokemons.slice(649,721);
          break;
        case "gen7":
        case "generation7":
          this.allFilteredPokemons = this.pokemons.slice(721,809);
          break;
        case "gen8":
        case "generation8":
          this.allFilteredPokemons = this.pokemons.slice(809,905);
          break;
        case "gen9":
        case "generation9":
          this.allFilteredPokemons = this.pokemons.slice(905,1025);
          break;
        default:
          //classic search
          this.allFilteredPokemons = this.pokemons.filter(
            pokemon => this.translationService.translatePokemonName(+pokemon?.url.split('/')[6]).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))||pokemon?.url.split('/')[6].toLowerCase().includes(search.toLowerCase())
          )
      }
      this.filteredPokemonList = this.allFilteredPokemons.slice(0,this.batchSize);
  }

  onScroll(){
    //we are searching for a pokemon
    if (this.search) {
      /*this.allFilteredPokemons = this.pokemons.filter(
              pokemon => pokemon?.name.toLowerCase().includes(this.search.toLowerCase())||pokemon?.url.split('/')[6].toLowerCase().includes(this.search.toLowerCase())
            );*/
      //done
      if(this.filteredPokemonList.length >= this.allFilteredPokemons.length){
        return;
      }
      //if we reach the end of the list
      if (this.filteredPokemonList.length+this.batchSize > this.allFilteredPokemons.length) {
        this.filteredPokemonList.push(...this.allFilteredPokemons.slice(this.filteredPokemonList.length,this.allFilteredPokemons.length));
      } else {
        this.filteredPokemonList.push(...this.allFilteredPokemons.slice(this.filteredPokemonList.length,this.filteredPokemonList.length+this.batchSize));
      }
    }else{
      //we are not searching for a pokemon
      //done
      if(this.filteredPokemonList.length >= this.maxPokemonId){
        return;
      }
      //if we reach the end of the list
      if (this.filteredPokemonList.length+this.batchSize > this.maxPokemonId) {
        this.filteredPokemonList.push(...this.pokemons.slice(this.filteredPokemonList.length,this.maxPokemonId));
      } else {
          this.filteredPokemonList.push(...this.pokemons.slice(this.filteredPokemonList.length,this.filteredPokemonList.length+this.batchSize));
      }
    }
  }


}
