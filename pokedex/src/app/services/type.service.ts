import { Injectable } from '@angular/core';
import { PokemonDetail } from '../model/pokeapi/pokeApiDetail';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }

  getWeaknesses(pokemonDetail: PokemonDetail){
    var typeWeaknesses: number[][] = [[],[],[],[],[],[]];

    pokemonDetail.types.forEach(type => {
      typeWeaknesses = this.mergeWeakness(typeWeaknesses,this.getWeaknessesByType(+type.type.url.split('/')[6]));
    });

    return typeWeaknesses;
  }

  private getWeaknessesByType(typeId: number){
    //return [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]];
    var typeWeaknesses: number[][] = [[],[],[],[],[],[]];
    //special search
    switch(typeId)
    {
      case 1://Normal
        typeWeaknesses = [[],[2],[1,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18],[],[],[8]];
        break;
      case 2://Fighting
        typeWeaknesses = [[],[3,14,18],[1,2,4,5,8,9,10,11,12,13,15,16],[6,7,17],[],[]];
        break;
      case 3://Flying
        typeWeaknesses = [[],[6,13,15],[1,3,4,8,9,10,11,14,16,17,18],[2,7,12],[],[5]];
        break;
      case 4://Poison
        typeWeaknesses = [[],[5,14],[1,3,6,8,9,10,11,13,15,16,17],[2,4,7,12,18],[],[]];
        break;
      case 5://Ground
        typeWeaknesses = [[],[11,12,15],[1,2,3,5,7,8,9,10,14,16,17,18],[4,6],[],[13]];
        break;
      case 6://Rock
        typeWeaknesses = [[2,5,9,11,12],[],[6,7,8,13,14,15,16,17,18],[1,3,4,10],[],[]];
        break;
      case 7://Bug
        typeWeaknesses = [[],[3,6,10],[1,4,7,8,9,11,13,14,15,16,17,18],[2,5,12],[],[]];
        break;
      case 8://Ghost
        typeWeaknesses = [[],[8,17],[3,5,6,9,10,11,12,13,14,15,16,18],[4,7],[],[1,2]];
        break;
      case 9://Steel
        typeWeaknesses = [[],[2,5,10],[8,11,13,17],[1,3,6,7,9,12,14,15,16,18],[],[4]];
        break;
      case 10://Fire
        typeWeaknesses = [[],[5,6,11],[1,2,3,4,8,13,14,16,17],[7,9,10,12,15,18],[],[]];
        break;
        case 11://Water
          typeWeaknesses = [[],[12,13],[1,2,3,4,5,6,7,8,14,16,17,18],[9,10,11,15],[],[]];
          break;
        case 12://Grass
          typeWeaknesses = [[],[3,4,7,10,15],[1,2,6,8,9,14,16,17,18],[5,11,12,13],[],[]];
          break;
        case 13://Electric
          typeWeaknesses = [[],[5],[1,2,4,6,7,8,10,11,12,14,15,16,17,18],[3,9,13],[],[]];
          break;
        case 14://Psychic
          typeWeaknesses = [[],[7,8,17],[1,3,4,5,6,9,10,11,12,13,15,16,18],[2,14],[],[]];
          break;
        case 15://Ice
          typeWeaknesses = [[],[2,6,9,10],[1,3,4,5,7,8,11,12,13,14,16,17,18],[15],[],[]];
          break;
        case 16://Dragon
          typeWeaknesses = [[],[15,16,18],[1,2,3,4,5,6,7,8,9,14,17],[10,11,12,13],[],[]];
          break;
        case 17://Dark
          typeWeaknesses = [[],[2,7,18],[1,3,4,5,6,9,10,11,12,13,15,16],[8,17],[],[14]];
          break;
        case 18://Fairy
          typeWeaknesses = [[],[4,9],[1,3,5,6,8,10,11,12,13,14,15,18],[2,7,17],[],[16]];
          break;
      default:
        typeWeaknesses = [[],[],[],[],[],[]];
    }

    return typeWeaknesses;
  }

  private mergeWeakness(table1: number[][], table2: number[][]){
    var tableToReturn: number[][] = [[],[],[],[],[],[]];

    if(table1[0].length == 0 && table1[1].length == 0 && table1[2].length == 0 && table1[3].length == 0 && table1[4].length == 0 && table1[5].length == 0){
      return table2;
    }
    if(table2[0].length == 0 && table2[1].length == 0 && table2[2].length == 0 && table2[3].length == 0 && table2[4].length == 0 && table2[5].length == 0){
      return table1;
    }

    for (let type = 1; type <= 18; type++) {
      if(table1[5].includes(type) || table2[5].includes(type)){
        tableToReturn[5].push(type);
      }

      if(table1[3].includes(type)){
        if(table2[3].includes(type)){
          tableToReturn[4].push(type);
        }else if(table2[2].includes(type)){
          tableToReturn[3].push(type);
        }else if(table2[1].includes(type)){
          tableToReturn[2].push(type);
        }
      }

      if(table1[2].includes(type)){
        if(table2[3].includes(type)){
          tableToReturn[3].push(type);
        }else if(table2[2].includes(type)){
          tableToReturn[2].push(type);
        }else if(table2[1].includes(type)){
          tableToReturn[1].push(type);
        }
      }

      if(table1[1].includes(type)){
        if(table2[3].includes(type)){
          tableToReturn[2].push(type);
        }else if(table2[2].includes(type)){
          tableToReturn[1].push(type);
        }else if(table2[1].includes(type)){
          tableToReturn[0].push(type);
        }
      }


    }
    return tableToReturn;
  }
}
