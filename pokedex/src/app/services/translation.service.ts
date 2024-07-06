import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { PokemonSpecies } from '../model/pokeapi/pokeApiSpecies';

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

  constructor(private http: HttpClient) {
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
    this.pokemonSpeciesNamesList.forEach((pokemonSpeciesNames) =>  {
      if (pokemonSpeciesNames.pokemon_species_id === idPokemon && pokemonSpeciesNames.local_language_id === this.countryId){
        res = pokemonSpeciesNames.name;
      }
    });
    return res;
  }


  translateTypeName(idType:number){
    var res = "-";
    this.typeNamesList.forEach((typeNames) =>  {
      if (typeNames.type_id === idType && typeNames.local_language_id === this.countryId){
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
    var genusTextToReturn = "";
    pokemonSpecies.genera.forEach((genera) =>{
                                   if(+genera.language.url.split('/')[6] === this.countryId){
                                     genusTextToReturn = genera.genus
                                   }})
    return genusTextToReturn;
  }
}
