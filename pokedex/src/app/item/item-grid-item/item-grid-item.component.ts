import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

import { Items } from '../../model/item/itemsResult';
import { ItemService } from '../../services/item.service';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-item-grid-item',
  templateUrl: './item-grid-item.component.html',
  styleUrls: ['./item-grid-item.component.scss']
})
export class ItemGridItemComponent {
  @Input() item: Items;

  constructor(private itemService: ItemService, private location: Location, private translationService: TranslationService) {
      this.item =
              { name: "MissingNo.",
                url: "https://pokeapi.co/api/v2/pokemon/0/"
              }
    }

    getImage(){
    if( ( /tm[0-9]+/.test(this.item.name) ) || ( this.item.name == "hm08" ) ){
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png"
    }
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+this.item.name+".png"
    }



  getItemId(){
    return this.item.url.split('/')[6]
  }


  displayDetailWindow(){
    this.itemService.displayDetailWindow(parseInt(this.getItemId()));
    this.location.go("/item?langue="+this.translationService.getLanguageCode());
  }
}
