import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { PokemonSpecies } from '../model/pokeapi/pokeApiSpecies';
import { PokemonAbility } from '../model/pokeapi/pokeApiAbility';
import { PokemonMove } from '../model/pokeapi/pokeApiMove';

import { PokedexService } from '../services/pokedex.service';

import { PokemonSpeciesNames, TypeNames } from '../model/translation/translation';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  /*
  id	iso639	iso3166	identifier	official	order
  1	ja	jp	ja-Hrkt	1	1
  2	ja	jp	roomaji	1	3
  3	ko	kr	ko	1	4
  4	zh	cn	zh-Hant	1	5
  5	fr	fr	fr	1	8
  6	de	de	de	1	9
  7	es	es	es	1	10
  8	it	it	it	1	11
  9	en	us	en	1	7
  10	cs	cz	cs	0	12
  11	ja	jp	ja	1	2
  12	zh	cn	zh-Hans	1	6
  13	pt-BR	br	pt-BR	0	13
  */
  private countryCodeMap: Map<string,number> = new Map([
                                      ["ja",1],
                                      //["ja",2],
                                      ["ko",3],
                                      ["zh",4],
                                      ["fr",5],
                                      ["de",6],
                                      ["es",7],
                                      ["it",8],
                                      ["en",9],
                                      ["cs",10],
                                      //["ja",11],
                                      //["zh",12],
                                      ["pt-BR",13]
                                    ]);

  private defaultCountryId: number = 9;//en;
  private countryId: number = this.defaultCountryId;

  private pokemonSpeciesNamesFile = 'assets/translation/pokemon_species_names.csv';
  private pokemonSpeciesNamesList: PokemonSpeciesNames[] = [];
  private typeNamesFile = 'assets/translation/type_names.csv';
  private typeNamesList: TypeNames[] = [];

  constructor(private http: HttpClient, private pokedexService: PokedexService) {
      //load name translation file
      this.http.get(this.pokemonSpeciesNamesFile, {responseType: 'text'})
     .subscribe(
         data => {
             let csvToRowArray = data.split("\n");
             for (let index = 1; index < csvToRowArray.length - 1; index++) {
               let row = csvToRowArray[index].split(",");
               this.pokemonSpeciesNamesList.push( {pokemon_species_id: parseInt( row[0], 10),local_language_id: parseInt( row[1], 10),name: row[2],genus: row[3]} as PokemonSpeciesNames);
             }
             //console.log(this.pokemonSpeciesNamesList);
         },
         error => {
             //console.log(error);
         }
     );
     //load name translation file
     this.http.get(this.typeNamesFile, {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.typeNamesList.push( {type_id: parseInt( row[0], 10),local_language_id: parseInt( row[1], 10),name: row[2]} as TypeNames);
            }
            //console.log(this.typeNamesList);
        },
        error => {
            //console.log(error);
        }
    );
  }

  setLanguageByCode(countryCode: string): void{
    var countryId = this.countryCodeMap.get(countryCode);
    if(countryId){
      this.countryId = countryId
    }
  }

  getLanguageCode(): string{
    var result = "-";
    this.countryCodeMap.forEach((value, key) => {
        result = value === this.countryId ? key : result;
    });
    return result;
  }



  translatePokemonName(idPokemon:number){
    var res = "-";

    if(idPokemon > 10000){ //forme alternatives
      this.pokedexService.getPokemonDetail(idPokemon).subscribe(pokemonDetail => {
          var idPokemonBaseForm = +pokemonDetail.species.url.split('/')[6];
          this.pokemonSpeciesNamesList.forEach((pokemonSpeciesNames) =>  {
            if (pokemonSpeciesNames.pokemon_species_id === idPokemonBaseForm && pokemonSpeciesNames.local_language_id === this.countryId){
              res = pokemonSpeciesNames.name;
            }
          });
          this.pokedexService.getPokemonSpecies(idPokemonBaseForm).subscribe(pokemonSpecies => {
          pokemonSpecies.varieties.forEach((varieties) =>  {
            if (+varieties.pokemon.url.split('/')[6] === idPokemon){
              if(varieties.pokemon.name.includes('-')){
                var splittedName = varieties.pokemon.name.split('-')
                res += "("+splittedName[splittedName.length-1]+")";
              }
            }
          });
        });
      });
    }else{
      this.pokemonSpeciesNamesList.forEach((pokemonSpeciesNames) =>  {
        if (pokemonSpeciesNames.pokemon_species_id === idPokemon && pokemonSpeciesNames.local_language_id === this.countryId){
          res = pokemonSpeciesNames.name;
        }
      });
    }
    return res;
  }


  translateTypeName(idType:number){
    var typeNameToReturn = this.translateTypeNameByCountry(idType,this.countryId);
    return typeNameToReturn ? typeNameToReturn : this.translateTypeNameByCountry(idType,this.defaultCountryId);
  }

  translateTypeNameByCountry(idType:number, countryId:number){
    var res = "-";
    this.typeNamesList.forEach((typeNames) =>  {
      if (typeNames.type_id === idType && typeNames.local_language_id === countryId){
        res = typeNames.name;
      }
    });
    return res;
  }

  getTranslatedFlavorText(pokemonSpecies: PokemonSpecies){
    var flavorTextToReturn = this.getTranslatedFlavorTextByCountry(pokemonSpecies,this.countryId);
    return flavorTextToReturn ? flavorTextToReturn : this.getTranslatedFlavorTextByCountry(pokemonSpecies,this.defaultCountryId);
  }

  private getTranslatedFlavorTextByCountry(pokemonSpecies: PokemonSpecies, countryId:number){
    var flavorTextToReturn = "";
    pokemonSpecies.flavor_text_entries.forEach((flavorTextEntries) =>{
                                                if(+flavorTextEntries.language.url.split('/')[6] === countryId){
                                                  flavorTextToReturn = flavorTextEntries.flavor_text
                                                }})
    return flavorTextToReturn;
  }

  getTranslatedGenus(pokemonSpecies: PokemonSpecies){
    var genusTextToReturn = this.getTranslatedGenusByCountry(pokemonSpecies,this.countryId);
    return genusTextToReturn ? genusTextToReturn : this.getTranslatedGenusByCountry(pokemonSpecies,this.defaultCountryId);
  }

  private getTranslatedGenusByCountry(pokemonSpecies: PokemonSpecies, countryId:number){
    var genusTextToReturn = "";
    pokemonSpecies.genera.forEach((genera) =>{
                                   if(+genera.language.url.split('/')[6] === countryId){
                                     genusTextToReturn = genera.genus
                                   }})
    return genusTextToReturn;
  }

  translateAbilityName(pokemonAbility:PokemonAbility){
    var abilityNameToReturn = this.translateAbilityNameByCountry(pokemonAbility,this.countryId);
    return abilityNameToReturn ? abilityNameToReturn : this.translateAbilityNameByCountry(pokemonAbility,this.defaultCountryId);
  }

  private translateAbilityNameByCountry(pokemonAbility:PokemonAbility, countryId:number){
    var abilityNameToReturn = "";
    pokemonAbility.names.forEach((name) =>{
                                   if(+name.language.url.split('/')[6] === countryId){
                                     abilityNameToReturn = name.name
                                   }})
    return abilityNameToReturn;
  }

  translateAbilityFlavorText(pokemonAbility:PokemonAbility){
    var abilityNameToReturn = this.translateAbilityFlavorTextByCountry(pokemonAbility,this.countryId);
    return abilityNameToReturn ? abilityNameToReturn : this.translateAbilityFlavorTextByCountry(pokemonAbility,this.defaultCountryId);
  }

  private translateAbilityFlavorTextByCountry(pokemonAbility:PokemonAbility, countryId:number){
    var abilityEffectToReturn = "";
    pokemonAbility.flavor_text_entries.forEach((flavor_text_entries) =>{
                                   if(+flavor_text_entries.language.url.split('/')[6] === countryId){
                                     abilityEffectToReturn = flavor_text_entries.flavor_text
                                   }})
    return abilityEffectToReturn;
  }

  translateMoveName(pokemonMove:PokemonMove){
    if(pokemonMove){
      var moveNameToReturn = this.translateMoveNameByCountry(pokemonMove,this.countryId);
      return moveNameToReturn ? moveNameToReturn : this.translateMoveNameByCountry(pokemonMove,this.defaultCountryId);
    }else{
      return "-";
    }
  }

  private translateMoveNameByCountry(pokemonMove:PokemonMove, countryId:number){
      var moveNameToReturn = "";
      pokemonMove.names.forEach((names) =>{
                                     if(+names.language.url.split('/')[6] === countryId){
                                       moveNameToReturn = names.name
                                     }})
      return moveNameToReturn;
  }



  translateMoveFlavorText(pokemonMove:PokemonMove){
    if(pokemonMove){
      var moveFlavorTextToReturn = this.translateFlavorTextNameByCountry(pokemonMove,this.countryId);
      return moveFlavorTextToReturn ? moveFlavorTextToReturn : this.translateFlavorTextNameByCountry(pokemonMove,this.defaultCountryId);
    }else{
      return "-";
    }
  }


  private translateFlavorTextNameByCountry(pokemonMove:PokemonMove, countryId:number){
      var moveFlavorTextToReturn = "";
      pokemonMove.flavor_text_entries.forEach((flavorText) =>{
                                     if(+flavorText.language.url.split('/')[6] === countryId){
                                       moveFlavorTextToReturn = flavorText.flavor_text
                                     }})
      return moveFlavorTextToReturn;
  }
}
